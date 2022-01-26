/// <reference path="../types/main.d.ts" />
import { Logger, Patcher, ReactComponents, Toasts, Utilities, WebpackModules } from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import Clyde from "common/apis/clyde";
import Commands from "common/apis/commands";
import SessionsList from "./components/list";
import type SessionsStoreType from "./@types/sessionstore";
import styles from "styles";
import React from "react";
import _ from "lodash";
import {switchCase} from "common/util/any";
import {Session} from "./@types/sessionstore";
import Modal, {ModalApi} from "./components/notification";
import {openModal} from "@discord/modal";
import Settings from "./settings";
import SettingsPanel from "./components/Settings";

const UserSettings: {
	setSection: (id: string, thing?: any) => void;
} = WebpackModules.getByProps("updateAccount");
const SessionsStore: SessionsStoreType = WebpackModules.getByProps("getActiveSession");

export default class ShowSessions extends BasePlugin {
	_changeListener: () => void;
	_originalSessions: any;
	_wasInitial = false;

	promises = {
		cancelled: false,
		cancel() {
			this.cancelled = true;
		}
	};

	getSettingsPanel() {
		return (
			<SettingsPanel />
		);
	}

	onStart() {
		const DiscordCommands = WebpackModules.getByProps("BUILT_IN_COMMANDS");

		// Register commands
		DiscordCommands.BUILT_IN_COMMANDS.push({
			__registerId: this.getName(),
			applicationId: "betterdiscord",
			name: "sessions",
			description: "Shows your account's active sessions.",
			id: "get-sessions",
			type: 1, // Thanks to JadeMin
			target: 1,
			predicate: () => true,
			execute: (_, { channel }) => {
				try {
					Clyde.sendMessage(channel.id, {
						content: switchCase(Object.entries(SessionsStore.getSessions()), [
							[e => e.length, sessions => {
								return "**__I found these clients are currently active:__**\n\n" + sessions
									.filter(([id]) => id !== "all")
									.map(([id, info]) =>
										`> **Id:** \`${id}\`
									> **Active:** \`${info.active}\`
									> **Status:** \`${info.status}\`
									> **Activities: [${info.activities.length}]**${(info.activities.length ? "\n>" : "") + info.activities.map(ac => `  **•** ${ac.name}: \`${ac.state}\``).join("\n")}
									> **Client:**
									>  **•** os: \`${info.clientInfo.os}\`
									>  **•** client: \`${info.clientInfo.client}\`
									`
									).join("\n");
							}],
							[e => !e.length, "I didn't find any active clients. Maybe discord didn't told me about them? :thinking:"]
						]),
					});
				} catch (error) {
					console.error(error);
				}
			},
			options: []
		});

		// Inject stylesheet
		styles.inject();

		// Patches
		Utilities.suppressErrors(this.patchAccountSection.bind(this), "AccountSection patch")();

		// Attach listeners
		SessionsStore.addChangeListener(this._changeListener = Utilities.suppressErrors(() => {
			const data = SessionsStore.getSessions();
			this.handleChangeSessions(data);
			this._originalSessions = data;
		}, "ShowSessions.onChange"));

		this._originalSessions = SessionsStore.getSessions();
	}

	maybeOpenModal() {
		if (ModalApi.getState().opened) return;

		openModal(props => (
			<Modal {...props} />
		));
	}

	handleChangeSessions(data: any) {
		if (!Settings.get("showUpdates", true)) return;

		const filter = e => e !== "all";
		const sessionFilter = (session1, session2, key) => {
			if (key === "activities") return session1[key].length !== session2[key].length;
			if (key === "clientInfo") return !_.isEqual(session1[key], session2[key]);

			return session1[key] !== session2[key];
		}
		const compareSessions = function (session1: Session, session2: Session) {
			const keys = Object.keys(session1).slice(1);
			
			const changes = keys.filter(sessionFilter.bind(null, session1, session2));
			if (!changes.length) return [];

			return changes.map(key => ({
				property: key,
				from: key === "activities" ? session1[key].length : JSON.stringify(session1[key]),
				to: key === "activities" ? session2[key].length : JSON.stringify(session2[key]),
				id: session1.sessionId
			}));
		};
		const oldKeys = Object.keys(this._originalSessions).filter(filter);
		const newKeys = Object.keys(data).filter(filter);
		
		if (oldKeys.length === 0 && !this._wasInitial) {
			this._wasInitial = true;
			return;
		}

		if (oldKeys.length > newKeys.length && Settings.get("showAdd", true)) {
			const removed = oldKeys.filter(e => newKeys.indexOf(e) < 0);
			Logger.log("Detected closed session", removed);
			ModalApi.setState(state => ({
				...state,
				recent: state.recent.concat(removed.map(removed => ({
					type: "removed",
					timestamp: new Date(),
					session: this._originalSessions[removed]
				})).filter(e => e.session)).slice(0, 30)
			}));
			this.maybeOpenModal();
		} else if (oldKeys.length < newKeys.length && Settings.get("showRemove", true)) {
			const added = newKeys.filter(e => oldKeys.indexOf(e) < 0);
			Logger.log("Detected new session", added);
			ModalApi.setState(state => ({
				...state,
				recent: state.recent.concat(added.map(added => ({
					type: "added",
					timestamp: new Date(),
					session: SessionsStore.getSessionById(added)
				})).filter(e => e.session)).slice(0, 30)
			}));
			this.maybeOpenModal();
		} else if (Settings.get("showActivityUpdate", true)) {
			const changes = newKeys.map(key => compareSessions(this._originalSessions[key], data[key])).filter(Boolean);
			if (!changes.length) return;
			Logger.log("Detected session change");

			ModalApi.setState(state => ({
				...state,
				recent: state.recent.concat(changes.flatMap(changes => changes.map(change => ({
					props: change,
					type: "changed",
					timestamp: new Date(),
					session: SessionsStore.getSessionById(change.id),
				})))).slice(0, 30)
			}));
			this.maybeOpenModal();
		}
	}

	openSettings = () => {
		UserSettings.setSection("My Account");
	}

	async patchAccountSection() {
		const UserSettingsAccount = await ReactComponents.getComponentByName("UserSettingsAccount", "." + WebpackModules.getByProps("contentColumnDefault").contentColumnDefault + " > div");

		Patcher.after(UserSettingsAccount.component.prototype, "render", (_this, _, res) => {
			if (!Array.isArray(res?.props?.children)) return;

			res.props.children.push(
				<SessionsList />
			);
		});

		UserSettingsAccount.forceUpdateAll();
	}

	onStop() {
		// Unregister commands
		Commands.unregisterAllCommands(this.getName());

		// Unpatch
		Patcher.unpatchAll();

		// Cancel promises
		this.promises.cancel();

		// Remove styles
		styles.remove();

		// Remove listeners
		SessionsStore.removeChangeListener(this._changeListener);
	}
}
