import {BaseModel} from "./Model";

export enum RegisterWay {
    MOBILE = "MOBILE",
    EMAIL = "EMAIL",
    LOGIN_NAME = "LOGIN_NAME",
}

export const registerWayZh =
    {
        MOBILE: "手机号",
        EMAIL: "邮箱",
        LOGIN_NAME: "登录名",
    }

export default class User extends BaseModel<User> {
    name!: string
    key!: string
    avatar = ""
    registerWay!: RegisterWay
    loginName!: string
    mobile!: string
    email!: string
    deletable!: boolean
}

export class UserDetail extends User {

}
