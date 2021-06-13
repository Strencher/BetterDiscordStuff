import {info} from "./package.json";
import SettingsManager from "../../common/classes/settings";

const Settings = new SettingsManager(info.name);

export default Settings;