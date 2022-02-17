import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import store from '@/store'
import User from "@/model/User";
import {Inject} from "typescript-ioc";
import UserApi from "@/module/user/UserApi";
import {LocalStorageWrapper, StorageWrappers} from '@/storage/StorageWrapper';
import StorageKey from "@/storage/StorageKey";

export abstract class UserSession {
    abstract user: User

    abstract isLogged: boolean

    abstract activate(user: User): Promise<void>

    abstract inactivate(): Promise<void>

    abstract cleanBeforeLogin(): Promise<void>

    abstract cleanAfterLogout(): Promise<void>
}

@Module({dynamic: true, namespaced: true, store, name: 'userSession'})
class UserSessionImpl extends VuexModule implements UserSession {

    @Inject
    private userApi!: UserApi

    @Inject
    private storage!: LocalStorageWrapper

    private key = StorageKey.LOGGED_USER

    @Inject
    private storageWrappers!: StorageWrappers

    user = this.storage.getOrNull<User>(this.key) ?? new User()

    isLogged = this.storage.exist(this.key)

    @Action
    async activate(user: User) {
        this.setUser(user)
        this.storage.set(this.key, user)
        this.setIsLogged(true)
    }

    @Action
    async inactivate(): Promise<void> {
        this.cleanAfterLogout()
    }

    @Action
    async logout(): Promise<void> {
        await this.userApi.logout()
        this.cleanAfterLogout()
    }

    @Action
    async cleanBeforeLogin() {
        this.cleanAll()
    }

    @Action
    async cleanAfterLogout() {
        this.cleanAll()
    }

    @Action
    async cleanAll() {
        this.removeUser()
        this.storageWrappers.items.forEach(storageWrapper => {
            storageWrapper.clear()
        })
        this.setIsLogged(false)
    }

    @Mutation
    private setUser(user: User) {
        this.user = user
    }

    @Mutation
    private setIsLogged(isLogged: boolean) {
        this.isLogged = isLogged
    }

    @Mutation
    private removeUser() {
        delete this.user
    }
}

const userSession: UserSession = getModule(UserSessionImpl)
export default userSession
