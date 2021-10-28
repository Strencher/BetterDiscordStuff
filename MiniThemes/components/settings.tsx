import {joinClassNames} from "@discord/utils";
import _ from "lodash";
import React, {useMemo, useState} from "react";
import Library from "./icons/library";
import Store from "./icons/store";
import ErrorBoundary from "common/components/ErrorBoundary";
import styles from "./settings.scss";
import {useStateFromStoresArray, useStateFromStoresObject} from "@discord/flux";
import GithubStore from "../managers/github";
import Card, {cache as CardCache} from "./card";
import {WebpackModules} from "@zlibrary";
import SnippetsInjector from "../managers/injector";

const SearchBar = WebpackModules.getByDisplayName("SearchBar");
const classes = WebpackModules.getByProps("desaturate", "searchResultsWrap");

export function InstalledSnippets({query}: {query: string}) {
    const codes = useStateFromStoresObject([SnippetsInjector], () => {
        console.log("load");
        return _.cloneDeep(SnippetsInjector.config.codes);
    });

    const snippets = (() => {
        let state = _(Object.values(codes).map((e: any) => e.manifestUrl));

        const tester = new RegExp(_.escape(query), "i");
        if (query) state = state.filter(link => CardCache[link] ? (tester.test(CardCache[link].name) || tester.test(CardCache[link].description)) : true);

        return state.value();
    })();
    
    return snippets.length
        ? snippets.map((url: string) => <Card url={url} key={url} />)
        : (
            <div className={joinClassNames(classes.emptyResultsContent, styles.noResult)}>
                <div className={joinClassNames(classes.desaturate, classes.noResultsImage)} />
                <div className={joinClassNames(classes.emptyResultsText, classes.noResults)}>
                    {query
                        ? "No results found for query '" + query + "'"
                        : "You didn't install any snippets yet."
                    }
                </div>
            </div>
        );
}

export function ExploreSnippets({query}: {query: string}) {
    const snippets = useStateFromStoresArray([GithubStore], () => {
        let state = _(GithubStore.getState());
        if (!state.size()) GithubStore.fetchData();

        const tester = new RegExp(_.escape(query), "i");
        if (query) state = state.filter(link => CardCache[link] ? (tester.test(CardCache[link].name) || tester.test(CardCache[link].description)) : true);

        return state.value();
    }, [query]);
    
    return snippets.length
        ? snippets.map((url: string) => <Card url={url} key={url} />)
        : (
            <div className={joinClassNames(classes.emptyResultsContent, styles.noResult)}>
                <div className={joinClassNames(classes.desaturate, classes.noResultsImage)} />
                <div className={joinClassNames(classes.emptyResultsText, classes.noResults)}>
                    {query
                        ? "No results found for query '" + query + "'"
                        : "There aren't any snippets yet."
                    }
                </div>
            </div>
        );
}

const Tabs = {
    explore: {
        Component: ExploreSnippets,
        icon: Store
    },
    installed: {
        Component: InstalledSnippets,
        icon: Library
    }
};

export function TabItem({label, onClick, selected = false, icon = null}) {
    return (
        <div className={joinClassNames(styles.TabItem, selected && styles.Selected)} onClick={onClick}>
            {icon && <div className={styles.IconContainer}>{icon}</div>}
            <div className={styles.Name}>{label}</div>
        </div>
    );
}

export default function MiniThemesSettings() {
    const [selectedTab, setTab] = useState("installed");
    const Component = useMemo(() => Tabs[selectedTab].Component ?? (() => null), [selectedTab, Tabs]);
    const [query, setQuery] = useState("");

    return (
        <div className={styles.ContentPage}>
            <div className={styles.Title}>Mini Themes</div>
            <div className={styles.HeaderBar}>
                {Object.keys(Tabs).map(tabId => (
                    <TabItem selected={selectedTab === tabId} icon={Tabs[tabId].Icon} onClick={setTab.bind(null, tabId)} label={_.upperFirst(tabId)} key={tabId}/>
                ))}
                
                <SearchBar
                    onChange={setQuery}
                    onClear={setQuery.bind(null, "")}
                    placeholder="Search Snippets..."
                    query={query}
                    size={SearchBar.Sizes.SMALL}
                    className={styles.SearchBar}
                />
            </div>
            <div className={styles.TabContent}>
                <ErrorBoundary id="MiniThemes">
                    <Component query={query} />
                </ErrorBoundary>
            </div>
        </div>
    );
}