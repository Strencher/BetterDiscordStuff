import {Text} from "@discord/components";
import {useStateFromStores, useStateFromStoresArray} from "@discord/flux";
import {Messages} from "@discord/i18n";
import {Guilds, Members, SelectedGuilds, Users} from "@discord/stores";
import {joinClassNames} from "@discord/utils";
import {WebpackModules} from "@zlibrary";
import ErrorBoundary from "./errorboundary";

const {default: MemberRolesList} = WebpackModules.getByProps("MemberRole") ?? {};
const classes = WebpackModules.getByProps("userInfoSectionHeader");
const Header = WebpackModules.getModule(m => m.displayName === "Header" && m.Sizes);

export default function MemberRolesSection({userId, guildId = SelectedGuilds.getGuildId()}) {
    const roles = useStateFromStoresArray([Members], () => Members.getMember(guildId, userId)?.roles);
    const guild = useStateFromStores([Guilds], () => Guilds.getGuild(guildId));
    const user = useStateFromStores([Users], () => Users.getUser(userId));

    if (!roles || !guild || !user) return null;

    return (
        <ErrorBoundary id="MemberRolesSection">
            <div className={joinClassNames(classes.userInfoSection, Text.Colors.STANDARD)}>
                <Header uppercase size={Text.Sizes.SIZE_12} className={classes.userInfoSectionHeader}>
                    {Messages.ROLES_LIST.format({numRoles: roles.length})}
                </Header>
                <MemberRolesList guild={guild} user={user} userRoles={roles} />
            </div>
        </ErrorBoundary>
    );
};