import {Patcher, ReactComponents, WebpackModules} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";

export default class NoGroupLeaveConfirmation extends BasePlugin {
    onStart() {
        this.patchPrivateChannel();
    }

    async patchPrivateChannel() {
        const classes = WebpackModules.getByProps("channel", "closeButton");
        const PrivateChannel = await ReactComponents.getComponentByName("PrivateChannel", `.${classes.channel}`);
        
        Patcher.after(PrivateChannel.component.prototype, "componentDidMount", _this => {
            const original = _this.handleLeaveGroup;

            _this.handleLeaveGroup = function (event: MouseEvent) {
                event.preventDefault();
                event.stopPropagation();
                
                if (event.shiftKey) return _this.handleClose();

                return Reflect.apply(original, _this, arguments);
            }
        });

        PrivateChannel.forceUpdateAll();
    }

    onStop() {
        Patcher.unpatchAll();
    }
}