
import React from "react";
import {TooltipContainer as Tooltip} from "@discord/components"
import Connections from "@discord/connections";
import styles from "./badge.scss";
import {joinClassNames} from "@discord/utils";
import Settings from "../Settings";
import FlowerStar from "./icons/flowerstar";
// import {default as ContextMenu, closeContextMenu, MenuGroup, MenuItem, openContextMenu} from "@discord/contextmenu";
// import {Messages} from "@discord/i18n";
// import {copy} from "@discord/native";

export default function Badge({item}) {
    const connection = Connections.get(item.type);
    const onClick = () => {
        try {
            open(connection.getPlatformUserUrl(item), "_blank");
        } catch {}
    };
    
    const onContextMenu = e => {
        //TODO: FIX ThIS
        // const menu = () => (
        //     <ContextMenu navId="connections-context" onClose={closeContextMenu}>
        //         <MenuGroup>
        //             <MenuItem id="copy-user-id" label={Messages.COPY_ID} action={() => copy(item.id)} />
        //         </MenuGroup>
        //     </ContextMenu>
        // );
        // console.log(menu);
        // openContextMenu(e, menu);
    };

    const shouldVerified = Settings.get("showVerifiedConnections", true) && item.verified;

    return <Tooltip text={item.name} className={joinClassNames(styles.connection, {[styles.verified]: shouldVerified})}>
        <img onContextMenu={onContextMenu} onClick={onClick} src={connection.icon.color} />
        {shouldVerified && <FlowerStar className={styles.verifiedBadge}/>}
    </Tooltip>;
}