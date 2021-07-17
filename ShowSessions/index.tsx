/// <reference path="../bdbuilder/typings/main.d.ts" />
import { Patcher, ReactComponents, Toasts, Utilities, WebpackModules } from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import Clyde from "common/apis/clyde";
import Commands from "common/apis/commands";
import SessionsList from "./components/list";
import type SessionsStoreType from "./@types/sessionstore";
import styles from "styles";
import React from "react";
import _ from "lodash";
import {switchCase} from "common/util/any";
import pkg from "./package.json";
import { Info, SettingsStore } from "@discord/stores";

/*
* Temporary disabled notifications because the api isn't relieable.
*/

const UserSettings: {
	setSection: (id: string, thing?: any) => void;
} = WebpackModules.getByProps("updateAccount");
const SessionsStore: SessionsStoreType = WebpackModules.getByProps("getActiveSession");

export default class ShowSessions extends BasePlugin {
	_changeListener: () => void;
	_originalSessions: any;

	promises = {
		cancelled: false,
		cancel() {
			this.cancelled = true;
		}
	};

	onStart() {

		// Register commands
		Commands.registerCommand(this.getName(), {
			name: "sessions",
			description: "Shows your account's active sessions.",
			id: "get-sessions",
			type: 3,
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
							[e => !e.length, "I didn't found any active clients. Maybe discord didn't told me about them? :thinking:"]
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
		// SessionsStore.addChangeListener(this._changeListener = () => {
		// 	this.handleChangeSessions(SessionsStore.getSessions());
		// });

		// this._originalSessions = SessionsStore.getSessions();
	}

	// handleChangeSessions(data: any) {
	// 	const hasChange = !_.isEqual(Object.keys(this._originalSessions), Object.keys(data));
	// 	if (!hasChange) return;

	// 	const filter = e => Info.getSessionId() !== e && e !== "all";
	// 	const changed = Object.keys(data).filter(filter).length - Object.keys(this._originalSessions).filter(filter).length;
	// 	const hasRemoved = changed < 0;

	// 	Toasts.info(`[${pkg.info.name}]: ${hasRemoved ? Math.abs(changed) : changed} ${hasRemoved ? "old disconnected" : "newly connected"} session${changed > 1 ? "s" : ""} was found`, {
	// 		timeout: 10000
	// 	});

	// 	this._originalSessions = data;
	// }

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
		// SessionsStore.removeChangeListener(this._changeListener);
	}
}