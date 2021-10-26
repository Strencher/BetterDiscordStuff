import { Members, SelectedGuilds, Users } from "@discord/stores";
import { joinClassNames } from "@discord/utils";
import { WebpackModules } from "@zlibrary";
import { useMemo } from "react";
import { Keys } from "../data/translations";
import Strings from "../strings";
import styles from "./tooltip.scss";

const AvatarUtils = WebpackModules.getByProps("getUserAvatarURL");

type Override = {
    id: string;
    can: boolean;
};

export type ChannelProps = {
    overrides: {
        users: Override[];
        roles: Override[];
    };
    guild: GuildObject;
    className?: string;
};

// Recreate the role to make sure discord doesn't fuck my code.
export function MemberRole({ name, colorString, id }: any) {
    const isSelf = ~Members.getMember(SelectedGuilds.getGuildId(), Users.getCurrentUser().id)?.roles.indexOf(id);

    return (
        <div className={joinClassNames(styles.role, isSelf && styles.isSelf)}>
            <div className={styles.roleCircle} style={{
                //@ts-ignore
                "--color": colorString
            }} />
            <div className={styles.roleName}>{name}</div>
        </div>
    );
}

export function MemberWithAvatar({ user }) {
    const isSelf = Users.getCurrentUser().id === user?.id;

    return (
        <div className={joinClassNames(styles.role, isSelf && styles.isSelf)}>
            <img className={styles.avatar} src={AvatarUtils.getUserAvatarURL(user ?? {})} />
            <div className={styles.roleName}>{user?.username ?? "Unknown"}#{user?.discriminator ?? "0000"}</div>
        </div>
    );
}

export const collectSections = function (section: Override[]) {
    return section.reduce(([allowed, denied], enemy) => {
        if (enemy.can) allowed.push(enemy.id);
        else denied.push(enemy.id);

        return [
            allowed,
            denied
        ];
    }, [[], []]);
};

export default function ChannelTooltip({ overrides, guild, className }: ChannelProps) {
    const [allowedUsers, deniedUsers] = useMemo(() => collectSections(overrides.users), [overrides, guild]);
    const [allowedRoles, deniedRoles] = useMemo(() => collectSections(overrides.roles), [overrides, guild]);

    const renderSection = function (section: any, type: "user" | "role", string: keyof Keys) {
        const getProps = {
            user: (id: string) => Users.getUser(id),
            role: (id: string) => guild.getRole(id)
        }[type];

        if (typeof getProps !== "function" || section.length === 0) return null;

        return section.length
            ? <div className={styles.section} key={string}>
                <h3 className={styles.header}>{Strings.get(string)}</h3>
                <div className={styles.body}>
                    {section.map(enemyId => (
                        type === "user" ? <MemberWithAvatar user={Users.getUser(enemyId)} /> : <MemberRole {...getProps(enemyId)} />
                    ))}
                </div>
            </div>
            : null
    };

    return (
        <div className={joinClassNames(styles.tooltip, className)}>
            {renderSection(allowedRoles, "role", "ALLOWED_ROLES")}
            {renderSection(deniedRoles, "role", "DENIED_ROLES")}
            {renderSection(allowedUsers, "user", "ALLOWED_USERS")}
            {renderSection(deniedUsers, "user", "DENIED_USERS")}
        </div>
    );
}