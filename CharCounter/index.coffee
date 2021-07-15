import BasePlugin from "@zlibrary/plugin"
import {WebpackModules, Patcher, Utilities} from "@zlibrary"
import styles from "./counter.styl"
import stylesheet from "styles"

export default class CharCounter extends BasePlugin
    onStart: ->
        stylesheet.inject()
        @patchSlateCharCount()

    patchSlateCharCount: ->
        SlateCharacterCount = WebpackModules.getModule (m) -> m.default.displayName is "SlateCharacterCount"

        Patcher.after SlateCharacterCount, "default", (_, [{currentLength, maxCharacterCount}], res) =>
            return unless Array.isArray res?.props?.children
            res.props.children.push <span className={styles.counter}>{currentLength}/{maxCharacterCount}</span>
            return res
    
    onStop: ->
        stylesheet.remove()
        Patcher.unpatchAll()