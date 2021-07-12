import {Patcher, ReactComponents, Utilities, WebpackModules} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import BirthdayButton from "./components/birthdaybutton";
import Settings from "./settings";
import pkg from "./package.json";
import styles from "styles";
import AuthorPopout from "./components/authorpopout.jsx";

const Space = ({children}) => (
    <span style={{marginRight: 2}}>{children}</span>
);

const ConnectedBirthdayButton = Settings.connectStore(BirthdayButton);

export default class UserBirthdays extends BasePlugin {
    onStart() {
        this.patchProfilesBadgeList();
    }

    load() {
        styles.inject();
    }

    unload() {
        styles.remove();
    }

    getAuthor() {
        const string = pkg.info.authors.map(e => e.name).join(", ");
        const element = (
            <div style={{display: "inline-flex"}}>
                {
                    pkg.info.authors.reduce((items, author, index) => {
                        items.push(<AuthorPopout author={author} />);

                        if (index < pkg.info.authors.length - 1) items.push(<Space>,</Space>); 

                        return items;
                    }, [])
                }
            </div>
        );
        
        // :zere_zoom:
        element.toString = () => element;
        element.toLocaleLowerCase = () => string;

        return element;
    }

    getSingleClass(selector) {
        const props = selector.split(" ");
        const module = WebpackModules.getByProps(...props);
        
        if (!module) return "";
        return "." + module[props.shift()];
    }

    async patchUserPopout() {
        const UserPopout = await ReactComponents.getComponentByName("UserPopout", this.getSingleClass("userPopout"));

        Patcher.after(UserPopout.component.prototype, "renderFooter", (_this, _, ret) => {
            const tree = Utilities.getNestedProp(ret, "props.children");

            if (!Array.isArray(tree)) return;
            
            tree.splice(2, 0, <ConnectedBirthdayButton user={_this.props.user} />);
        });
    }

    async patchProfilesBadgeList() {
        const UserProfileBadgeList = WebpackModules.getModule(m => m?.default?.displayName === "UserProfileBadgeList");

        Patcher.after(UserProfileBadgeList, "default", (_, [{user}], res) => {
            if (!Array.isArray(res?.props.children)) return;

            res.props.children.unshift(
                <ConnectedBirthdayButton user={user} />
            );
        });
    }

    async patchMemberListItem() {
        const MemberListItem = WebpackModules.getByDisplayName("MemberListItem");

        Patcher.after(MemberListItem.prototype, "renderDecorators", (_this, _, res) => {
            if (!Array.isArray(res?.props?.children)) return;

            res.props.children.unshift(
                <ConnectedBirthdayButton user={_this.props.user} strict/>
            );
        });
    }

    onStop() {
        styles.remove();
        Patcher.unpatchAll();
    }
}