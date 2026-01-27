import {useState} from "react";
import {WebpackModules} from "@zlibrary";
import {Flex} from "@discord/components";
import styles from "./select.scss";
import {joinClassNames} from "@discord/utils";

const Popout = WebpackModules.getByDisplayName("Popout");
const Caret = WebpackModules.getByDisplayName("Caret");
const Text = WebpackModules.getByDisplayName("LegacyText");

export default function Select({value, options, label, onChange}) {
    const [selected, setSelected] = useState(value);

    const renderPopout = props => (
        <div {...props} className={styles.container}>
            {
                options.map((option, index) => (
                    <div 
                        className={joinClassNames(styles.option, {[styles.selected]: selected?.value === option.value})} 
                        key={index}
                        onClick={() => {
                            setSelected(option);
                            onChange(option);
                            props.closePopout();
                        }}
                    >
                        {option.label}
                    </div>
                ))
            }
        </div>
    );

    return <Popout renderPopout={renderPopout} align="center" animation={Popout.Animation.FADE} position="bottom">
        {
            props => (
                <Flex className={styles.select} shrink={0} grow={0} align={Flex.Align.CENTER} justify={Flex.Justify.END} onClick={props.onClick}>
                    <Text color={Text.Colors.MUTED}>{label}</Text>
                    <Text className={styles.selectedText} color={Text.Colors.INTERACTIVE_NORMAL}>{selected?.label}</Text>
                    <Caret direction={Caret.Directions.DOWN} className={Text.Colors.INTERACTIVE_NORMAL} />
                </Flex>
            )
        }
    </Popout>
}