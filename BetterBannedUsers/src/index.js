import BasePlugin from "@zlibrary/plugin";
import {Patcher, ReactComponents, WebpackModules, Toasts} from "@zlibrary";
import styles from "./banned.scss";
import style from "styles";
import Settings from "./settings";
import {Users} from "@discord/stores";
import _ from "lodash";
import {Flex} from "@discord/components";
import {Messages} from "@discord/i18n";
import Select from "./components/select.jsx";
import SettingsPanel from "./components/settings";
import preventPropagation from "../../common/util/prevent";

/// <reference path="../../typings/discord.d.ts"/>
/// <reference path="../../typings/zlib.d.ts"/>

const RemoveButton = WebpackModules.getByDisplayName("RemoveButton");
const GuildActions = WebpackModules.getByProps("unbanUser");
const SearchBar = WebpackModules.getByDisplayName("SearchBar");
const GuildSettings = WebpackModules.getByProps("updateMemberRoles");
const Util = WebpackModules.getByProps("cachedFunction");

export default class BetterBannedUsers extends BasePlugin {
	onStart() {
		style.inject();
		this.patchBannedUser();
		this.patchBannedUsers();
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
		const BannedUsers = WebpackModules.getByDisplayName("FluxContainer(GuildSettingsBans)").prototype.render.call({memoizedGetStateFromStores: () => void 0}).type;
		var a = true;
		Patcher.before(BannedUsers.prototype, "render", that => {
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

		Toasts.succes(`Unbanned <span style="color: #5865f2;">${user.tag}</span>!`);
	}

	onStop() {
		style.remove();
		Patcher.unpatchAll();
	}
}