import { Button, Flex, Tooltip } from "@discord/components";
import { useStateFromStores } from "@discord/flux";
import { FormDivider, FormItem, FormText, FormTitle } from "@discord/forms";
import { Guilds } from "@discord/stores";
import { joinClassNames } from "@discord/utils";
import { WebpackModules } from "@zlibrary";
// @ts-ignore
import Category from "common/components/category";
import { useCallback } from "react";
import Settings from "../modules/Settings";
import MemberCountDisplay from "./memberCount";
import styles from "./settings.scss";


const RadioGroup = WebpackModules.getByDisplayName("RadioGroup");
const SwitchItem = WebpackModules.getByDisplayName("SwitchItem");

export const DisplsayModes = [
    {
        name: "Compact",
        value: 0
    },
    {
        name: "Complex",
        value: 1
    }
];

export default function SettingsPanel() {
    let [displayMode, displaySticky, excludeGuilds] = useStateFromStores([Settings], () => [
        Settings.get("displayMode", 0),
        Settings.get("displaySticky", true),
        Settings.get("excludeGuilds", {})
    ]);

    const handleGuildToggle = useCallback((guildId: string) => {
        if (excludeGuilds[guildId]) {
            delete excludeGuilds[guildId]
        } else {
            excludeGuilds[guildId] = true;
        }

        Settings.set("excludeGuilds", excludeGuilds);
    }, [excludeGuilds]);

    return (
        <>
            <Category look={Category.Looks.COMPACT} label="General">
                <SwitchItem
                    value={displaySticky}
                    note="Defines if the counter should be shown sticky inside the scroller."
                    onChange={value => Settings.set("displaySticky", value)}
                >Sticky Position</SwitchItem>
                <FormItem title="Display Mode">
                    <FormText type="description">See in the preview below.</FormText>
                    <RadioGroup value={displayMode} disabled={false} options={DisplsayModes} onChange={({value}) => Settings.set("displayMode", value)} />
                </FormItem>
            </Category>
            <Category look={Category.Looks.COMPACT} label="Guilds">
                <FormTitle tag="h2">Exlude Guilds from MemberCounter</FormTitle>
                <div className={styles.guildsList}>
                    {
                        Object.values(Guilds.getGuilds()).map(guild => (
                            <Tooltip
                                position="top"
                                text={excludeGuilds[guild.id] ? "Disabled" : "Enabled"}
                                key={guild.id}
                            >
                                {props => (
                                    <div
                                        {...props}
                                        className={joinClassNames(styles.guild, { [styles.disabled]: Boolean(excludeGuilds[guild.id]) })}
                                        onClick={() => handleGuildToggle(guild.id)}
                                    >
                                        {guild.icon
                                            ? <img src={guild.getIconURL(true)} />
                                            : <div className={styles.guildAcronym}>{guild.acronym}</div>
                                        }
                                    </div>
                                )}
                            </Tooltip>
                        ))
                    }
                </div>
                <Flex justify={Flex.Justify.END} direction={Flex.Direction.HORIZONTAL}>
                    <Flex.Child basis="auto" shrink="1" grow="0" wrap>
                        <Button
                            size={Button.Sizes.MEDIUM}
                            look={Button.Looks.OUTLINED}
                            color={Button.Colors.BRAND}
                            onClick={() => Settings.set("excludeGuilds", Object.keys(Guilds.getGuilds()).reduce((guilds, id) => (guilds[id] = true, guilds), {}))}
                        >Disable All</Button>
                    </Flex.Child>
                    <Flex.Child basis="auto" shrink="1" grow="0" wrap>
                        <Button
                            size={Button.Sizes.MEDIUM}
                            look={Button.Looks.OUTLINED}
                            color={Button.Colors.RED}
                            onClick={() => Settings.set("excludeGuilds", {})}
                        >Reset</Button>
                    </Flex.Child>
                </Flex>
            </Category>
            <Category look={Category.Looks.COMPACT} label="Preview">
                <MemberCountDisplay guildId="owo" />
            </Category>
        </>
    );
}