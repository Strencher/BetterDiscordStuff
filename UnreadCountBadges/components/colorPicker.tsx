import { Flex, Tooltip } from "@discord/components";
import { ColorConverter } from "@zlibrary";
import React, { useCallback, useMemo, useState } from "react";
import styles from "./colorPicker.scss";

const Checkmark = React.memo((props: any) => (
    <svg width="16" height="16" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" fill={props.color ?? "#ddd"} d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z" />
    </svg>
));
const Dropper = React.memo((props: any) => (
    <svg width="14" height="14" viewBox="0 0 16 16" {...props}>
        <g fill="none">
            <path d="M-4-4h24v24H-4z"/>
            <path fill={props.color ?? "#ddd"} d="M14.994 1.006C13.858-.257 11.904-.3 10.72.89L8.637 2.975l-.696-.697-1.387 1.388 5.557 5.557 1.387-1.388-.697-.697 1.964-1.964c1.13-1.13 1.3-2.985.23-4.168zm-13.25 10.25c-.225.224-.408.48-.55.764L.02 14.37l1.39 1.39 2.35-1.174c.283-.14.54-.33.765-.55l4.808-4.808-2.776-2.776-4.813 4.803z" />
        </g>
    </svg>
));

export const defaultColors = [1752220, 3066993, 3447003, 10181046, 15277667, 15844367, 15105570, 15158332, 9807270, 6323595, 1146986, 2067276, 2123412, 7419530, 11342935, 12745742, 11027200, 10038562, 9936031, 5533306];

export const resolveColor = (color, hex = true) => {
    switch (typeof color) {
        case (hex && "number"): return ColorConverter.int2hex(color);
        case (!hex && "string"): return ColorConverter.hex2int(color);
        case (!hex && "number"): return color;
        case (hex && "string"): return color;

        default: return color;
    }
};

const ColorPicker = ({ value, defaultValue, onChange, colors = defaultColors }) => {
    const [color, setColor] = useState(resolveColor(value));
    const intValue = useMemo(() => resolveColor(color, false), [color]);

    const handleChange = useCallback(({target: {value}}) => {
        setColor(value);
        onChange(resolveColor(value));
    }, []);

    return (
        <Flex direction={Flex.Direction.HORIZONTAL}>
            <div className={styles.controls}>
                <Tooltip text="Default" position="bottom">
                    {props => (
                        <div {...props} className={styles.defaultColor} style={{ backgroundColor: resolveColor(defaultValue) }} onClick={() => handleChange({ target: { value: defaultValue } })}>
                            {intValue === resolveColor(defaultValue, false)
                                ? <Checkmark width="25" height="25" />
                                : null
                            }
                        </div>
                    )}
                </Tooltip>
                <Tooltip text="Custom Color" position="bottom">
                    {props => (
                        <div className={styles.inputContainer}>
                            <Dropper />
                            <input {...props} style={{ backgroundColor: resolveColor(color) }} type="color" className={styles.colorInput} value={resolveColor(color)} onChange={handleChange} />
                        </div>
                    )}
                </Tooltip>
            </div>
            <Flex wrap={Flex.Wrap.WRAP} className={styles.colorSwatches}>
                {
                    colors.map((int, index) => (
                        <div key={index} className={styles.colorSwatch} style={{ backgroundColor: resolveColor(int) }} onClick={() => handleChange({target: {value: int}})}>
                            {intValue === int
                                ? <Checkmark />
                                : null
                            }
                        </div>
                    ))
                }
            </Flex>
        </Flex>
    );
};

export default ColorPicker;