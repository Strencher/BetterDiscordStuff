import BasePlugin from "@zlibrary/plugin";
import {Patcher, ReactComponents, WebpackModules, Toasts, Logger} from "@zlibrary";
import styles from "./banned.scss";
import style from "styles";
import Settings from "./settings";
import {Guilds, Users} from "@discord/stores";
import _ from "lodash";
import {Flex} from "@discord/components";
import {Messages} from "@discord/i18n";
import Select from "./components/select.jsx";
import SettingsPanel from "./components/settings";
import preventPropagation from "common/util/prevent";
import {NOOP, Permissions} from "@discord/constants";
import Commands, {OptionTypes, Types} from "common/apis/commands";
import {PermissionUtils} from "@discord/modules";
import Clyde from "common/apis/clyde";
import {switchCase} from "common/util/any";

/// <reference path="typings/discord.d.ts"/>
/// <reference path="typings/zlib.d.ts"/>

const RemoveButton = WebpackModules.getByDisplayName("RemoveButton");
const GuildActions = WebpackModules.getByProps("unbanUser");
const SearchBar = WebpackModules.getByDisplayName("SearchBar");
const GuildSettings = WebpackModules.getByProps("updateMemberRoles");
const Util = WebpackModules.getByProps("cachedFunction");

const APIErrors = {
	UNKOWN_USER: 10013,
	MISSING_PERMISSIONS: 50013
}

export default class BetterBannedUsers extends BasePlugin {
	promises = {
		cancelled: false,
		cancel() {this.cancelled = true;}
	}

	regex = {
		userId: /^\d{15}/
	}

	async banUserWithCommand(guild, userId, reason) {
		try {
			await GuildActions.banUser(guild.id, userId, void 0, `${Users.getCurrentUser().tag}: ${reason ? reason : "No reason provided."}`);
		} catch (error) {
			Logger.error(`Failed to ban ${userId}:\n`, error);
			return switchCase(error?.body?.code, [
				[APIErrors.MISSING_PERMISSIONS, "Sorry, but you don't have enough power to perform that action. 😕"],
				[APIErrors.UNKOWN_USER, "Sorry, but i couldn't find that user. Are you sure it's their user id? 🤔"]
			], "Something when wrong when i tried to ban them. Check your console for more details.");
		}
		return `Banned <@!${userId}> from this server. 🔨`;
	}

	async unbanUserWithCommand(guild, userId) {
		try {
			await GuildActions.unbanUser(guild.id, userId);
		} catch (error) {
			Logger.error(`Failed to unban ${userId}:\n`, error);
			return switchCase(error?.body?.code, [
				[APIErrors.MISSING_PERMISSIONS, "Sorry, but you don't have enough power to perform that action. 😕"],
				[APIErrors.UNKOWN_USER, "Sorry, but i couldn't find that user. Are you sure it's their user id? 🤔"]
			], "Something when wrong when i tried to unban them. Check your console for more details.");
		}
		return `Unbanned <@!${userId}> from this server. ✅`;
	}

	onStart() {
		style.inject();
		this.patchBannedUser();
		this.patchBannedUsers();

		// Commands
		this.registerCommands();
	}

	registerCommands() {
		Commands.registerCommand(this.getName(), {
			id: "ban-user",
			name: "ban",
			predicate: ({guild}) => PermissionUtils.can(Permissions.BAN_MEMBERS, Guilds.getGuild(guild?.id), Users.getCurrentUser()),
			description: "Ban someone from this guild. Click the options to choose which method you want.",
			execute: (props, {guild, channel}) => {
				const userId = props.userId ? props.userId[0].text : props.mention?.[0]?.userId;

				if (!this.regex.userId.test(userId?.trim?.())) return Clyde.sendMessage(channel.id, {content: "You must specify a user!"});

				this.banUserWithCommand(guild, userId, props.reason?.[0]?.text).then(message => {
					Clyde.sendMessage(channel.id, {
						content: message
					});
				});
			},
			options: [
				{
					type: OptionTypes.USER,
					name: "mention",
					description: "The user mention from chat.",
					required: false
				},
				{
					type: OptionTypes.STRING,
					name: "userId",
					description: "The user id string.",
					required: false
				},
				{
					type: OptionTypes.STRING,
					name: "reason",
					description: "Select a reason why you want to ban them.",
					required: false
				}
			]
		});

		Commands.registerCommand(this.getName(), {
			id: "unban-user",
			name: "unban",
			description: "Unbans a user by id or mention from this guild. Click the options to choose the method you want.",
			predicate: ({guild}) => PermissionUtils.can(Permissions.BAN_MEMBERS, Guilds.getGuild(guild?.id), Users.getCurrentUser()),
			execute: (props, {guild, channel}) => {
				const userId = props.userId ? props.userId[0].text : props.mention?.[0]?.userId;

				if (!this.regex.userId.test(userId?.trim?.())) return Clyde.sendMessage(channel.id, {content: "You must specify a user!"});

				this.unbanUserWithCommand(guild, userId, props.reason?.[0]?.text).then(message => {
					Clyde.sendMessage(channel.id, {
						content: message
					});
				});
			},
			options: [
				{
					type: OptionTypes.USER,
					name: "mention",
					description: "The user mention from chat.",
					// required: false
				},
				{
					type: OptionTypes.STRING,
					name: "userId",
					description: "The user id string.",
					// required: false
				}
			]
		});
	}

