/// <reference path="../../../../bdbuilder/typings/main.d.ts" />
import React, { useMemo, useState } from "react";
import Pages from "./pages.json";
import { WebpackModules } from "@zlibrary"; 
import Utilities from "../../Utilities";
import Settings from "../../Settings";
import styles from "./settings.scss";
import ErrorBoundary from "../errorboundary";
import { FormItem, FormText, FormTitle, FormDivider } from "@discord/forms";
import { Flex, TooltipContainer as Tooltip } from "@discord/components";
import Icon from "../icons/index";
import Connections from "@discord/connections";
import { joinClassNames} from "@discord/utils";

const RadioGroup = Utilities.createUpdateWrapper(WebpackModules.getByDisplayName("RadioGroup"));
const SwitchItem = Utilities.createUpdateWrapper(WebpackModules.getByDisplayName("SwitchItem"), false);
const TextInput = Utilities.createUpdateWrapper(WebpackModules.getByDisplayName("TextInput"));
const breadCrumbs = WebpackModules.getByProps("breadcrumbActive");
const {marginBottom8} = WebpackModules.getByProps("marginBottom8");
const Breadcrumbs = WebpackModules.getByDisplayName("Breadcrumbs");
const {default: CardItem} = WebpackModules.find(m => m?.default?.toString().indexOf("hasNextSection") > -1) ?? {default: () => null};
const Card = WebpackModules.getByDisplayName("Card");
const Caret = WebpackModules.getByDisplayName("Caret");
const Clickable = WebpackModules.getByDisplayName("Clickable");
const FlagsStore = WebpackModules.getModule(m => typeof m.keys === "function" && m.resolve && m.keys().some(e => e.includes("en-US")));

const TextItem = ({value, onChange, name, note}) => {
    return (
        <Flex className={marginBottom8} direction={Flex.Direction.VERTICAL}>
            <FormItem title={name} className={styles.formItem}>
                <TextInput value={value} onChange={onChange}/>
                <FormText type="description" disabled={false}>{note}</FormText>
            </FormItem>
            <FormDivider />
        </Flex>
    );
}

const IconSetting = () => {
    const forceUpdate = Utilities.useForceUpdate(); 
    const shownIcons = Settings.get("shownConnections", Object.fromEntries(Connections.map(e => [e.type, true])));

    return <Flex className={styles.icons}>
        {
            Connections.filter(e => e.enabled).map(k => (
                <Tooltip className={styles.settingsBadgeContainer} text={shownIcons[k.type] ? "Enabled" : "Disabled"} hideOnClick={false}>
                    <img
                        src={k.icon.color}
                        className={Utilities.joinClassNames(styles.settingsBadgeIcon, shownIcons[k.type] ? "enabled" : styles.disabled)}
                        onClick={() => {
                            Settings.set("shownConnections", (shownIcons[k.type] = !shownIcons[k.type], shownIcons)); 
                            forceUpdate();
                        }}
                    />
                </Tooltip>
            ))
        }
    </Flex>;
};

const Translation = ({name, note, id}) => {
    const icon = useMemo(() => {
        try {
            return <img src={FlagsStore("./" + id + ".png")} className={joinClassNames(styles.translation, styles.marginBottom8)} />
        } catch {
            return null;
        }
    }, [id]);

    return (
        <React.Fragment>
            <Flex direction={Flex.Direction.HORIZONTAL} justify={Flex.Justify.BETWEEN} align={Flex.Align.CENTER} className={styles.descriptionItem}>
                {icon}
                <FormTitle tag={FormTitle.Tags.H5}>{name}</FormTitle>
                <Flex justify={Flex.Justify.END} align={Flex.Align.START} className={styles.marginBottom8}>
                    <FormText>{note}</FormText>
                </Flex>
            </Flex>
            <FormDivider />
        </React.Fragment>
    );
};

const Category = props => {
    const [opened, setOpened] = useState(false);

    return (
        <Card className={Utilities.joinClassNames(styles.category, opened && styles.opened)}>
            <Clickable onClick={() => setOpened(!opened)}>
                <Flex className={styles.categoryHeader} direction={Flex.Direction.HORIZONTAL}>
                    {props.name}
                    <Caret className={styles.categoryCaret} direction={Caret.Directions[opened ? "DOWN" : "LEFT"]} />
                </Flex>
            </Clickable>
            <div className={styles.categoryContent}>
                {opened && props.items.map(renderSetting)}
            </div>
        </Card>
    );
};

const renderSetting = setting => {
    setting = _.cloneDeep(setting);

    switch(setting.type) {
        case "switch": return (
            <SwitchItem 
                {...setting}
                value={Settings.get(setting.id, setting.value)}
                onChange={Settings.set.bind(Settings, setting.id)}
            >{setting.name}</SwitchItem>
        );
        case "replacement": return (
            <Flex direction={Flex.Direction.HORIZONTAL} className={styles.replacementVariable}>
                <b>{setting.prefix}</b>
                <span>{setting.description}</span>
            </Flex>
        );
        case "radio":
            const {name, note} = setting;
            delete setting.name;
            delete setting.note; 
            return (
                <FormItem title={name}>
                    {note && <FormText type="description" className={styles.marginBottom8}>{note}</FormText>}
                    <RadioGroup
                        {...setting}
                        value={Settings.get(setting.id, setting.value)}
                        onChange={Settings.set.bind(Settings, setting.id)}
                    />
                </FormItem>
            );
        case "text": return (
            <TextItem 
                {...setting}
                value={Settings.get(setting.id, setting.value)}
                onChange={Settings.set.bind(Settings, setting.id)}
            />
        );
        case "icons": return <IconSetting />;
        case "category": return <Category {...setting} />;
        case "translation": return <Translation {...setting} />;
        case "divider": return <FormDivider />;
    }
};

const renderCustomcrumb = ({label}, isActive) => {
    return (
        <FormTitle
            tag={FormTitle.Tags.H2}
            className={Utilities.joinClassNames(breadCrumbs.breadcrumb, isActive ? breadCrumbs.breadcrumbActive : breadCrumbs.breadcrumbInactive)}
        >{label}</FormTitle>
    );
}

const mainPages = [
    {
        id: "main",
        label: "Modules"
    }
];

export default function SettingsPanel() {
    const [activeItem, setActiveItem] = useState("main");

    return (
        <ErrorBoundary id="SettingsPanel">
            <div className={styles.settingsPanel}>
                <Flex align={Flex.Align.CENTER} basis="auto" className={breadCrumbs.breadcrumbs} grow={1} shrink={1}>
                    {
                        activeItem === "main"
                            ? <FormTitle className={breadCrumbs.breakcrumb} tag={FormTitle.Tags.H2}>Modules</FormTitle>
                            : <Breadcrumbs activeId={activeItem} breadcrumbs={mainPages.concat({id: activeItem, label: Pages[activeItem].name})} renderCustomBreadcrumb={renderCustomcrumb} onBreadcrumbClick={e => setActiveItem(e.id)} />
                    }
                </Flex>
                {
                    activeItem === "main"
                        ? Pages.map((page, index) => (
                            <CardItem 
                                buttonDisabled={false}
                                buttonText="Configure"
                                details={[{text: `${page.items.length} setting${page.items.length > 1 ? "s" : ""}.`}]}
                                hasNextSection={true}
                                icon={() => <Icon className={styles.pageIcon} name={page.icon} />}
                                name={page.name}
                                onButtonClick={() => setActiveItem(index)}
                            />
                        ))
                        : Pages[activeItem].items.map(renderSetting)
                }
            </div>
        </ErrorBoundary>
    )
}