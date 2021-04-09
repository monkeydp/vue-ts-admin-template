import {Route} from "vue-router";

export enum NavigationFailureType {
    REDIRECTED = 1,
    ABORTED = 2,
    CANCELLED = 3,
    DUPLICATED = 4
}

export class VueRouterErrorHandler {
    static handle(error: VueRouterError) {
        switch (error.type) {
            case NavigationFailureType.CANCELLED:
                console.debug(`Ignore cancelled router error: ${error}`)
                break
            default:
                throw error
                break
        }
    }
}

export interface VueRouterError {
    _isRouter: boolean;
    type: NavigationFailureType;
    from: Route;
    to: Route;
}

export function isRouterError(obj: object): obj is VueRouterError {
    const error = obj as VueRouterError;
    return error._isRouter
}
