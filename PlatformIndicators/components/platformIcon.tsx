import React from "react";

import { useStatusFillColor } from "../modules/shared";
import * as Icons from "./icons";

export type Platform = keyof typeof Icons;

interface PlatformIconProps extends React.SVGProps<SVGSVGElement> {
    platform: Platform;
    status: string;
    text?: string;
}

export default function PlatformIcon({ platform, status, style, ...props }: PlatformIconProps) {
    const Icon = Icons[platform];
    const color = useStatusFillColor(status);

    return <Icon {...props} style={{ color, ...style }} data-status={status} data-platform={platform} />;
}
