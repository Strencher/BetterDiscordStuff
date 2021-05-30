import {Timestamp} from "@discord/classes";
import {ModalRoot, openModal} from "@discord/modal";
import {Info, Settings as SettingsStore, Users} from "@discord/stores";
import {Logger, Patcher, ReactComponents, Utilities, WebpackModules} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import VoiceNotificationsButton from "./components/button";
import Settings from "./modules/settings";
import styles from "styles";
import {DiscordConstants} from "@zlibrary/discord";
import {Dispatcher} from "@discord/modules";
import LogsPanel from "./components/panel";
import Constants from "./data/constants";
import SettingsPanel from "./components/Settings";

const VoiceStateStore = WebpackModules.getByProps("getVoiceStates");
const SelectedVoiceChannelStore = WebpackModules.getByProps("getVoiceChannelId");

export default class VoiceChatNotifications extends BasePlugin {
	logs = [];
	lastStates = {};
	logsRef = React.createRef();
	currentVoiceChannelId = void 0;

	get subscriptions() {
		return [
			[DiscordConstants.ActionTypes.VOICE_STATE_UPDATE, this.onVoiceStateChange],
			[DiscordConstants.ActionTypes.VOICE_CHANNEL_SELECT, this.onSelect],
		];
	}

    getSettingsPanel() {
        return (
            <SettingsPanel />
        );
    }

	onStart() {
		styles.inject();
        
		for (const [event, callback] of this.subscriptions) {
			Dispatcher.subscribe(event, callback);
		}

		const selectedVoiceChannel = SelectedVoiceChannelStore.getVoiceChannelId();

		if (selectedVoiceChannel) {
			const state = VoiceStateStore.getVoiceStatesForChannel(selectedVoiceChannel);
			if (!state) return;

			Object.values(state).forEach(user => {
				this.lastStates[user.userId] = user;
			});
			this.currentVoiceChannelId = selectedVoiceChannel;
		}
        
		Utilities.suppressErrors(this.patchHeaderBar.bind(this), "HeaderBar patch")();
	}

	async patchHeaderBar() {
		const HeaderBarContainer = await ReactComponents.getComponentByName("HeaderBarContainer", `.${WebpackModules.getByProps("chat", "threadSidebar", "uploadArea").title}`);

		Patcher.after(HeaderBarContainer.component.prototype, "render", _this => {
			const tree = Utilities.getNestedProp(_this, "props.toolbar");
			if (!Array.isArray(tree)) return;

			try {
                tree.unshift(
                    <VoiceNotificationsButton onClick={this.openLogs} />
                );
			} catch (error) {
				Logger.error(`Failed to inject HeaderBarIcon!\n`, error);
			}
		});

		HeaderBarContainer.forceUpdateAll();
	}

	updateLogs({message, user, timestamp}) {
		if (Settings.get("desktopNotifi", false) && (Settings.get("supressInDnd", true) && SettingsStore.status !== "dnd")) new Notification(user.username + " - " + timestamp.toLocaleString(), {
			icon: user.getAvatarURL(),
			body: message,
			silent: true
		});
	}

	openLogs = () => {
        openModal(props => (
            <ModalRoot {...props}>
                <LogsPanel />
            </ModalRoot>
        ));
	}

	onVoiceStateChange = props => {
		let user = Users.getUser(props.userId) || {};
		if (Settings.get("ignoreSelf", false) && user.id === Info.getCurrentUser().id) return;

		const pushToLog = message => {
			const timestamp = new Timestamp(new Date());

            LogsPanel.Store.setState(state => ({logs: state.logs.concat({
				user,
				timestamp: timestamp,
				message,
			})}));
		};

		if (this.lastStates[props.userId] && !props.channelId && Settings.get("leave", true)) {
			pushToLog("Left.");
			delete this.lastStates[props.userId];
		}
		if (props.channelId !== this.currentVoiceChannelId) return;

		if (!this.lastStates[props.userId]) {
			if (Settings.get("join", true)) pushToLog("Joined.");
			this.lastStates[props.userId] = props;
		} else {
			if (_.isEqual(this.lastStates[props.userId], props)) return;

			for (const prop in Constants.VOICE_STATES) {
				const value = Constants.VOICE_STATES[prop];
				const hasChanges = this.lastStates[props.userId][prop] !== props[prop];

				if (Settings.get(value.setting, true) && hasChanges) {
					pushToLog(value.strings[Number(Boolean(props[prop]))]);
				}
			}

			this.lastStates[props.userId] = props;
		}
	}

	onSelect = e => {
		this.logs = [];
		this.lastStates = {};
		this.currentVoiceChannelId = e.channelId;
	}

	onStop() {
		styles.remove();
		Patcher.unpatchAll();

		for (const [event, callack] of this.subscriptions) {
			Dispatcher.unsubscribe(event, callack);
		}
	}
}