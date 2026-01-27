import {Button, Tooltip, TooltipContainer} from "@discord/components";
import {ModalRoot, ModalSize, openModal} from "@discord/modal";
import {Users} from "@discord/stores";
import {joinClassNames} from "@discord/utils";
import {WebpackModules, DiscordModules, Logger} from "@zlibrary";
import {useEffect, useState} from "react";
import styles from "./card.scss";
import Calendar from "./icons/calendar";
import Cube from "./icons/cube";
import {Arrow} from "@discord/icons";
import path from "path";
import SnippetsInjector from "../managers/injector";
import {useStateFromStores} from "@discord/flux";
import Github from "./icons/github";

const sleep = (delay: number) => new Promise<void>(resolve => setTimeout(resolve, delay));
const randomWidths = [100, 80, 75, 90, 120];

class Queue<T> {
    private handler: Function;
    private delay: number;
    private queue: Array<T> = [];
    private running: boolean = false;

    constructor(handler: Function, delay = 1000) {
        this.handler = handler;
        this.delay = delay;
    }

    add(item: T): void {
        if (this.has(item)) return;

        this.queue.push(item);

        if (!this.running) this.runCallbacks();
    }

    has(item: T): boolean {
        return Boolean(~this.queue.indexOf(item));
    }

    private async runCallbacks(): Promise<void> {
        this.running = true;
        let item: T;
        while (item = this.queue.shift()) {
            await this.handler(item);
            await sleep(this.delay);
        }
        this.running = false;
    }
}

export const cache = {};
const fetchQueue = new Queue<Function>(e => e(), 1000);
const AsyncActions = WebpackModules.getByProps("getUser", "acceptAgreements");
const ImageModal: any = WebpackModules.getByDisplayName("ImageModal");
const MaskedLink: any = WebpackModules.getByDisplayName("MaskedLink");
const ModalClasses: { image, modal } = WebpackModules.find(e => typeof e === "object" && Object.keys(e).length === 2 && e.modal && e.image);

const joinLink = function (link: string, path: string) {
    const checkSlash = string => (string[0] === "/" ? string : "/" + string)

    return link + checkSlash(path.startsWith("./") ? path.slice(2) : path);
}

const showImageModal = async function (src: string, original = src, width: number, height: number, animated: boolean, children: any, placeholder: any) {
    const bounds = await new Promise(resolve => {
        Object.assign(new Image(), {
            src: src,
            onload: ({target}) => {
                resolve({ width: target.naturalWidth, height: target.naturalHeight });
            },
            onerror: () => resolve({ width, height })
        });
    });
    
    openModal(props => (
        <ModalRoot
            {...props}
            className={ModalClasses.modal}
            size={ModalSize.DYNAMIC}
        >
            <ImageModal
                src={src}
                original={original}
                {...bounds}
                animated={animated}
                children={children}
                renderLinkComponent={props => <MaskedLink {...props} />}
                placeholder={placeholder}
                className={ModalClasses.image}
                shouldAnimate={DiscordModules.WindowInfo.isFocused()}
            />
        </ModalRoot>
    ));
}


// https://raw.githubusercontent.com/Strencher/BD-MiniThemes/main/OfficialSnippets/TinySearchbar/code.css
export const extractGithubAuthor = function (link: string) {
    return link.split("/")[3].trim();
}

export function useFetchAuthor(userId: string, url: string = "") {
    const [author, setAuthor] = useState<any>({
        username: extractGithubAuthor(url),
        getAvatarURL: () => `https://github.com/${extractGithubAuthor(url)}.png`,
        type: "unresolved"
    });

    useEffect(() => {
        if (!url || !userId) return;

        if (Users.getUser(userId)) {
            setAuthor(Users.getUser(userId));
        } else {
            AsyncActions.getUser(userId)
                .then((res: UserObject) => setAuthor(res))
                .catch(() => {});
        }
    }, [url, userId]);

    return url ? author : null;
}

export function useFetchManifest(manifestUrl: string) {
    const [manifest, setManifest] = useState(cache[manifestUrl]);

    useEffect(() => {
        if (manifest) return;

        fetchQueue.add(() => {
            fetch(manifestUrl).then(res => res.json(), console.error).then(res => {
                cache[manifestUrl] = res;
                setManifest(res);
            }, console.error);
        });
    }, [manifestUrl]);

    return manifest ?? {};
}

