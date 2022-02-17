import {Container, Singleton} from 'typescript-ioc'
import BaseApi from '@/api/BaseApi'
import User, {UserDetail} from '@/model/User'
import Paging, {BasePqForm} from "biz-ts/src/api/Paging";

@Singleton
export default abstract class UserApi {

    abstract login(form: LoginForm): Promise<LoginResult>

    abstract logout(): Promise<void>

    abstract info(): Promise<User>

    abstract list(): Promise<Array<User>>

    abstract paging(form: UpqForm): Promise<Paging<User>>

    abstract detail(id: number): Promise<UserDetail>

    abstract delete(id: number): Promise<void>
}

class UserApiImpl extends BaseApi implements UserApi {

    protected urlPrefix = 'user'

    private mockUser = this.getMockUser()

    private getMockUser() {
        const user = new User()
        user.name = "admin"
        user.avatar = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
        return user
    }

    async login(form: LoginForm): Promise<LoginResult> {
        return new LoginResult("abc123", this.mockUser)
        // return this.axios.post('login', form)
    }

    async logout(): Promise<void> {
        // return this.axios.post('logout')
    }

    async info(): Promise<User> {
        return this.mockUser
        // return this.axios.get('info')
    }

    async list(): Promise<Array<User>> {
        return []
        // return this.axios.get('list')
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

export class LoginResult {
    readonly token: string
    readonly user: User

    constructor(token: string, user: User) {
        this.token = token
        this.user = user
    }
}

export class UpqForm extends BasePqForm {

    constructor() {
        super();
    }
}
