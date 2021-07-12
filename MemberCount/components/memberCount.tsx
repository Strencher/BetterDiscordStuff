import { Flex, Tooltip } from "@discord/components";
import { useStateFromStoresArray } from "@discord/flux";
import { Messages } from "@discord/i18n";
import { joinClassNames } from "@discord/utils";
import { WebpackModules } from "@zlibrary";
import React, { useEffect } from "react";
import Settings from "../modules/Settings";
import MemberCountStore from "../stores/memberCount";
import styles from "./memberCount.scss";

const MemberActions = WebpackModules.getByProps("requestMembers");

export function renderCompact(total: number, online: number, isSticky: boolean) {
    return (
        <div className={joinClassNames(styles.wrapper, {[styles.sticky]: isSticky})} aria-type="compact">
            <span className={styles.label}>Members</span>
            <Flex direction={Flex.Direction.HORIZONTAL} className={styles.memberCounter}>
                <div className={styles.group} key="online">
                    <Tooltip text={Messages.STATUS_ONLINE}>
                        {props => (
                            <span {...props} className={joinClassNames(styles.pill, styles.online)} />
                        )}
                    </Tooltip>
                    <span className={styles.count}>{online ? online : Messages.DEFAULT_INPUT_PLACEHOLDER}</span>
                </div>
                <div className={styles.group} key="offline">
                    <Tooltip text={Messages.STATUS_OFFLINE}>
                        {props => (
                            <span {...props} className={joinClassNames(styles.pill, styles.offline)} />
                        )}
                    </Tooltip>
                    <span className={styles.count}>{total - online}</span>
                </div>
                <div className={styles.group} key="total">
                    <Tooltip text="Total">
                        {props => (
                            <span {...props} className={joinClassNames(styles.pill, styles.total)} />
                        )}
                    </Tooltip>
                    <span className={styles.count}>{total}</span>
                </div>
            </Flex>
        </div>
    );
};

export function renderComplex(total: number, online: number, isSticky: boolean) {
    return (
        <div className={joinClassNames(styles.wrapper, {[styles.sticky]: isSticky})} aria-type="complex">
            <Flex direction={Flex.Direction.VERTICAL} className={styles.inner}>
                <div className={styles.group} key="online">
                    <span className={styles.label}>{Messages.STATUS_ONLINE}:</span>
                    <span className={styles.count}>{online ? online : Messages.DEFAULT_INPUT_PLACEHOLDER}</span>
                </div>
                <div className={styles.group} key="offline">
                    <span className={styles.label}>{Messages.STATUS_OFFLINE}:</span>
                    <span className={styles.count}>{total - online}</span>
                </div>
                <div className={styles.group} key="total">
                    <span className={styles.label}>Total:</span>
                    <span className={styles.count}>{total}</span>
                </div>
            </Flex>
        </div>
    );
};

export default function MemberCountDisplay({ guildId }:  {guildId: string}): JSX.Element {
    const [totalMembers, onlineMembers, displayMode, isSticky] = useStateFromStoresArray([MemberCountStore, Settings], () => [
        guildId === "owo" ? 1765 : MemberCountStore.getMemberCount(guildId),
        guildId === "owo" ? 960 : MemberCountStore.getOnlineMemberCount(guildId),
        Settings.get("displayMode", 0),
        Settings.get("displaySticky", true)
    ]);
    
    useEffect(() => {
        if (!onlineMembers) {
            MemberActions.requestMembers(guildId);
        }
    }, [guildId]);
    
    switch (displayMode) {
        case 0: return renderCompact(totalMembers, onlineMembers, isSticky);
        case 1: return renderComplex(totalMembers, onlineMembers, isSticky);
        default: return <span>Bruh.</span>;
    }
};
