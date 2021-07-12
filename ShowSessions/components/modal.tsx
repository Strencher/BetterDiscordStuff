import { Button, Flex } from "@discord/components";
import { ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalRoot } from "@discord/modal";
import createStore from "../../../common/hooks/zustand";
import styles from "./modal.scss";
import type { Session } from "../@types/sessionstore";
import { WebpackModules } from "@zlibrary";
import SessionsStore from "../@types/sessionstore";
import { useStateFromStores } from "@discord/flux";
import { FormDivider } from "@discord/forms";

const [useStore, Api] = createStore({ recent: [] });
const SessionsStore: SessionsStore = WebpackModules.getByProps("getActiveSession");

export function CardItem({ sessionId }: { sessionId: string }) {
    const { active, activities, clientInfo, status }: Session = useStateFromStores([SessionsStore], () => SessionsStore.getSessionById(sessionId));

    return (
        <div className={styles.deviceInfo}>
            <ul className={styles.item}>
                <span className={styles.label}>SessionID:</span>
                <span>{sessionId}</span>
            </ul>
            <ul className={styles.item}>
                <span className={styles.label}>Activities:</span>
                <span>{activities.length}</span>
            </ul>
            <ul className={styles.item}>
                <span className={styles.label}>Client:</span>
                <span>{clientInfo.client}</span>
            </ul>
            <ul className={styles.item}>
                <span className={styles.label}>OS:</span>
                <span>{clientInfo.os}</span>
            </ul>
        </div>
    );
}

export default function Modal(props) {
    const entries = [...useStore(s => s.recent)];

    const newest = entries.shift();

    return (
        <ModalRoot {...props}>
            <ModalHeader>
                <Flex align={Flex.Align.END}>
                    <ModalCloseButton onClick={props.onClose} />
                </Flex>
            </ModalHeader>
            <ModalContent>
                <CardItem sessionId={newest} />
                <FormDivider className={styles.newDivider} />
                {
                    entries.map(e => <CardItem sessionId={e} key={e} />)
                }
            </ModalContent>
            <ModalFooter>
                <Flex align={Flex.Align.END}>
                    <Button onClick={props.onClose}>Okay</Button>
                </Flex>
            </ModalFooter>
        </ModalRoot>
    )
};

export { Api as ModalApi };