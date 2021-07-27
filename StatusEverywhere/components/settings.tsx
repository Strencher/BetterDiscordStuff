import React from "react";
import createUpdateWrapper from "common/hooks/createUpdateWrapper";
import { WebpackModules } from "@zlibrary";
import Settings from "../settings";
// @ts-ignore
import Category from "common/components/category";
import {TinyColorPicker} from "./colorPicker";
import { Flex } from "@discord/components";
import { FormText, FormTitle } from "@discord/forms";
import _ from "lodash";
import styles from "./settings.scss";
import settingsItems from "./settings.json";
import type { ColorSettingProps, SwitchSettingProps } from "../@types/settings";

const SwitchItem = createUpdateWrapper(WebpackModules.getByDisplayName("SwitchItem"));

function SwitchSetting({ name, value, id, note }: SwitchSettingProps) {
    return (
        <SwitchItem
            children={name}
            value={Settings.get(id, value)}
            onChange={(value: bool) => Settings.set(id, value)}
            note={note}
        />
    );
};

function ColorSetting({ name, value, id, note }: ColorSettingProps) {
    return (
        <Flex direction={Flex.Direction.VERTICAL} className={styles.settingContainer}>
            <FormTitle tag="h3">{name}</FormTitle>
            <Flex align={Flex.Align.END}>
                <FormText type="description">{note}</FormText>
            </Flex>
            <TinyColorPicker defaultValue={value} value={Settings.get(id, value)} onChange={_.debounce(value => Settings.set(id, value), 500)} className={styles.colorPickerItem} />
        </Flex>
    );
};

export default function SettingsPanel(): React.ReactNode {
    return Object.entries(settingsItems).map(([key, items]) => (
        <Category
            look={Category.Looks.COMPACT}
            label={key.replace(/_/g, " ")}
            key={key}
        >
            {
                Object.entries(items).map(([id, props]) => {
                    switch (props.type) {
                        case "switch": return <SwitchSetting {...props} id={id} key={id} />;
                        case "color": return <ColorSetting {...props} id={id} key={id} />
                    }
                })
            }
        </Category>
    ));
};