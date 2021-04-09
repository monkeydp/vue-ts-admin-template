import indentString from "indent-string";
import Vue from "vue";
import {MessageType} from "element-ui/types/message";
import ValidError from "biz-ts/src/api/ValidError";

export function handleBatchReturn(options: HandleBatchReturnOptions) {
    const {errsMap, successData, title, duration, type, premsg, postmsg} = options

    let msg = ""

    if (premsg != null) msg = `${msg} ${premsg}`

    if (successData && successData.length > 0) {
        msg = `${msg} 成功数据 (${successData.length}):\n`
        successData.forEach((data, index) => {
            msg = `${msg} ${index + 1}) ${data} \n`
        })
        msg = `${msg}\n`
    }

    if (errsMap != null && errsMap.size > 0) {
        msg = `${msg} 失败数据 (${errsMap.size}):\n`
        let index = 1
        errsMap.forEach((errs, propName) => {
            msg = `${msg} ${index}) ${propName} : ${errs[0].illegalValue}\n`
            errs.forEach(err => {
                msg = `${msg}${indentString(err.message, 6)} \n`
            })
            index++
        })
    }

    if (postmsg != null) msg = `${msg} ${postmsg}`

    Vue.prototype.$notify({
        title: title,
        duration: duration ?? 0,
        type: type ?? 'error',
        message: msg
    })
}

interface HandleBatchReturnOptions {
    errsMap?: Map<unknown, Array<ValidError>>;
    successData?: Array<unknown>;
    title: string;
    duration?: number;
    type?: MessageType;
    premsg?: string;
    postmsg?: string;
}