	getSettingsPanel() {
		return (
			<SettingsPanel />
		);
	}

	getSingleClass(...props) {
		return "." + WebpackModules.getByProps(...props)?.[props[0]];
	}

	async patchBannedUser() {
		const BannedUser = await ReactComponents.getComponentByName("BannedUser", this.getSingleClass(["bannedUser"]));

		Patcher.after(BannedUser.component.prototype, "render", (that, _, res) => {
			if (this.promises.cancelled) return;
			if (!Array.isArray(res?.props?.children)) return;

			const {guild, user, ban} = that.props;

			const name = res.props.children.pop();

			res.props.children.push(
				<div className={styles.wrapper}>
					{name}
					{
						Settings.get("showReason", true) ? (
							<span className={styles.banReason}>{ban.reason ?? Messages.NO_BAN_REASON}</span>
						) : null
					}
				</div>,
				Settings.get("quickUnban", true) ? (
					<RemoveButton className={styles.remove} onClick={preventPropagation(e => {
						this.unbanUser(guild.id, user)
					})} />
				) : null
			);
		});

		BannedUser.forceUpdateAll();
	}

	async patchBannedUsers() {
		const BannedUsers = WebpackModules.getByDisplayName("FluxContainer(GuildSettingsBans)").prototype.render.call({memoizedGetStateFromStores: NOOP}).type;

		Patcher.before(BannedUsers.prototype, "render", that => {
			if (this.promises.cancelled) return;
			const order = Settings.get("order", {value: "descending", label: "Descending"});
			const sort = Settings.get("sort", {value: "username", label: "Name"});

			that.getSortedBans = Util.cachedFunction((bans, searchQuery) => {
				if (!bans) return [];
				const userIds = _(bans).keys();
				if (~userIds.indexOf(searchQuery)) {
					return [Users.getUser(searchQuery)];
				}
				let users = userIds.map(Users.getUser);
				const tester = new RegExp(`^${_.escape(searchQuery)}`, "i");
				if (searchQuery) users = users.filter(user => tester.test(user?.username) || tester.test(bans[user.id]?.reason));

				users = users.sortBy(e => sort.value === "username" ? e.username.toLowerCase() : (bans[e.id]?.reason?.length ?? 0));
				if (order.value === "ascending") users = users.reverse();
				return users.value();
			});

			const original = that.renderSection;
			that.renderSection = function () {
				const res = original(...arguments);

				const message = res.props.children[0].props.children[0];
				res.props.children[0] = (
					<Flex direction={Flex.Direction.VERTICAL} className={styles.container}>
						{message}
						<Flex direction={Flex.Direction.HORIZONTAL} justify={Flex.Justify.END}>
							<Select
								label="Order"
								value={order}
								options={[
									{label: "Ascending", value: "ascending"},
									{label: "Descending", value: "descending"}
								]}
								onChange={value => {
									that.forceUpdate();
									Settings.set("order", value);
								}}
							/>
							<Select
								label="Sort by"
								value={sort}
								options={[
									{label: "Name", value: "username"},
									{label: "Reason length", value: "reason_length"}
								]}
								onChange={value => {
									that.forceUpdate();
									Settings.set("sort", value);
								}}
							/>
						</Flex>
						{Object.keys(Object(that.props.bans)).length
							? <SearchBar
								onChange={value => {
									GuildSettings.setSearchQuery(value);
								}}
								onClear={() => GuildSettings.setSearchQuery("")}
								placeholder={Messages.BANS_SEARCH_PLACEHOLDER}
								size={SearchBar.Sizes.LARGE}
								query={that.props.searchQuery}
								className={styles.search}
							/>
							: null
						}
					</Flex>
				);

				return res;
			}
		});
	}

	async unbanUser(guildId, user) {
		await GuildActions.unbanUser(guildId, user.id);

		Toasts.success(`Unbanned <span style="color: #5865f2;">${user.tag}</span>!`);
	}

	onStop() {
		style.remove();
		Patcher.unpatchAll();
		Commands.unregisterAllCommands(this.getName());
	}
}