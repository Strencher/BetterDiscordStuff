/// <reference path="../types/main.d.ts" />
import {Filters, Logger, Patcher, ReactComponents, Toasts, Utilities, WebpackModules, DiscordModules} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import Clyde from "common/apis/clyde";
import Commands from "common/apis/commands";
import SessionsList from "./components/list";
import type SessionsStoreType from "./@types/sessionstore";
import styles from "styles";
import _ from "lodash";
import {switchCase} from "common/util/any";
import {Session} from "./@types/sessionstore";
import Modal, {ModalApi} from "./components/notification";
import {openModal} from "@discord/modal";
import Settings from "./settings";
import SettingsPanel from "./components/Settings";
import {Info} from "@discord/stores";
import {Tooltip} from "@discord/components";
import {getLazy, wrapInHooks} from "./util";

enum NoticeTypes {
	DESKTOP = 1,
	TOAST,
	PROMPT
};

const UserSettings: {
	setSection: (id: string, thing?: any) => void;
} = WebpackModules.getByProps("updateAccount");
const SessionsStore: SessionsStoreType = WebpackModules.getByProps("getActiveSession");
const Button: typeof import("@discord/components").Button = WebpackModules.getByProps("BorderColors", "Colors");

export default class ShowSessions extends BasePlugin {
	_changeListener: () => void;
	_originalSessions: any;
	_wasInitial = false;
	_currentSessionId = null;

	get currentSession() {return Info.getSessionId();}

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
			get displayName() {return this.name;},
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
		Utilities.suppressErrors(this.patchHeaderBar.bind(this), "HeaderBar patch")();

		// Attach listeners
		SessionsStore.addChangeListener(this._changeListener = Utilities.suppressErrors(() => {
			const data = SessionsStore.getSessions();
			this.handleChangeSessions(data);
			this._originalSessions = data;
			this._currentSessionId = this.currentSession;
		}, "ShowSessions.onChange"));

		this._originalSessions = SessionsStore.getSessions();
		this._currentSessionId = this.currentSession;
	}

	maybeOpenModal() {
		const noticeType: 1|2|3 = Settings.get("noticeType", NoticeTypes.DESKTOP as 1|2|3);

		switch (noticeType) {
			case NoticeTypes.DESKTOP: {
				const notification = new Notification("[ShowSessions] Session update", {
					silent: false,
					body: "Devices have been updated."
				});
	
				notification.addEventListener("click", this.openModal);
			} break;

			case NoticeTypes.PROMPT: {
				if (ModalApi.getState().opened) return;
	
				this.openModal();
			} break;

			case NoticeTypes.TOAST: {
				Toasts.info("[ShowSessions] Devices update detected!");
			} break;
		}
	}

	openModal(): void {
		openModal(props => (
			<Modal {...props} />
		));
	}

	handleChangeSessions(data: any) {
		if (!Settings.get("showUpdates", true)) return;

		const filter = (sessionId: string) => {
			if (sessionId === "all") return false;
			if (sessionId === this._currentSessionId) return false;
			if (sessionId === this.currentSession) return false;
			
			return true;
		};

		const sessionFilter = (session1: Session, session2: Session, key: string) => {
			if (key === "activities") return session1[key].length !== session2[key].length;
			if (key === "clientInfo") return !_.isEqual(session1[key], session2[key]);

			return session1[key] !== session2[key];
		};

		const compareSessions = function (session1: Session, session2: Session) {
			const keys = Object.keys(session1).slice(1); // Remove frequent changed sessionId.
			
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
		
		if (this._originalSessions[this.currentSession] && oldKeys.length === 0 && !this._wasInitial) {
			this._wasInitial = true;
			return;
		}

		if (oldKeys.length > newKeys.length && Settings.get("showRemove", true)) {
			const removed = oldKeys.filter(e => newKeys.indexOf(e) < 0);
			Logger.log("Detected closed session", removed);

			const mapped = removed.map(removed => ({
				type: "removed",
				timestamp: new Date(),
				session: this._originalSessions[removed]
			})).filter(e => e.session);

			ModalApi.setState(state => ({
				...state,
				recent: state.recent.concat(mapped).slice(0, 30)
			}));

			this.maybeOpenModal();
		} else if (oldKeys.length < newKeys.length && Settings.get("showAdd", true)) {
			const added = newKeys.filter(e => oldKeys.indexOf(e) < 0);
			Logger.log("Detected new session", added);

			const mapped = added.map(added => ({
				type: "added",
				timestamp: new Date(),
				session: SessionsStore.getSessionById(added)
			})).filter(e => e.session);

			ModalApi.setState(state => ({
				...state,
				recent: state.recent.concat(mapped).slice(0, 30)
			}));

			this.maybeOpenModal();
		} else if (Settings.get("showActivityUpdate", true)) {
			const changes = newKeys.map(key => compareSessions(this._originalSessions[key], data[key])).filter(Boolean);
			if (!changes.length) return;
			Logger.log("Detected session change");

			const flattened = changes.flatMap(changes => changes.map(change => ({
				props: change,
				type: "changed",
				timestamp: new Date(),
				session: SessionsStore.getSessionById(change.id),
			})));

			ModalApi.setState(state => ({
				...state,
				recent: state.recent.concat(flattened).slice(0, 30)
			}));

			this.maybeOpenModal();
		}
	}

	openSettings = () => {
		UserSettings.setSection("My Account");
	}

	async patchHeaderBar() {
		const selector = `.${WebpackModules.getByProps("title", "chat")?.title}`;
		const headerBarClasses = WebpackModules.getByProps("iconWrapper", "clickable");
        const HeaderBarContainer = await ReactComponents.getComponentByName("HeaderBarContainer", selector);
        
        Patcher.after(HeaderBarContainer.component.prototype, "render", (_, __, ret) => {
            const toolbar = ret?.props?.toolbar?.props?.children;
            if (!Array.isArray(toolbar) || toolbar.some(e => e?.key === "show-sessions")) return;

            toolbar.splice(-2, 0,
				<Tooltip
					text="Open Session logs"
					key="show-sessions"
					position="bottom"
				>
					{props => (
						<Button
							{...props}
							size={Button.Sizes.NONE}
							look={Button.Looks.BLANK}
							innerClassName={`${headerBarClasses.iconWrapper} ${headerBarClasses.clickable}`}
							onClick={this.openModal}
							className="show-sessions-logs"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24">
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor" />
							</svg>
						</Button>
					)}
				</Tooltip>
            );
        });

        HeaderBarContainer.forceUpdateAll();
	}

	async patchAccountSection() {
		const ConnectedUserAccountSettings = await getLazy(Filters.byDisplayName("ConnectedUserAccountSettings"));
		const UserSettingsAccount = wrapInHooks(() => ConnectedUserAccountSettings({currentUser: DiscordModules.UserStore.getCurrentUser()})?.type);
		
		Patcher.after(UserSettingsAccount.prototype, "render", (_this, _, res) => {
			if (!Array.isArray(res?.props?.children)) return;

			res.props.children.push(
				<SessionsList />
			);
		});
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
