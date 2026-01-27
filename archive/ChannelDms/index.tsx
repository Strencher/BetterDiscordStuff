/// <reference path="../types/main.d.ts" />

import {Logger, Patcher, ReactComponents, Utilities, WebpackModules} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import PrivateChannels from "./components/privatechannels";
import styles from "styles";
import ChannelInfoContext from "./components/context";
import {Popout} from "@discord/components";
import React, {useContext, useMemo} from "react";
import ChannelPopout from "./components/channelpopout";
import SettingsPanel from "./components/settings";
import UnreadBadge from "./components/unreadbadge";
import ChannelMembers from "./components/channelmembers";

export default class ChannelDms extends BasePlugin {
    onStart(): void {
        styles.inject();
        this.patchChannelMembers();
        this.patchListItem();
        this.patchPrivateChannel();
    }

    getSettingsPanel() {
        return (
            <SettingsPanel />
        );
    }

    async patchChannelMembers(): Promise<void> {
        const DefaultChannelMembers = WebpackModules.getModule(m => m.default && m.default.displayName === "ConnectedChannelMembers");

        Patcher.instead(DefaultChannelMembers, "default", (_, [props], original) => {
            if (props?.__IS_PLUGIN) return;

            return (
                <ChannelMembers original={original} memberListProps={props} key="CHANNEL_MEMBERS"/>
            );
        });
    }

    async patchPrivateChannel(): Promise<void> {
        const classes = WebpackModules.getByProps("channel", "closeButton");
        const PrivateChannel = await ReactComponents.getComponentByName("PrivateChannel", "." + classes?.channel);

        Patcher.after(PrivateChannel.component.prototype, "render", (_this, _, ret) => {
            if (!ret?.props) return;
            
            const props = Utilities.findInReactTree(ret, e => typeof e?.children === "function");
            if (!props) return;

            const original = props.children;
            props.children = (id: string) => {
                const returnValue = Reflect.apply(original, null, [id]);

                try {
                    Object.assign(returnValue.props, {channel: _this.props.channel});
                } catch (error) {
                    Logger.error("Failed to assign props to nested element:", error);
                }

                return returnValue;
            };
        });

        PrivateChannel.forceUpdateAll();
    }

    patchListItem(): void {
        const regex = /focusProps.*"li"/is;
        const ListItem = WebpackModules.getModule(e => regex.test(e?.render?.toString()));
        const InteractiveClasses = WebpackModules.getByProps("interactiveSelected", "interactive");

        function PatchedNestedRoute({__original, ...props}) {
            const ret = Reflect.apply(__original.render, this, [props]);
            
            try {
                delete ret.props.href;
                ret.props.onClick = props.onSelect;
            } catch (error) {
                Logger.error("Error in PatchedNestedRoute:", error);
            }
            
            return ret;
        }

        function PatchedRoute({__original, ...props}) {
            const ret = Reflect.apply(__original.render, this, [props]);

            try {
                const originalConsumer = ret.props.children;

                ret.props.children = props2 => {
                    const returnValue = Reflect.apply(originalConsumer, null, [props2]);
                    
                    try {
                        const original = returnValue.type
                        returnValue.type = PatchedNestedRoute;
                        returnValue.props.__original = original;
                        returnValue.props.onSelect = props.onSelect;
                    } catch (error) {
                        Logger.error("Error while injecting PatchedNestedRoute:", error);
                    }

                    return returnValue;
                };
            } catch (error) {
                Logger.error("Error in Route patch:", error);
            }

            return ret;
        };

        function PatchedListItem({children, channel}) {
            const {selectedChannelId, shouldShow, setSelectedChannelId} = useContext(ChannelInfoContext);
            if (!shouldShow) return children;
            const selected = useMemo(() => selectedChannelId === channel.id, [selectedChannelId]);

            const child = React.cloneElement<any>(children.props.children);
            const route = Utilities.findInReactTree(children, e => e?.type?.render);
            
            try {
                const interactive = Utilities.findInReactTree(child, e => e?.type?.displayName === "Interactive");
                if (route) {
                    if (selected) {
                        if (interactive) {
                            interactive.props.className += ` ${InteractiveClasses.interactiveSelected}`;
                        }
                    }
                    route.props.__original = route.type;
                    route.props.onSelect = (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setSelectedChannelId(selected ? "" : channel.id);
                    };
    
                    route.type = PatchedRoute;
                }

                const close = interactive?.props?.children?.[1];

                if (close) {
                    interactive.props.children[1] = (
                        <div className="ChannelDms-channelpopout-unread">
                            <UnreadBadge channel={channel} />
                            {close}
                        </div>
                    );
                }
            } catch (error) {
                Logger.error("Error in ListItem patch:", error);
            }

            return (
                <Popout
                    shouldShow={selected}
                    spacing={25}
                    position={Popout.Positions.LEFT}
                    animation={Popout.Animation.TRANSLATE}
                    renderPopout={(props) => (
                        <ChannelPopout channel={channel} {...props} onClose={() => setSelectedChannelId("")} />
                    )}
                >
                    {() => child}
                </Popout>
            );
        }

        Patcher.after(ListItem, "render", (_, [props], ret) => {
            if (!Reflect.has(props, "channel")) return;

            return (
                <PatchedListItem {...props} children={ret} />
            );
        });
    }

    onStop() {
        Patcher.unpatchAll();
        styles.remove();
    }
}