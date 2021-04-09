import {BaseInnerError} from "tools-ts/src/error/InnerError";

export class StoreInactiveError extends BaseInnerError {
    constructor(inactiveObjName: string) {
        super(`Store object '${inactiveObjName}' is inactive!`);
    }
}

export function inactiverr(inactiveObjName: string): never {
    throw new StoreInactiveError(inactiveObjName)
}
