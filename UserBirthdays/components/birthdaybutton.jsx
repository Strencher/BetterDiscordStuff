import Settings from "../settings";
import Icon from "./icons/index";
import styles from "./birthdaybutton.scss";
import ContextMenu, {closeContextMenu, MenuItem, openContextMenu} from "@discord/contextmenu";
import {Modals} from "@zlibrary";
import Strings from "../strings";
import {openModal} from "@discord/modal";
import UserBirthdayChooseModal from "./modal";
import {TooltipContainer as Tooltip} from "@discord/components";

function hasBirthday(user) {
    const birthday = Settings.get("users", {})[user.id];
    const date = new Date();
    return birthday ? date.getDate() === birthday.day && (date.getMonth() + 1) === birthday.month : false;
}

export default function BirthdayButton({user, strict = false}) {
    const birthday = Settings.get("users", {})[user.id]; 

    if (strict) {
        if (!hasBirthday(user)) return null;
    }

    const handleClick = () => {
        openModal(props => <UserBirthdayChooseModal {...props} user={user} />);
    };

    const handleContextMenu = () => {
        Modals.showConfirmationModal(Strings.ARE_YOU_SURE, Strings.DELETE_BIRTHDAY_CONFIRM.format({name: user.username}), {
            confirmText: Strings.DELETE,
            cancelText: Strings.CANCEL,
            onConfirm: () => {
                delete Settings.get("users", {})[user.id];
                Settings.saveState();
            }
        });
    };
    
    return (
        <Tooltip text={birthday ? `${birthday.day}.${birthday.month}.${new Date().getFullYear()}` : Strings.CHOOSE_BIRTHDAY} className={styles.button}>
            <Icon name="Cake" onClick={handleClick} onContextMenu={handleContextMenu} />
        </Tooltip>
    );
}