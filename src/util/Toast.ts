import {Singleton} from "typescript-ioc";

@Singleton
export default abstract class Toast {

    abstract debug(msg: string): void

    abstract info(msg: string): void

    abstract warn(msg: string): void

    abstract error(msg: string): void
}