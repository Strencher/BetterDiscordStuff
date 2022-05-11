import { ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalRoot } from "@discord/modal";
import createStore from "common/hooks/zustand";
import styles from "./modal.scss";
import type { Session } from "../@types/sessionstore";
import { WebpackModules } from "@zlibrary";
import { Button, Flex, TooltipContainer as Tooltip } from "@discord/components";
import { FormDivider } from "@discord/forms";
import React, {useEffect} from "react";
import { Colors } from "@discord/constants";
import {Info, Users} from "@discord/stores";
import _ from "lodash";

const [useStore, Api] = createStore({ recent: [] });
const {Heading} = WebpackModules.getByProps("Heading") ?? {Heading: () => null};
const { TextBadge } = WebpackModules.getByProps("TextBadge");
const { AnimatedAvatar, Sizes: AvatarSizes } = WebpackModules.getByProps("AnimatedAvatar");
const StatusModule: {
    humanizeStatus: (statusId: string) => string;
} = WebpackModules.getByProps("humanizeStatus");

export function CardItem({session, type, timestamp, props}: any) {
    if (!session) return null;

    const {active, activities, clientInfo, status}: Session = session;

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
                    {Info.getSessionId() === session.sessionId && (
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
            <div className={styles.message}>
                {(() => {
                    switch (type) {
                        case "added": return `This session was added.`;
                        case "removed": return `This session was removed.`;
                        case "changed": return (
                            <span>
                                The <code className="inline">
                                    {props.property}
                                </code> about this session was changed: {props.from} -{">"} {props.to}
                            </span>
                        );
                    }
                })()}
            </div>
            <div className={styles.body}>
                <div className={styles.sessionInfo} key="timestamp">
                    <b>Timestamp:</b>
                    <span>{new Date(timestamp).toLocaleString()}</span>
                </div>
                <div className={styles.sessionInfo} key="activities">
                    <b>Activities:</b>
                    <span>{activities.length}</span>
                </div>
                <div className={styles.sessionInfo} key="sessionId">
                    <b>ID:</b>
                    <code className="inline">{session.sessionId}</code>
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
        </div>
    );
}

export default function Modal(props) {
    const entries = [...useStore(s => s.recent)].reverse();

    const newest = entries.shift();

    useEffect(() => {
        Api.setState({opened: true});

        return () => {
            Api.setState({opened: false});
        };
    }, []);

    return (
        <ModalRoot {...props} size={!!newest ? "medium" : "small"}>
            <ModalHeader separator={false}>
                <Heading level="2" variant="heading-lg/medium">Sessions Logs</Heading>
                <ModalCloseButton onClick={props.onClose} className={styles.closeButton} />
            </ModalHeader>
            <ModalContent>
                {!newest ? (
                    <div className={styles.center}>
                        <p>Nothing happened yet!</p>
                    </div>
                ) : (
                    <React.Fragment>
                        <CardItem {...newest} key={newest.session?.sessionId} />
                        {entries.length > 0 && <FormDivider className={styles.newDivider} />}
                        {entries.map(props => <CardItem {...props} key={props.session?.sessionId} />)}    
                    </React.Fragment>     
                )}
            </ModalContent>
            <ModalFooter>
                <Flex justify={Flex.Justify.END}>
                    <Button onClick={props.onClose}>Okay</Button>
                </Flex>
            </ModalFooter>
        </ModalRoot>
    );
};

export { Api as ModalApi };