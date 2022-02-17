import {FailResult} from "biz-ts/src/api/Result";
import ierror, {InnerError, isInnerError} from "tools-ts/src/error/InnerError";
import Vue from "vue";
import {BizError, isBizError} from "biz-ts/src/error/BizError";
import {isRouterError, VueRouterErrorHandler} from '@/router/VueRouterErrorHandler';
import {isQuietError} from "tools-ts/src/error/QuietError";
import Toast from "@/util/Toast";
import {Container, Inject, Singleton} from "typescript-ioc";
import {BadRequest, Unauthorized} from "biz-ts/src/error/Error";
import {handleBatchReturn} from "@/util/HandleBatchReturn";
import userSession from "@/store/module/UserSession";

@Singleton
export default abstract class ErrorHandler {

    abstract handle(obj: object): void
}

class ErrorHandlerImpl {

    @Inject
    private toast!: Toast

    private async handleFailResult(result: FailResult) {
        this.toast.error(result.msg ?? '<无错误信息>')
    }

    private handleError(error: Error) {
        this.toast.error("未知错误")
        throw error
    }

    private handleBizError(error: BizError) {
        this.toast.error(error.message)
    }

    private handleInnerError(error: InnerError) {
        console.log("前端内部错误", error)
    }

    async handle(obj: object) {
        if (obj instanceof BadRequest) {
            const reason = obj as BadRequest
            handleBatchReturn({
                errsMap: reason.validErrorsMap,
                title: reason.message
            })
            return
        }

        if (obj instanceof Unauthorized) {
            await userSession.cleanAfterLogout()
            Vue.prototype.$redirector.login()
            return
        }

        if (obj instanceof FailResult) {
            this.handleFailResult(obj as FailResult)
            return
        }

        if (isQuietError(obj)) {
            console.debug("静默错误已忽略", obj)
            return
        }

        if (isBizError(obj)) {
            this.handleBizError(obj)
            return
        }

        if (isInnerError(obj)) {
            this.handleInnerError(obj)
            return
        }

        if (isRouterError(obj)) {
            VueRouterErrorHandler.handle(obj)
            return
        }

        if (obj instanceof Error) {
            this.handleError(obj as Error)
            return
        }

        ierror("未处理异常: " + obj.constructor.name + JSON.stringify(obj))
    }
}

Container.bind(ErrorHandler).to(ErrorHandlerImpl)

window.addEventListener('unhandledrejection', function (event) {
    event.preventDefault()
    const handler = Container.get(ErrorHandler)
    handler.handle(event.reason)
});

Vue.config.errorHandler = (err) => {
    const handler = Container.get(ErrorHandler)
    handler.handle(err)
}