export function SwitchableBanner({previews}: {previews: string[]}) {
    if (!previews) previews = [];
    const [index, setIndex] = useState(0);

    const showBanner = () => {
        if (!previews.length) return;

        showImageModal(
            previews[index],
            previews[index],
            0,
            0,
            previews[index]?.endsWith(".gif"),
            null,
            previews[index]
        );
    };

    return (
        <div className={styles.BannerViewer}>
            <Tooltip>
                {props => {
                    const disabled = previews.length < 2 || index === 0;
                    
                    return !disabled ? (
                        <Button
                            {...props}
                            className={joinClassNames(styles.NavigateButton, styles.NavigateButtonLeft)}
                            look={Button.Looks.BLANK}
                            size={Button.Sizes.NONE}
                            disabled={disabled}
                            onClick={() => setIndex(index => index - 1)}
                        >
                            <Arrow direction={Arrow.Directions.LEFT} />
                        </Button>
                    ) : null;
                }}
            </Tooltip>
            <div
                onClick={showBanner}
                className={styles.Banner}
                style={{backgroundImage: `url(${previews?.[index] ?? "https://betterdiscord.app/resources/store/missing.svg"})`}}
            />
            <Tooltip>
                {props => {
                    const disabled = index >= (previews.length - 1) || previews.length < 2;

                    return !disabled ? (
                        <Button
                            {...props}
                            className={joinClassNames(styles.NavigateButton, styles.NavigateButtonRight)}
                            look={Button.Looks.BLANK}
                            size={Button.Sizes.NONE}
                            disabled={disabled}
                            onClick={() => setIndex(index => index + 1)}
                        >
                            <Arrow direction={Arrow.Directions.RIGHT} />
                        </Button>
                    ) : null;
                }}
            </Tooltip>
        </div>
    );
}

export default function Card({url}: {url: string}) {
    const manifest = useFetchManifest(url);
    const author = useFetchAuthor(manifest?.authorId, url);
    const link = joinLink(path.dirname(url), manifest?.main ?? "");
    const hasSnippet = useStateFromStores([SnippetsInjector], () => SnippetsInjector.has(link));

    const makeLinkButton = (name: string, url: string, icon: any) => (
        <Tooltip text={name}>
            {props => (
                <Button
                    {...props}
                    className={styles.LinkButton}
                    size={Button.Sizes.NONE}
                    look={Button.Looks.BLANK}
                    onClick={() => open(url, "_blank")}
                >
                    {icon}
                </Button>
            )}
        </Tooltip>
    );

    return (
        <div className={joinClassNames(styles.CardItem, manifest == null && styles.Fetching)}>
            <div className={styles.Header}>
                <SwitchableBanner previews={manifest?.previews} />
                <TooltipContainer text={author.username} position="top" className={styles.AvatarContainer}>
                    <img className={styles.Avatar} src={author.getAvatarURL()} />
                </TooltipContainer>
                <div className={styles.ToolsContainer}>
                    {manifest == null
                        ? <Cube className={styles.Loading} />
                        : (
                            <Tooltip text={"Added: " + new Date(manifest.added).toLocaleString()} tooltipClassName={styles.dateTooltip}>
                                {props => <Calendar {...props} />}
                            </Tooltip>
                        )
                    }
                </div>
            </div>
            <div className={styles.Body}>
                <div className={styles.Name}>
                    {manifest == null
                        ? <div className={styles.Bubble} style={{width: randomWidths[Math.floor(Math.random() * randomWidths.length)]}} />
                        : manifest.name
                    }
                </div>
                <div className={styles.Description}>
                    {manifest == null
                        ? [...new Array(Math.floor(Math.random() * 4) || 2)].map((_, i) => (
                            <div className={styles.Bubble} key={i} style={{width: randomWidths[Math.floor(Math.random() * randomWidths.length)] * 2}} />
                        ))
                        : manifest.description
                    }
                </div>
            </div>
            <div className={styles.Footer}>
                <div>
                    {manifest?.github && makeLinkButton("Github", manifest.github, <Github />)}
                </div>
                <div>
                    <Button
                        size={Button.Sizes.SMALL}
                        disabled={manifest == null}
                        color={hasSnippet ? Button.Colors.RED : Button.Colors.BRAND}
                        onClick={() => {
                            const action = {
                                install: () => {
                                    try {
                                        fetch(link).then(res => res.text(), console.error).then(text => {
                                            SnippetsInjector.add(link, text as string, url);
                                        });
                                    } catch (error) {
                                        Logger.error("Failed to add snippet:\n", error);
                                    }
                                },
                                remove: () => {
                                    SnippetsInjector.remove(link);
                                }
                            }[hasSnippet ? "remove" : "install"];

                            action();
                        }}
                    >{hasSnippet ? "Uninstall" : "Install"}</Button>
                </div>
            </div>
        </div>
    );
}