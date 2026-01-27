import {Utilities as ZlibUtils} from "@zlibrary";
import {useReducer, useState} from "react";
import {WebpackModules} from "@zlibrary";
import React from "react";
import Settings from "./Settings";

const FormItem = WebpackModules.getByDisplayName("FormItem");
const FormText = WebpackModules.getByDisplayName("FormText");
const FormDivider = WebpackModules.getByDisplayName("FormDivider");
const Flex = WebpackModules.getByDisplayName("Flex");

const {marginBottom8} = WebpackModules.getByProps("marginBottom8");

export default class Utilities extends ZlibUtils {
    static getIconURL(type, colored = Settings.get("coloredConnectionsIcons", true)) {
        switch (type) {
            case "steam": return colored ? "lightSVG" : "darkSVG";
            case "xbox": return colored ? "customPNG" : "whiteSVG"
            case "youtube": return colored ? "darkSVG" : "whitePNG";
            case "epicgames": return colored ? "lightSVG" : "whitePNG"

            default: return colored ? "darkSVG" : "whitePNG";
        }
    }

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

    static makeLazy(factory) {
        let cache = {value: null, ran: false};

        return () => cache.ran ? cache.value : (cache.ran = true, cache.value = factory());
    }

    static getLazy(filter) {
        const fromCache = WebpackModules.getModule(filter);
        if (fromCache) return Promise.resolve(fromCache);
    
        return new Promise(resolve => {
            const cancel = WebpackModules.addListener((m) => {
                const matches = [m, m?.default];
    
                for (let i = 0; i < matches.length; i++) {
                    if (!matches[i] || !filter(matches[i])) continue;
    
                    resolve(matches[i]);
                    cancel();
                    break;
                }
            });
        });
    }
}
