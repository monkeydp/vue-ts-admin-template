import BaseAxiosApi from "biz-ts/src/api/BaseAxiosApi";
import envconfig from "@/config/EnvConfig";
import {AxiosRequestConfig} from "axios"

export default abstract class BaseApi extends BaseAxiosApi {

    protected axiosRequestConfig(): AxiosRequestConfig {
        return {
            baseURL: this.baseUrl(),
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }
    }

    protected baseUrl(): string {
        return envconfig.backendUrl
    }
}
