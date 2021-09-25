import React from "react";
import {Tooltip} from "@discord/components"
import Connections from "@discord/connections";
import styles from "./badge.scss";
import {joinClassNames} from "@discord/utils";
import Settings from "../Settings";
import FlowerStar from "./icons/flowerstar";
import {Menu as ContextMenu, closeContextMenu, MenuGroup, MenuItem, openContextMenu} from "@discord/contextmenu";
import {Messages} from "@discord/i18n";
import {copy} from "@discord/native";
import _ from "lodash";

export default function Badge({item}) {
    const connection = Connections.get(item.type);
    const onClick = () => {
        try {
            open(connection.getPlatformUserUrl(item), "_blank");
        } catch {}
    };
    
    const onContextMenu = e => {
        const menu = () => (
            <ContextMenu navId="connections-context" onClose={closeContextMenu}>
                <MenuGroup>
                    <MenuItem id="copy-connection-id" label={Messages.COPY_ID} action={() => copy(item.id)} />
                </MenuGroup>
            </ContextMenu>
        );
        
        openContextMenu(e, menu);
    };

    const shouldVerified = Settings.get("showVerifiedConnections", true) && item.verified;

    return (
        <Tooltip text={`${_.upperFirst(item.type)}: ${item.name}`}>
            {props => (
                <div {...props} className={joinClassNames(styles.connection, {[styles.verified]: shouldVerified})}>
                    <img onContextMenu={onContextMenu} onClick={onClick} src={connection.icon.color} />
                    {shouldVerified && <FlowerStar className={styles.verifiedBadge}/>}
                </div>
            )}
        </Tooltip>
    );
}