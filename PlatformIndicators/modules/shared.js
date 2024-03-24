import {Webpack} from "@api";

// Stores
export const LocalActivityStore = Webpack.getStore("LocalActivityStore");
export const SessionsStore = Webpack.getStore("SessionsStore");
export const UserStore = Webpack.getStore("UserStore");
export const PresenceStore = Webpack.getStore("PresenceStore");

// Other modules
export const Dispatcher = UserStore._dispatcher;
export const Flux = Webpack.getByKeys("useStateFromStoresObject","Store");
export const ModulesLibrary = Webpack.getByKeys("Tooltip");
export const Colors = Webpack.getByKeys("ColorDetails");
export const {Messages} = Webpack.getModule(m => m?.Messages?.STATUS_DND);
export const buildClassName = Webpack.getModule((_, __, i) => Webpack.modules[i].toString().includes(`define("classnames"`));
