import {Utilities as ZlibUtils} from "@zlibrary";
import {useReducer, useState} from "react";
import {WebpackModules} from "@zlibrary";
import React from "react";

const FormItem = WebpackModules.getByDisplayName("FormItem");
const FormText = WebpackModules.getByDisplayName("FormText");
const FormDivider = WebpackModules.getByDisplayName("FormDivider");
const Flex = WebpackModules.getByDisplayName("Flex");

const {marginBottom8} = WebpackModules.getByProps("marginBottom8");

export default class Utilities extends ZlibUtils {
    static joinClassNames(...classNames) {
        return classNames.filter(e => e).join(" ");
    }

    static get useForceUpdate() {
        return () => {
            return useReducer(n => n + 1, 0)[1];
        };
    }

    static createUpdateWrapper(Component, form = true, valueProp = "value") {
        return props => {
            const [state, setState] = useState(props[valueProp]);
        
            props[valueProp] = state;
        
            if (form) {
                return <Flex className={marginBottom8} direction={Flex.Direction.VERTICAL}>
                    <FormItem title={props.name}>
                        <Component 
                            {...props}
                            onChange={value => {
                                value = value.value ?? value;
                                setState(value);
                                props.onChange(value);
                            }}
                        />
                        <FormText type="description" disabled={Boolean(props.note)}>{props.note}</FormText>
                    </FormItem>
                    <FormDivider />
                </Flex>;
            } else {
                return <Component 
                    {...props}
                    onChange={value => {
                        value = value.value ?? value;
                        setState(value);
                        props.onChange(value);
                    }}
                />;
            }
        };
    }
}