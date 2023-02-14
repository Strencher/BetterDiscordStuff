import * as Api from "@api";

const {Webpack, Webpack: {Filters}} = Api;

export const getByProps = (...props) => {
    return Webpack.getModule(Filters.byProps(...props));
};

export const getBulk = (...queries) => {
    return Webpack.getBulk.apply(null, queries.map(q => typeof q === "function" ? {filter: q} : q));
};

export const getByPrototypeFields = (...fields) => {
    return Webpack.getModule(Filters.byPrototypeFields(...fields));
};

export const getStore = name => {
    return Webpack.getModule(m => m?._dispatchToken && m.getName?.() === name);
};

export const getMangled = function* (filter, target = null) {
    yield target = getModule(m => Object.values(m).some(filter), {searchExports: false});
    yield target && Object.keys(target).find(k => filter(target[k]));
};

export const getModule = Webpack.getModule;

export default {
    ...Webpack,
    getByPrototypeFields,
    getMangled,
    getByProps,
    getStore,
    getBulk
};

export {Filters};

// Common Modules
export const ChannelStore = getStore("ChannelStore");
export const GuildStore = getStore("GuildStore");
export const Tooltip = getByPrototypeFields("renderTooltip");
