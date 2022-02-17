import BaseAxiosApi from "biz-ts/src/api/BaseAxiosApi";
import envconfig from "@/config/EnvConfig";
import {AxiosRequestConfig} from "axios"
import { LocalStorageWrapper } from '@/storage/StorageWrapper';
import { Inject } from 'typescript-ioc';
import StorageKey from '@/storage/StorageKey';

export default abstract class BaseApi extends BaseAxiosApi {

    @Inject
    protected storage!: LocalStorageWrapper

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

    protected getHeaders(): unknown | null {
        return {
            authorization: this.storage.getOrNull(StorageKey.TOKEN),
        }
    }
}
