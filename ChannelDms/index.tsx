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

const ChannelInfoActions = WebpackModules.getByProps("setChannelInfoTab");
const ChannelSidebarStore = WebpackModules.getByProps("getActiveInfoTab");

export default class ChannelDms extends BasePlugin {
    onStart(): void {
        styles.inject();
        this.patchChannelInfo();
        this.patchListItem();
        this.patchPrivateChannel();
        this.patchExperiment();
    }

    getSettingsPanel() {
        return (
            <SettingsPanel />
        );
    }

    patchExperiment(): void {
        const Experiment = WebpackModules.getByProps("ChannelBannersExperiment");
        if (!Experiment || !Experiment.ChannelBannersExperiment) return;

        Patcher.instead(Experiment.ChannelBannersExperiment, "getCurrentConfig", () => ({
            enableChannelBanners: true
        }));
    }

    patchChannelInfo(): void {
        const ChannelInfo = WebpackModules.getModule(m => m.default?.displayName === "ChannelInfo");
        const ChannelInfoClasses = WebpackModules.getByProps("container", "members");
        const {Item} = WebpackModules.getByProps("Header", "Item") ?? {};
        const join = (...classNames) => classNames.filter(Boolean).join(" ");

        Patcher.after(ChannelInfo, "default", (_, __, ret) => {
            const activeTab = ChannelSidebarStore.getActiveInfoTab();
            const header = Utilities.findInReactTree(ret, e => e && "onItemSelect" in e);

            if (!Array.isArray(header?.children) || !Array.isArray(ret?.props?.children)) return;

            header.children.push(
                <Item
                    className={join(ChannelInfoClasses.tab, activeTab === 3 && ChannelInfoClasses.active)}
                    id={3}
                >DMs</Item>
            );

            if (activeTab !== 3) return;

            ret.props.children[1] = (
                <PrivateChannels />
            );
        });
    }

    async patchPrivateChannel(): Promise<void> {
        const classes = WebpackModules.getByProps("channel", "closeButton");
        const PrivateChannel = await ReactComponents.getComponentByName("PrivateChannel", "." + classes?.channel);

        function PatchedChild({original, ...props}) {
            const ret = Reflect.apply(original, this, [props]);

            try {
                Object.assign(ret.props, props);
            } catch (error) {
                Logger.error("Failed to assign props to nested element:", error);
            }

            return ret;
        }

        Patcher.after(PrivateChannel.component.prototype, "render", (_this, _, ret) => {
            if (!ret?.props) return;
            const original = ret.type;
            ret.type = PatchedChild;
            Object.assign(ret.props, {channel: _this.props.channel, original});
        });

        PrivateChannel.forceUpdateAll();
    }

    patchListItem(): void {
        const ListItem = WebpackModules.getModule(e => e?.render?.toString().indexOf("nameAndDecorators") > -1);
        const ListItemClasses = WebpackModules.getByProps("nameAndDecorators", "wrappedName", "selected");
 
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
            
            try {
                const original = child.type;
                if (selected) child.props.className += (" " + ListItemClasses.selected);
                child.props.__original = original;
                child.props.onSelect = (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setSelectedChannelId(selected ? "" : channel.id);
                }
                
                (child as any).type = PatchedRoute;

                const childrenContainer = Utilities.findInReactTree(child, e => e?.className?.indexOf("children") > -1);
                
                if (childrenContainer) {
                    childrenContainer.children = [
                        <UnreadBadge channel={channel} />,
                        childrenContainer.children
                    ];

                    childrenContainer.className += " ChannelDms-channelpopout-unread";
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

        if (ChannelSidebarStore.getActiveInfoTab() === 3) {
            ChannelInfoActions.setChannelInfoTab(0);
        }
    }
}