import { WebpackModules } from "@zlibrary";
import type Sessions from "../@types/sessionstore";
import React, { useState } from "react";
import styles from "./list.scss";
import { FormDivider, FormTitle } from "@discord/forms";
import type { Session } from "../@types/sessionstore";
import _ from "lodash";
import { Colors } from "@discord/constants";
import { Info, Users } from "@discord/stores";
import { useStateFromStores } from "@discord/flux";
import { Button, Flex, TooltipContainer as Tooltip } from "@discord/components";
import { copy } from "@discord/native";
import { openModal } from "@discord/modal";

const SessionsStore: Sessions = WebpackModules.getByProps("getActiveSession");
const { TextBadge } = WebpackModules.getByProps("TextBadge");
const { AnimatedAvatar, Sizes: AvatarSizes } = WebpackModules.getByProps("AnimatedAvatar");
const AssetUtils = WebpackModules.getByProps("getAssetImage");
const ChangePasswordModal = WebpackModules.getByDisplayName("ChangePasswordModal");
const { RichPresenceSection } = WebpackModules.getByProps("RichPresenceSection");
const StatusModule: {
    humanizeStatus: (statusId: string) => string;
} = WebpackModules.getByProps("humanizeStatus");

function CopyButton({ copyText, copiedText, onClick }) {
    const [copied, setCopied] = useState(false);

    const handleButtonClick = (e: React.MouseEvent) => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
        onClick(e);
    };

    return (
        <Button
            onClick={handleButtonClick}
            color={copied ? Button.Colors.GREEN : Button.Colors.BRAND}
            size={Button.Sizes.SMALL}
            look={Button.Looks.FILLED}
        >
            {copied ? copiedText : copyText}
        </Button>
    );
}

export function Item({ session }: { session: string }) {
    const { active, activities, clientInfo, sessionId, status }: Session = useStateFromStores([SessionsStore], () => SessionsStore.getSessionById(session));

    const handleCopyJSON = () => {
        copy(JSON.stringify(SessionsStore.getSessionById(session), null, "\t"));
    };

    const handleOpenPasswordChangeModal = () => {
        openModal(props => (
            <ChangePasswordModal {...props} />
        ));
    };

    return (
        <div className={styles.item}>
            <div className={styles.headerContainer}>
                <b>{_.upperFirst(clientInfo.os)}</b>
                <div className={styles.badgesContainer}>
                    {active && (
                        <Tooltip position="top" text="The session is marked as an active session.">
                            <TextBadge color={Colors.BRAND_NEW_500} text="ACTIVE" />
                        </Tooltip>
                    )}
                    {Info.getSessionId() === sessionId && (
                        <Tooltip position="top" text="This is the current session.">
                            <TextBadge color={Colors.STATUS_GREEN_500} text="CURRENT" />
                        </Tooltip>
                    )}
                </div>
                <div className={styles.avatarWrapper}>
                    <AnimatedAvatar
                        isMobile={clientInfo.client === "mobile"}
                        status={status}
                        isTyping={false}
                        src={Users.getCurrentUser().getAvatarURL(null, 32, true)}
                        size={AvatarSizes.SIZE_32}
                        statusTooltip
                    />
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.activities}>
                    {activities.length
                        ? activities.map(ac => <RichPresenceSection
                            activity={ac}
                            getAssetImage={AssetUtils.getAssetImage}
                        />)
                        : <span className={styles.noActivity}>No activities running.</span>
                    }
                </div>
                <FormDivider className={styles.divider} />
                <div className={styles.sessionInfo} key="sessionId">
                    <b>ID:</b>
                    <code className="inline">{sessionId}</code>
                </div>
                <div className={styles.sessionInfo} key="sessionClient">
                    <b>Client:</b>
                    <span>{_.upperFirst(clientInfo.client)}</span>
                </div>
                <div className={styles.sessionInfo} key="sessionOs">
                    <b>OS:</b>
                    <span>{_.upperFirst(clientInfo.os)}</span>
                </div>
                <div className={styles.sessionInfo} key="sessionStatus">
                    <b>Status:</b>
                    <span>{StatusModule.humanizeStatus(status)}</span>
                </div>
            </div>
            <Flex className={styles.footer} justify={Flex.Justify.END}>
                <Button
                    look={Button.Looks.LINK}
                    color={Button.Colors.RED}
                    size={Button.Sizes.SMALL}
                    onClick={handleOpenPasswordChangeModal}
                >Not you?</Button>
                <CopyButton
                    copiedText="Copied!"
                    copyText="Copy JSON"
                    onClick={handleCopyJSON}
                />
            </Flex>
        </div>
    );
}

export default function SessionsList() {
    const sessions: Session[] = useStateFromStores([SessionsStore], () => SessionsStore.getSessions());

    const keys = Object.keys(sessions).filter(e => e !== "all");

    return (
        <React.Fragment>
            <FormDivider className={styles.listDivider} />
            <FormTitle tag="h1">{keys.length ? `Active Sessions [${keys.length}]` : "No active Sessions"}</FormTitle>
            <div className={styles.sessionsList}>
                {
                    keys.map(s => <Item session={s} />)
                }
            </div>
        </React.Fragment>
    );
}