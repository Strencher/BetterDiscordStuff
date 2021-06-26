/// <reference path="../../typings/discord.d.ts" />

import {Timestamp} from "@discord/classes";
import {ModalRoot, openModal} from "@discord/modal";
import {Channels, Info, SettingsStore, Status, Users} from "@discord/stores";
import {Logger, Patcher, ReactComponents, Utilities, WebpackModules} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import VoiceNotificationsButton from "./components/button";
import Settings from "./modules/settings";
import style from "./components/notification.scss";
import styles from "styles";
import {DiscordConstants} from "@zlibrary/discord";
import {Dispatcher} from "@discord/modules";
import LogsPanel from "./components/panel";
import Constants from "./data/constants";
import SettingsPanel from "./components/Settings";
import * as Notifications from "./modules/notifications";
import Commands from "../../common/apis/commands";
import Clyde from "../../common/apis/clyde";

const VoiceStateStore = WebpackModules.getByProps("getVoiceStates");
const SelectedVoiceChannelStore = WebpackModules.getByProps("getVoiceChannelId");
const {AnimatedAvatar, Sizes: AvatarSizes} = WebpackModules.getByProps("AnimatedAvatar");
const MessageTimestamp = WebpackModules.getByDisplayName("MessageTimestamp");
const Members = WebpackModules.getByProps("getMember");

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
		Notifications.initialize();

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

		Commands.registerCommand(this.getName(), {
			id: "disable-notifications",
			type: 3,
			name: "Disable VCN",
			description: "Disables Voicechat notifications for this session.",
			predicate: () => !LogsPanel.Store.getState().paused && this.currentVoiceChannelId,
			options: [],
			execute: (_, {channel}) => {
				Clyde.sendMessage(channel.id, {
					content: "Hiding Voicechat notifications for now."
				});
				LogsPanel.Store.setState({paused: true});
			}
		});

		Commands.registerCommand(this.getName(), {
			id: "enable-notifications",
			type: 3,
			name: "Enable VCN",
			description: "Enables Voicechat notifications for this session again.",
			predicate: () => LogsPanel.Store.getState().paused && this.currentVoiceChannelId,
			options: [],
			execute: (_, {channel}) => {
				Clyde.sendMessage(channel.id, {
					content: "Showing Voicechat notifications again."
				});
				LogsPanel.Store.setState({paused: false});
			}
		});
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

	updateLogs({message, user, timestamp, channelId}) {
		if (!Settings.get("notifications", true) || LogsPanel.Store.getState().paused) return;
		const useInApp = (Settings.get("suppressInDnd", true) && SettingsStore.status === "dnd") || Settings.get("inappPosition", "topLeft") !== "disabled";

		if (useInApp) {
			Notifications.show(
				<>
					<AnimatedAvatar
						isMobile={false}
						status={Status.getStatus(user.id)}
						isTyping={false}
						src={user.getAvatarURL()}
						size={AvatarSizes.SIZE_32}
					/>
					<div className={style.wrapper}>
						<div className={style.header}>
							<div className={style.username}>{user.username}</div>
							<MessageTimestamp timestamp={new Timestamp(timestamp)} className={style.timestamp} />
						</div>
						<div className={style.message}>{message}</div>
					</div>
				</>,
				{
					color: Members.getMember(Channels.getChannel(channelId)?.guild_id, user.id)?.colorString
				}
			);
		} else {
			const notification = new Notification(user.username + " - " + timestamp.toLocaleString(), {
				icon: user.getAvatarURL(),
				body: message,
				silent: true
			});

			notification.addEventListener("click", () => this.openLogs());
		}
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

			const log = {
				user,
				timestamp: timestamp,
				message,
				channelId: props.channelId
			};

			this.updateLogs(log);
			LogsPanel.Store.setState(state => {
				state.logs.unshift(log);
				return {logs: state.logs};
			});
		};

		if (this.lastStates[props.userId] && !props.channelId && Settings.get("leave", true)) {
			pushToLog("Left the call.");
			delete this.lastStates[props.userId];
		}
		if (!props.channelId || (props.channelId !== this.currentVoiceChannelId)) return;

		if (!this.lastStates[props.userId]) {
			if (Settings.get("join", true)) pushToLog("Joined the call.");
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
		Commands.unregisterAllCommands(this.getName());
		Notifications.shutdown();

		for (const [event, callack] of this.subscriptions) {
			Dispatcher.unsubscribe(event, callack);
		}
	}
}