import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import store from '@/store'
import {Inject} from "typescript-ioc";
import {CookieStorageWrapper, LocalStorageWrapper} from "@/storage/StorageWrapper";
import StorageKey from "@/storage/StorageKey";

export enum ElementSize {
    DEFAULT = "default",
    MEDIUM = "medium",
    SMALL = "small",
    MINI = "mini"
}

export enum DeviceType {
    MOBILE,
    DESKTOP,
}

export class AppConfig {
    language = 'zh'
    size = ElementSize.MEDIUM
    device = DeviceType.DESKTOP
}

export enum SidebarStatus {
    OPENED = "OPENED",
    CLOSED = "CLOSED"
}


export class Sidebar {
    status = SidebarStatus.OPENED
    withoutAnimation = true
    opened = this.isOpened()

    isOpened(): boolean {
        return this.status == SidebarStatus.OPENED
    }
}

export interface AppModule {
    sidebar: Sidebar;
    config: AppConfig;
}

@Module({dynamic: true, namespaced: true, store, name: 'app'})
class AppModuleImpl extends VuexModule implements AppModule {

    @Inject
    cookieStorage!: CookieStorageWrapper

    @Inject
    localStorage!: LocalStorageWrapper

    sidebar = this.localStorage.getOrNull<Sidebar>(StorageKey.SIDEBAR) ?? new Sidebar()
    config = this.cookieStorage.getOrNull<AppConfig>(StorageKey.APP_CONFIG) ?? new AppConfig()

    @Action
    public toggleSidebar(withoutAnimation: boolean) {
        this.TOGGLE_SIDEBAR(withoutAnimation)
        this.saveSidebar()
    }

    @Action
    public closeSidebar(withoutAnimation: boolean) {
        this.CLOSE_SIDEBAR(withoutAnimation)
        this.saveSidebar()
    }

    @Action
    public toggleDevice(device: DeviceType) {
        this.TOGGLE_DEVICE(device)
        this.saveAppConfig()
    }

    @Mutation
    private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
        this.sidebar.withoutAnimation = withoutAnimation
        if (!this.sidebar.opened) {
            this.sidebar.status = SidebarStatus.OPENED
            this.sidebar.opened = true
        } else {
            this.sidebar.status = SidebarStatus.CLOSED
            this.sidebar.opened = false
        }
    }

    @Action
    private saveSidebar() {
        this.localStorage.set(StorageKey.SIDEBAR, this.sidebar)
    }

    @Action
    private saveAppConfig() {
        this.cookieStorage.set(StorageKey.APP_CONFIG, this.config)
    }

    @Mutation
    private CLOSE_SIDEBAR(withoutAnimation: boolean) {
        this.sidebar.withoutAnimation = withoutAnimation
        this.sidebar.status = SidebarStatus.CLOSED
        this.sidebar.opened = false
    }

    @Mutation
    private TOGGLE_DEVICE(device: DeviceType) {
        this.config.device = device
    }

    @Mutation
    private SET_LANGUAGE(language: string) {
        this.config.language = language
    }

    @Mutation
    private SET_SIZE(size: ElementSize) {
        this.config.size = size
    }

    @Action
    public setLanguage(language: string) {
        this.SET_LANGUAGE(language)
        this.saveAppConfig()
    }

    @Action
    public setSize(size: ElementSize) {
        this.SET_SIZE(size)
        this.saveAppConfig()
    }
}

export const appModule = getModule(AppModuleImpl)
