import { Utils } from "@api";
import React from "react";

import { UserStore } from "../modules/shared";
import usePlatformStores from "../modules/usePlatformStores";
import * as Icons from "./icons";
import PlatformIcon, { Platform } from "./platformIcon";

const ICON_BOUNDS: Record<Platform, [x: number, y: number, width: number, height: number]> = {
    desktop: [2, 2, 20, 20],
    web: [2, 2, 20, 20],
    vr: [1, 4, 22, 16],
    embedded: [2, 5, 20, 14],
    mobile: [0, 0, 24, 35]
};

const ICON_HEIGHT: Record<Platform, number> = {
    desktop: 1.2,
    web: 1.2,
    embedded: 1,
    mobile: 1.5,
    vr: 1.1
};

const ICON_OUTLINES: Record<Platform, string> = {
    desktop:
        "M4 2.5C2.897 2.5 2 3.397 2 4.5V15.5C2 16.604 2.897 17.5 4 17.5H11V19.5H7V21.5H17V19.5H13V17.5H20C21.103 17.5 22 16.604 22 15.5V4.5C22 3.397 21.103 2.5 20 2.5H4Z",
    web: "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20Z",
    mobile: "M 2.882812 0.246094 C 1.941406 0.550781 0.519531 2.007812 0.230469 2.953125 C 0.0585938 3.542969 0 7.234375 0 17.652344 L 0 31.554688 L 0.5 32.558594 C 1.117188 33.769531 2.152344 34.5625 3.519531 34.847656 C 4.210938 35 7.078125 35.058594 12.597656 35 C 20.441406 34.941406 20.691406 34.925781 21.441406 34.527344 C 22.347656 34.054688 23.078125 33.3125 23.578125 32.386719 C 23.921875 31.761719 23.941406 30.964844 24 18.085938 C 24.039062 8.503906 24 4.167969 23.847656 3.464844 C 23.558594 2.121094 22.75 1.097656 21.519531 0.492188 L 20.5 0 L 12.039062 0.0195312 C 6.402344 0.0390625 3.328125 0.113281 2.882812 0.246094 Z",
    vr: "M15.55 5a5.5 5.5 0 0 1 5.15 3.67h.3a2 2 0 0 1 2 2v3.18a2 2 0 0 1-2 1.99h-.2A4.54 4.54 0 0 1 16.55 19a4.45 4.45 0 0 1-3.6-1.83 1.2 1.2 0 0 0-1.9 0 4.44 4.44 0 0 1-3.9 1.82 4.54 4.54 0 0 1-3.94-3.15H3a2 2 0 0 1-2-2v-3.18c0-1.1.9-1.99 2-1.99h.3A5.5 5.5 0 0 1 8.46 5h7.09Z",
    embedded:
        "M5.79335761,5 L18.2066424,5 C19.7805584,5 21.0868816,6.21634264 21.1990185,7.78625885 L21.8575059,17.0050826 C21.9307825,18.0309548 21.1585512,18.9219909 20.132679,18.9952675 C20.088523,18.9984215 20.0442685,19 20,19 C18.8245863,19 17.8000084,18.2000338 17.5149287,17.059715 L17,15 L7,15 L6.48507125,17.059715 C6.19999155,18.2000338 5.1754137,19 4,19 C2.97151413,19 2.13776159,18.1662475 2.13776159,17.1377616 C2.13776159,17.0934931 2.1393401,17.0492386 2.1424941,17.0050826 L2.80098151,7.78625885 C2.91311838,6.21634264 4.21944161,5 5.79335761,5 Z"
};
const CUTOUT_STROKE = 0.3;

const walkable = { walkable: ["props", "children"] };
const isStatusRect = (e: any) => e?.type === "rect" && typeof e.props?.mask === "string";
const isBackdrop = (e: any) => (e?.type === "circle" || e?.type === "rect") && e.props?.mask == null;
const isAvatar = (e: any) => e?.type === "foreignObject";
const isStatusGroup = (e: any) =>
    React.isValidElement<any>(e) && Array.isArray(e.props.children) && e.props.children.some(isStatusRect);

