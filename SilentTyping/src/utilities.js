import {Utilities as Utils} from "@zlibrary"
import {useReducer} from "react";

export default class Utilities extends Utils {
    static get joinClassNames() {return this.className;}
    
    static capitalize(string) {return string[0].toUpperCase() + string.slice(1);}

    static useForceUpdate() {return useReducer(n => n + 1, 0)[1];}
}