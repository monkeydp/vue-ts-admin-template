import {Container, Singleton} from 'typescript-ioc'
import BaseApi from '@/api/BaseApi'
import User, {UserDetail} from '@/model/User'
import {BasePqForm} from "biz-ts/src/api/Paging";
import Paging from "biz-ts/src/api/Paging";

@Singleton
export default abstract class UserApi {

    abstract login(form: LoginForm): Promise<User>

    abstract logout(): Promise<void>

    abstract info(): Promise<User>

    abstract list(): Promise<Array<User>>

    abstract paging(form: UpqForm): Promise<Paging<User>>

    abstract detail(id: number): Promise<UserDetail>

    abstract delete(id: number): Promise<void>
}

class UserApiImpl extends BaseApi implements UserApi {

    protected urlPrefix = 'user'

    login(form: LoginForm): Promise<User> {
        return this.axios.post('login', form)
    }

    logout(): Promise<void> {
        return this.axios.post('logout')
    }

    info(): Promise<User> {
        return this.axios.get('info')
    }

    list(): Promise<Array<User>> {
        return this.axios.get('list')
    }

    async paging(form: UpqForm): Promise<Paging<User>> {
        return new Paging<User>()
        // return this.axios.get('paging', {params: form})
    }

    detail(id: number): Promise<UserDetail> {
        return this.axios.post('detail', {id: id})
    }

    delete(id: number): Promise<void> {
        return this.axios.post('delete', {id: id})
    }
}

Container.bind(UserApi).to(UserApiImpl)

export class LoginForm {
    readonly account: string
    readonly password: string

    constructor(account: string, password: string) {
        this.account = account
        this.password = password
    }
}

export class UpqForm extends BasePqForm {

    constructor() {
        super();
    }
}