function updateInTree(node: any, predicate: (e: any) => boolean, update: (e: React.ReactElement<any>) => any): any {
    if (predicate(node)) return update(node);

    if (Array.isArray(node)) {
        for (let i = 0; i < node.length; i++) {
            const child = updateInTree(node[i], predicate, update);
            if (child !== node[i]) return node.with(i, child);
        }
        return node;
    }

    if (!React.isValidElement<any>(node) || node.props.children == null) return node;

    const children = updateInTree(node.props.children, predicate, update);
    return children === node.props.children ? node : React.cloneElement(node, { children });
}

const AVATAR_USER_ID = /\/(?:users|avatars)\/(\d+)\//;

export function getUserIdFromAvatar(props: { src?: unknown; "aria-label"?: unknown }): string | undefined {
    const avatarUserId = typeof props.src === "string" ? props.src.match(AVATAR_USER_ID)?.[1] : undefined;
    if (avatarUserId) return avatarUserId;

    return typeof props["aria-label"] === "string" ? UserStore.findByTag(props["aria-label"])?.id : undefined;
}

interface AvatarIndicatorProps {
    userId: string;
    svg: React.ReactElement<any>;
}

export default function AvatarIndicator({ userId, svg }: AvatarIndicatorProps) {
    const maskId = React.useId();
    const { clients, iconStates, shouldShow } = usePlatformStores(userId, "Avatar");
    const platform = Object.keys(clients).find(key => (iconStates[key] ?? true) && key in Icons) as Platform;
    if (!shouldShow || !platform) return svg;

    const avatar = Utils.findInTree(svg, isAvatar, walkable);
    const statusGroup = Utils.findInTree(svg, isStatusGroup, walkable);
    if (!avatar || !statusGroup) return svg;

    const index = statusGroup.props.children.findIndex(isStatusRect);
    const { x, y, width: dotWidth, height: dotHeight, className } = statusGroup.props.children[index].props;

    const dotSize = Math.min(dotWidth, dotHeight);
    const [viewX, viewY, viewWidth, viewHeight] = ICON_BOUNDS[platform];
    const height = dotSize * ICON_HEIGHT[platform];
    const width = height * (viewWidth / viewHeight);
    const iconX = x + dotWidth - width;
    const iconY = y + dotHeight - height;

    const scale = width / viewWidth;
    const outline = {
        d: ICON_OUTLINES[platform],
        transform: `translate(${iconX - viewX * scale} ${iconY - viewY * scale}) scale(${scale})`,
        strokeWidth: (dotSize * CUTOUT_STROKE * 2) / scale,
        strokeLinejoin: "round" as const
    };

    const size = avatar.props.width;
    const mask = (
        <mask
            key="platform-indicators-mask"
            id={maskId}
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={size}
            height={size}
        >
            <circle cx={size / 2} cy={size / 2} r={size / 2} fill="white" />
            <path {...outline} fill="black" stroke="black" />
        </mask>
    );

    let tree = updateInTree(svg, isAvatar, e => React.cloneElement(e, { mask: `url(#${maskId})` }));
    tree = updateInTree(tree, isStatusGroup, e =>
        React.cloneElement(e, {
            children: e.props.children.with(
                index,
                <PlatformIcon
                    platform={platform}
                    status={clients[platform]}
                    x={iconX}
                    y={iconY}
                    width={width}
                    height={height}
                    viewBox={`${viewX} ${viewY} ${viewWidth} ${viewHeight}`}
                    transform={undefined}
                    className={className}
                    data-location="avatar"
                />
            )
        })
    );

    return React.cloneElement(tree, {
        children: [mask, ...tree.props.children].map(child =>
            isBackdrop(child) ? (
                <path
                    key="platform-indicators-backdrop"
                    {...outline}
                    fill={child.props.fill}
                    stroke={child.props.fill}
                    style={child.props.style}
                />
            ) : (
                child
            )
        )
    });
}
