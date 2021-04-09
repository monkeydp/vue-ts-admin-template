import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import store from '@/store'
import User from "@/model/User";
import ActiveModule from './ActiveModule';
import {Inject} from "typescript-ioc";
import {LocalStorageWrapper} from "@/storage/StorageWrapper";
import StorageKey from "@/storage/StorageKey";

export abstract class UserModule implements ActiveModule<User> {
    abstract active: User;
    abstract activeOrNull: User | null;

    abstract activate(t: User): Promise<void>;

    abstract hasActive(): Promise<boolean>;

    abstract inactivate(): Promise<void>;

    abstract destroy(): Promise<void>
}

@Module({dynamic: true, namespaced: true, store, name: 'user'})
class UserModuleImpl extends VuexModule implements UserModule {

    @Inject
    private storage!: LocalStorageWrapper

    private key = StorageKey.USER

    activeOrNull: User | null = this.storage.getOrNull<User>(this.key)

    get active(): User {
        return this.activeOrNull ?? new User()
    }

    @Action
    async activate(t: User): Promise<void> {
        this.set(t)
        this.storage.set(this.key, t)
    }

    @Action
    async inactivate(): Promise<void> {
        this.remove()
        this.storage.remove(this.key)
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
    private set(t: User) {
        this.activeOrNull = t
    }

    @Mutation
    private remove() {
        this.activeOrNull = null
    }
}

const userModule: UserModule = getModule(UserModuleImpl)
export default userModule
