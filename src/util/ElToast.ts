import Toast from "@/util/Toast";
import Vue from "vue";
import {Container} from "typescript-ioc";

class ElToast implements Toast {

    debug(msg: string): void {
        Vue.prototype.$message.debug(msg)
    }

    info(msg: string): void {
        Vue.prototype.$message.info(msg)
    }

    warn(msg: string): void {
        Vue.prototype.$message.warning(msg)
    }

    error(msg: string): void {
        Vue.prototype.$message.error(msg)
    }
}

Container.bind(Toast).to(ElToast)