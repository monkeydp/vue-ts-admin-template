import BizStorage from "@/storage/BizStorage";
import {Action, Mutation} from "vuex-module-decorators";

export default interface ActiveModule<T> {
    active: T;
    activeOrNull: T | null;

    activate(t: T): Promise<void>

    inactivate(): Promise<void>

    hasActive(): Promise<boolean>

    destroy(): Promise<void>;
}

export abstract class BaseActiveModule<T> implements ActiveModule<T> {

    private readonly storage: BizStorage<T>

    activeOrNull: T | null

    protected constructor(storage: BizStorage<T>) {
        this.storage = storage
        this.activeOrNull = storage.getOrNull()
    }

    get active(): T {
        return this.activeOrNull ?? {} as T
    }

    @Action
    async activate(t: T): Promise<void> {
        this.set(t)
        this.storage.set(t)
    }

    @Action
    async inactivate(): Promise<void> {
        this.remove()
        this.storage.remove()
    }

    @Action
    async hasActive(): Promise<boolean> {
        return this.activeOrNull != null
    }

    @Action
    async destroy(): Promise<void> {
        this.inactivate()
    }

    @Mutation
    private set(t: T) {
        this.activeOrNull = t
    }

    @Mutation
    private remove() {
        this.activeOrNull = null
    }
}
