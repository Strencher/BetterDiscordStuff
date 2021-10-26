import {Utilities, WebpackModules} from "@zlibrary"
import Discord from "./icons/discord"
import Github from "./icons/github"
import Twitter from "./icons/twitter"
import styles from "./authorpopout.scss";
import {LayerManager} from "@zlibrary/discord";

const PrivateChannels = WebpackModules.getByProps("openPrivateChannel");
const Popout = WebpackModules.getByDisplayName("Popout");

export const BadgeTypes = {
    github_username: {
        icon: Github,
        link: "https://github.com/{{name}}"
    },
    twitter_username: {
        icon: Twitter,
        link: "https://twitter.com/{{name}}"
    },
    discord_id: {
        icon: Discord,
        link: ({discord_id}) => {
            PrivateChannels.openPrivateChannel(discord_id);
        }
    }
};

export function createRenderPopout(author) {
    return props => (
        <div className={styles.container}>
            <div className={styles.authorTooltip}>
                {
                    Object.keys(BadgeTypes).map(icon => {
                        if (!author[icon]) return null;
                        const {icon: Icon, link} = BadgeTypes[icon];

                        const handleClick = () => {
                            if (typeof link === "function") {
                                link(author);
                                LayerManager.popLayer()
                            } else {
                                open(Utilities.formatString(link, author));
                            }

                            props.closePopout();
                        };

                        return (
                            <div className={styles.iconContainer} onClick={handleClick}>
                                <Icon className={styles.icon} />
                            </div>
                        );
                    })
                }
            </div>
            <div className={styles.authorTooltipPointer} />
        </div>
    );
}

export default function AuthorPopout({author}) {
    return (
        <Popout align="center" renderPopout={createRenderPopout(author)} animation={Popout.Animation.FADE} position="top">
            {props => <a {...props} rel="noopener noreferrer" target="_blank" className="bd-link">
                {author.name}
            </a>}
        </Popout>
    );
}