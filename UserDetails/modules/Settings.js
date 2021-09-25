import pkg from "../package.json";
import SettingsManager from "common/classes/settings";

const Settings = new SettingsManager(pkg.info.name);

export default Settings;