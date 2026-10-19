import { Components, Hooks } from "@api";
import ErrorBoundary from "@common/ErrorBoundary";
import { Settings, SettingsPanel as _SettingsPanel } from "@common/Settings";
import React from "react";

import { buildClassName } from "../../modules/shared";
import SettingsItems from "../../settings.json";
import * as Icons from "../icons";
import { Platform } from "../platformIcon";
import Styles from "./style.scss";

const { Checkbox, SettingItem, Text, Tooltip } = Components;

const NO_OVERRIDES: Record<string, boolean> = Object.freeze({});
const TILE_VIEWBOX: Partial<Record<Platform, string>> = { mobile: "-8 -2.5 40 40" };

interface PlatformIconsColumn {
    id: string;
    name: string;
    enableWith?: string;
}

interface PlatformIconsProps {
    id: string;
    name: string;
    note?: string;
    platforms: { id: Platform; name: string }[];
    columns: PlatformIconsColumn[];
}

function PlatformIcons({ id, name, note, platforms, columns }: PlatformIconsProps) {
    const uid = React.useId();
    const states = Hooks.useStateFromStores(
        [Settings] as any,
        () => columns.map(column => Settings.get(column.id, NO_OVERRIDES)),
        undefined,
        true
    );
    const enabled = Hooks.useStateFromStores(
        [Settings] as any,
        () => columns.map(column => !column.enableWith || Settings.get(column.enableWith, true)),
        undefined,
        true
    );

    const hints = columns.map(column => {
        const dependency = SettingsItems.items.find(item => item.id === column.enableWith);
        return `Requires "${dependency?.name ?? column.enableWith}" to be enabled.`;
    });

    const toggle = (column: PlatformIconsColumn, platform: Platform, shown: boolean) => {
        Settings.set(column.id, { ...Settings.get(column.id, NO_OVERRIDES), [platform]: shown });
    };

    return (
        <ErrorBoundary id={id}>
            <SettingItem id={id} name={name} note={note} divider={false}>
                <div className={Styles.platformIndicatorTable} role="table" aria-label={name}>
                    <div
                        className={buildClassName(Styles.platformIndicatorRow, Styles.platformIndicatorHead)}
                        role="row"
                    >
                        <Text tag="span" role="columnheader" size={Text.Sizes.SIZE_12} color={Text.Colors.MUTED} strong>
                            Platform
                        </Text>
                        {columns.map((column, index) => (
                            <Tooltip key={column.id} text={hints[index]} shouldShow={!enabled[index]}>
                                {(props: any) => (
                                    <div
                                        {...props}
                                        role="columnheader"
                                        className={buildClassName(
                                            Styles.platformIndicatorCell,
                                            !enabled[index] && Styles.platformIndicatorDisabled
                                        )}
                                    >
                                        <Text tag="span" size={Text.Sizes.SIZE_12} color={Text.Colors.MUTED} strong>
                                            {column.name}
                                        </Text>
                                    </div>
                                )}
                            </Tooltip>
                        ))}
                    </div>
                    {platforms.map(platform => {
                        const Icon = Icons[platform.id];

                        return (
                            <div key={platform.id} className={Styles.platformIndicatorRow} role="row">
                                <div className={Styles.platformIndicatorPlatform} role="rowheader">
                                    <span className={Styles.platformIndicatorIcon}>
                                        <Icon
                                            width={20}
                                            height={20}
                                            viewBox={TILE_VIEWBOX[platform.id] ?? "0 0 24 24"}
                                            transform={undefined}
                                            aria-hidden
                                        />
                                    </span>
                                    <Text tag="span" size={Text.Sizes.SIZE_16}>
                                        {platform.name}
                                    </Text>
                                </div>
                                {columns.map((column, index) => {
                                    const inputId = `${uid}-${column.id}-${platform.id}`;

                                    return (
                                        <Tooltip key={column.id} text={hints[index]} shouldShow={!enabled[index]}>
                                            {(props: any) => (
                                                <div
                                                    {...props}
                                                    role="cell"
                                                    className={buildClassName(
                                                        Styles.platformIndicatorCell,
                                                        !enabled[index] && Styles.platformIndicatorLocked
                                                    )}
                                                >
                                                    <div
                                                        className={Styles.platformIndicatorCellContent}
                                                        inert={!enabled[index]}
                                                    >
                                                        <label
                                                            htmlFor={inputId}
                                                            className={Styles.platformIndicatorSrOnly}
                                                        >
                                                            {`${platform.name}: ${column.name}`}
                                                        </label>
                                                        <Checkbox
                                                            id={inputId}
                                                            value={states[index][platform.id] ?? true}
                                                            disabled={!enabled[index]}
                                                            onChange={shown => toggle(column, platform.id, shown)}
                                                            className={Styles.platformIndicatorCheckbox}
                                                            inputClassName={Styles.platformIndicatorCheckboxInput}
                                                            iconClassName={Styles.platformIndicatorCheckboxBox}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </Tooltip>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </SettingItem>
        </ErrorBoundary>
    );
}

export default function SettingsPanel() {
    return <_SettingsPanel items={SettingsItems.items} components={{ "platform-icons": PlatformIcons }} />;
}
