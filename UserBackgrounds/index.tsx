/// <reference path="../bdbuilder/typings/main.d.ts" />

import BasePlugin from "@zlibrary/plugin";
import { Patcher, Utilities, WebpackModules, DiscordModules } from "@zlibrary";
import BannerStore from "./bannerStore";
import Settings from "./settings";
import { useStateFromStores } from "@discord/flux";
import _ from "lodash";
import { joinClassNames } from "@discord/utils";
import { switchCase } from "common/util/any";
import ErrorBoundary from "common/components/errorboundary";
import React, { useMemo, useRef, useState } from "react";
import styles from "./banner.scss";
import stylesheet from "styles";
import { Button } from "@discord/components";
import { Colors } from "@discord/constants";
import { closeContextMenu, Menu, MenuItem, openContextMenu } from "@discord/contextmenu";
import { ModalRoot, ModalSize, openModal } from "@discord/modal";
import {UserBanner as banner} from "./types";

type UserBanner = {
    BannerTypes: {
        0: "POPOUT";
        1: "PROFILE";
        POPOUT: 0;
        PROFILE: 1;
    }
    default: () => any;
};

const Arrow: any = ErrorBoundary.from(WebpackModules.getByDisplayName("Arrow"), "Arrow");
const TextBadge: any = ErrorBoundary.from(WebpackModules.getByProps("TextBadge")?.TextBadge);
const ImageModal: any = ErrorBoundary.from(WebpackModules.getByDisplayName("ImageModal"));
const MaskedLink: any = ErrorBoundary.from(WebpackModules.getByDisplayName("MaskedLink"));
const ModalClasses: { image, modal } = WebpackModules.find(e => typeof e === "object" && Object.keys(e).length === 2 && e.modal && e.image);

const showImageModal = async function (src: string, original = src, width: number, height: number, animated: boolean, children: any, placeholder: any) {
    const bounds = await new Promise(resolve => {
        Object.assign(new Image(), {
            src: src,
            onload: ({ target }) => {
                resolve({ width: target.naturalWidth, height: target.naturalHeight });
            },
            onerror: () => resolve({ width, height })
        });
    });

    openModal(props => (
        <ModalRoot
            {...props}
            className={ModalClasses.modal}
            size={ModalSize.DYNAMIC}
        >
            <ImageModal
                src={src}
                original={original}
                {...bounds}
                animated={animated}
                children={children}
                renderLinkComponent={props => <MaskedLink {...props} />}
                placeholder={placeholder}
                className={ModalClasses.image}
                shouldAnimate={DiscordModules.WindowInfo.isFocused()}
            />
        </ModalRoot>
    ));
}

export default class UserBackgrounds extends BasePlugin {
    public Store = BannerStore;

    public onStart() {
        stylesheet.inject();
        BannerStore.initialize();
        Utilities.suppressErrors(this.patchBanners.bind(this), "UserBanner.default patch")();
        Utilities.suppressErrors(this.patchUserPopout.bind(this), "UserPopoutContainer.type patch")();
    }


    public shouldShow(type: 1 | 2): boolean {
        return switchCase(type, [
            [0, Settings.get("showInPopout", true)],
            [1, Settings.get("showInProfile", true)]
        ], false);
    }

    public async patchUserPopout(): Promise<void> {
        const UserPopout = WebpackModules.getByProps("UserPopoutAvatar");
        const classes: {
            avatarPositionNormal: string;
            avatarPositionPremium: string;
        } = WebpackModules.getByProps("avatarPositionNormal");

        Patcher.after(UserPopout, "UserPopoutAvatar", (_, [{ user }], res) => {
            const props = res?.props?.children?.props;
            if (!props || props.className?.indexOf?.(classes.avatarPositionPremium) > -1 || !BannerStore.hasBanner(user.id)) return;

            props.className = props.className.replace(classes.avatarPositionNormal, classes.avatarPositionPremium);
        });
    }

    public async patchBanners(): Promise<void> {
        const BannerClasses: any = WebpackModules.getByProps("banner", "popoutBanner");
        const UserBanner: UserBanner = WebpackModules.getModule(m => m.default.displayName === "UserBanner");

        type params = {
            user: UserObject;
            bannerType: 1 | 2;
            guildId: void | string;
            onClose: () => void;
            children: React.ReactElement;
        };

        function BannerContainer({user, bannerType, children}: params) {
            const banner: banner = useStateFromStores([BannerStore], () => BannerStore.getBanner(user.id), null, _.isEqual);
            const [selection, setSelection] = useState(banner == null ? 1 : 0);
            const ref = useRef(null);
            const currentBanner = useMemo(() => (selection === 1 || banner == null) ? user.bannerURL : banner?.background, [banner, user, selection]);
            const currentOrientation = useMemo(() => (banner != null && selection === 0) ? banner.orientation : void 0, [banner, selection]);

            if (!user.banner && !banner) return children;
            children.props["data-user-id"] = user.id; // make theme devs happy

            children.props.className = switchCase(bannerType, [
                [0, joinClassNames("user-background", BannerClasses.banner, BannerClasses.popoutBannerPremium)],
                [1, joinClassNames("user-background", BannerClasses.banner, BannerClasses.profileBannerPremium)]
            ]);

            children.ref = ref;
            children.key = selection;
            children.props.style = {
                backgroundImage: `url(${currentBanner})`,
                backgroundPosition: currentOrientation
            };

            if (children.props.children[0]) children.props.children[0] = null;
            
            const handleContextMenu = event => {
                const width = ref.current?.offsetWidth;
                const height = ref.current?.offsetHeight;

                const menu = () => (
                    <Menu
                        navId="banner-context"
                        onClose={closeContextMenu}
                        >
                        <MenuItem
                            id="view-banner"
                            label="View Banner"
                            key="view-banner"
                            action={() => {
                                showImageModal(
                                    currentBanner,
                                    currentBanner,
                                    width,
                                    height,
                                    currentBanner?.endsWith(".gif"),
                                    null,
                                    currentBanner
                                );
                            }}
                        />
                    </Menu>
                );

                openContextMenu(event, menu);
            };

            return (
                <div className={styles.container} onContextMenu={handleContextMenu}>
                    <TextBadge color={Colors.BRAND_NEW_500} text={selection === 0 ? "USRBG" : "NATIVE"} className={styles.badge} />
                    {
                        (banner != null && user.banner != null) && (
                            <Button
                                className={joinClassNames(styles.arrow, styles.left)}
                                key="left"
                                look={Button.Looks.BLANK}
                                size={Button.Sizes.TINY}
                                onClick={setSelection.bind(null, 0)}
                                disabled={selection === 0 || user.banner == null}
                            >
                                <Arrow direction={Arrow.Directions.LEFT} />
                            </Button>
                        )
                    }
                    {children}
                    {
                        (banner != null && user.banner != null) && (
                            <Button
                                className={joinClassNames(styles.arrow, styles.right)}
                                key="right"
                                look={Button.Looks.BLANK}
                                size={Button.Sizes.TINY}
                                onClick={setSelection.bind(null, 1)}
                                disabled={selection === 1 || banner == null}
                            >
                                <Arrow direction={Arrow.Directions.RIGHT} key="right" />
                            </Button>
                        )
                    }
                </div>
            );
        }

        Patcher.after(UserBanner, "default", (__, [props], res) => {
            return (
                <BannerContainer {...props} children={res} key={props.user.id} />
            );
        });
    }

    public onStop() {
        stylesheet.remove();
        Patcher.unpatchAll();
        BannerStore.destroy();
    }
}