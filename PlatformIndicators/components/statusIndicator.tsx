import { Utils } from "@api";
import React from "react";

import { UserStore } from "../modules/shared";
import usePlatformStores from "../modules/usePlatformStores";
import * as Icons from "./icons";

type Platform = keyof typeof Icons;

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
    embedded: 1.2,
    mobile: 1.5,
    vr: 1.1
};
const CUTOUT_STROKE = 0.3;

const walkable = { walkable: ["props", "children"] };
const isStatusRect = (e: any) => e?.type === "rect" && typeof e.props?.mask === "string";
const isBackdrop = (e: any) => (e?.type === "circle" || e?.type === "rect") && e.props?.mask == null;

export function getUserIdFromAvatar(props: { "aria-label"?: unknown }): string | undefined {
    return typeof props["aria-label"] === "string" ? UserStore.findByTag(props["aria-label"])?.id : undefined;
}

interface StatusIndicatorProps {
    userId: string;
    svg: React.ReactElement<any>;
}

export default function StatusIndicator({ userId, svg }: StatusIndicatorProps) {
    const maskId = React.useId();
    const { clients, iconStates, shouldShow } = usePlatformStores(userId, "Avatar");
    const platform = Object.keys(clients).find(key => (iconStates[key] ?? true) && key in Icons) as Platform;
    if (!shouldShow || !platform) return svg;

    const avatar = Utils.findInTree(svg, (e: any) => e?.type === "foreignObject", walkable);
    const statusGroup = Utils.findInTree(
        svg,
        (e: any) => Array.isArray(e?.children) && e.children.some(isStatusRect),
        walkable
    );
    if (!avatar || !statusGroup) return svg;

    const index = statusGroup.children.findIndex(isStatusRect);
    const { x, y, width: dotWidth, height: dotHeight, fill, className } = statusGroup.children[index].props;

    const dotSize = Math.min(dotWidth, dotHeight);
    const [viewX, viewY, viewWidth, viewHeight] = ICON_BOUNDS[platform];
    const height = dotSize * ICON_HEIGHT[platform];
    const width = height * (viewWidth / viewHeight);
    const iconX = x + dotWidth - width;
    const iconY = y + dotHeight - height;

    const stroke = dotSize * CUTOUT_STROKE;
    const cutout = {
        x: iconX - stroke,
        y: iconY - stroke,
        width: width + stroke * 2,
        height: height + stroke * 2,
        rx: stroke
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
            <rect {...cutout} fill="black" />
        </mask>
    );
    avatar.props.mask = `url(#${maskId})`;

    svg.props.children = [mask, ...svg.props.children].map(child =>
        isBackdrop(child) ? (
            <rect key="platform-indicators-backdrop" {...cutout} fill={child.props.fill} style={child.props.style} />
        ) : (
            child
        )
    );

    const Icon = Icons[platform];
    statusGroup.children[index] = (
        <Icon
            x={iconX}
            y={iconY}
            width={width}
            height={height}
            viewBox={`${viewX} ${viewY} ${viewWidth} ${viewHeight}`}
            transform={undefined}
            className={className}
            style={{ color: fill }}
        />
    );

    return svg;
}
