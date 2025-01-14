import {useStateFromStores, useStateFromStoresArray} from "@discord/flux";
import {Messages} from "@discord/i18n";
import {Guilds, Members, SelectedGuilds, Users} from "@discord/stores";
import {joinClassNames} from "@discord/utils";
import {WebpackModules} from "@zlibrary";
import ErrorBoundary from "./errorboundary";
import Utilities from "../Utilities";

const textNames = new Set(["Text", "LegacyText"]);
const Text = WebpackModules.getModule(m => textNames.has(m.displayName));
const {default: MemberRolesList} = WebpackModules.getByProps("MemberRole") ?? {default: () => null};
const classes = Utilities.makeLazy(() => WebpackModules.getByProps("userInfoSectionHeader"));
const {Heading} = WebpackModules.getByProps("Heading") ?? {Heading: () => null};

export default function MemberRolesSection({userId, guildId = SelectedGuilds.getGuildId()}) {
    const roles = useStateFromStoresArray([Members], () => Members.getMember(guildId, userId)?.roles);
    const guild = useStateFromStores([Guilds], () => Guilds.getGuild(guildId));
    const user = useStateFromStores([Users], () => Users.getUser(userId));

    if (!roles || !guild || !user) return null;

    return (
        <ErrorBoundary id="MemberRolesSection">
            <div className={joinClassNames(classes()?.userInfoSection, Text?.Colors?.STANDARD)}>
                <Heading level={3} variant="eyebrow" uppercase className={classes()?.userInfoSectionHeader}>
                    {Messages.ROLES_LIST.format({numRoles: roles.length})}
                </Heading>
                <MemberRolesList guild={guild} user={user} userRoles={roles} />
            </div>
        </ErrorBoundary>
    );
};