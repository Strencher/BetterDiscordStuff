import {Logger} from "@zlibrary";
import config from "./package.json";

// Basically "Patcher" but garbage collector friendly version.
export const lazyPatch = function (module: any, functionName: string, callback: (args: IArguments, returnValue: any) => any, id?: string) {
    if (!module || !functionName || typeof(module[functionName]) !== "function") return;
    const original = module[functionName];

    const unpatch = function () {
        module[functionName] = original;
    };

    module[functionName] = function () {
        const returnValue: any = Reflect.apply(original, this, arguments);

        try {
            const tempReturn = Reflect.apply(callback, this, [
                arguments,
                returnValue
            ]);

            return typeof (tempReturn) === "undefined" ? returnValue : tempReturn;
        } catch (error) {
            Logger.error(`Lazy patch ${id} failed!`, error);
        }

        return returnValue;
    };

    Object.assign(module[functionName], {
        _originalFunction: original,
        patchedBy: config.info.name,
        unpatch
    });

    return unpatch;
};