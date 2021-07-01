// @ts-nocheck
import config from "./package.json";
import SettingsManager from "common/classes/settings";

const Settings = new SettingsManager(config.info.name);

export default Settings;