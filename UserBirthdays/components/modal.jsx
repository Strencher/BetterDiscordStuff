/// <reference path="../../../typings/discord.d.ts" />

import {Button, Flex, Text} from "@discord/components";
import {ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalSize, ModalRoot} from "@discord/modal";
import {WebpackModules} from "@zlibrary";
import Strings from "../strings";
import {useState} from "react";
import Settings from "../settings";
import styles from "./modal.scss";
import {FormDivider} from "@discord/forms";

const createUpdateWrapper = (Component, valueProp = "value", changeProp = "onChange") => props => {
    const [value, setValue] = useState(props[valueProp]);

    return <Component 
        {...{
            ...props,
            [valueProp]: value,
            [changeProp]: value => {
                if (typeof props[changeProp] === "function") props[changeProp](value);
                setValue(value);
            }
        }}
    />;
};

const SelectInput = createUpdateWrapper(WebpackModules.getByProps("SingleSelect").SingleSelect);
const {Title} = WebpackModules.getByProps("Title");

export default function UserBirthdayChooseModal({user, onClose, transitionState}) {
    let day, month;

    const handleSave = () => {
        Settings.set("users", Object.assign(Settings.get("users", {}), {[user.id]: {month, day}}));
        onClose();
    };

    const handleCancel = () => onClose();

    return (
        <ModalRoot onClose={onClose} transitionState={transitionState} size={ModalSize.SMALL}>
            <ModalHeader>
                <Flex justify={Flex.Justify.END}>
                    <Title>{Strings.CHOOSE_BIRTHDAY}</Title>
                </Flex>
                <Flex direction={Flex.Justify.END}>
                    <ModalCloseButton onClick={onClose} />
                </Flex>
            </ModalHeader>
            <ModalContent className={styles.content}>
                <Flex direction={Flex.Direction.HORIZONTAL} align={Flex.Align.CENTER} basis="auto" justify={Flex.Justify.BETWEEN}>
                    <Text>{Strings.SELECT_DAY}</Text>
                    <Flex.Child className={styles.select}>
                        <SelectInput 
                            value={Settings.get("users", {})[user.id]?.day}
                            options={Array.from(new Array(31), (_, i) => ({label: i + 1, value: i + 1}))} 
                            onChange={value => {
                                day = value;
                            }} 
                        />
                    </Flex.Child>
                </Flex>
                <FormDivider className={styles.divider} />
                <Flex direction={Flex.Direction.HORIZONTAL} align={Flex.Align.CENTER} basis="auto" justify={Flex.Justify.BETWEEN}>
                    <Text>{Strings.SELECT_MONTH}</Text>
                    <Flex.Child className={styles.select}>
                        <SelectInput 
                            value={Settings.get("users", {})[user.id]?.month}
                            options={Array.from(new Array(12), (_, i) => ({label: i + 1, value: i + 1}))}
                            onChange={value => {
                                month = value;
                            }}    
                        />
                    </Flex.Child>
                </Flex>
            </ModalContent>
            <ModalFooter>
                <Button color={Button.Colors.BRAND} size={Button.Sizes.MEDIUM} onClick={handleSave}>
                    {Strings.SAVE}
                </Button>
                <Button look={Button.Looks.LINK} color={Button.Colors.PRIMARY} size={Button.Sizes.MEDIUM} onClick={handleCancel}>
                    {Strings.CANCEL}
                </Button>
            </ModalFooter>
        </ModalRoot>
    );
}