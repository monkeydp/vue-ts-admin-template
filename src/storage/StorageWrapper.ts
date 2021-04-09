import {Container, Singleton} from "typescript-ioc";
import ierror from "tools-ts/src/error/InnerError";
import Cookie from 'js-cookie'

@Singleton
export default abstract class StorageWrapper {
    abstract set<T>(key: string, value: T): void

    abstract get<T>(key: string): T

    abstract getOrNull<T>(key: string): T | null

    abstract remove(key: string): void

    abstract exist(key: string): boolean

    /**
     * Clear all key/value pairs in storage
     */
    abstract clear(): void
}

abstract class BaseStorageWrapper extends StorageWrapper {

    protected abstract storage: Storage

    get<T>(key: string): T {
        const value = this.getOrNull(key)
        if (value == null) ierror("")
        return value as T
    }

    getOrNull<T>(key: string): T | null {
        const item = this.storage.getItem(key)
        if (item == null) return null
        const value: T = JSON.parse(item)
        return value
    }

    remove(key: string): void {
        this.storage.removeItem(key.toString())
    }

    set<T>(key: string, value: T): void {
        this.storage.setItem(key, JSON.stringify(value))
    }

    exist(key: string): boolean {
        return this.getOrNull(key) != null
    }

    clear(): void {
        this.storage.clear()
    }
}

class CookieStorage implements Storage {
    //eslint-disable-next-line
    [name: string]: any;

    get length(): number {
        const items = Cookie.get()
        const keys = Object.keys(items)
        return keys.length
    }

    clear(): void {
        const items = Cookie.get()
        const keys = Object.keys(items)
        keys.forEach(key => {
            this.removeItem(key)
        })
    }

    getItem(key: string): string | null {
        const item = Cookie.get(key)
        return item == undefined ? null : item
    }

    key(index: number): string | null {
        if (index < 0) return null
        const items = Cookie.get()
        const keys = Object.keys(items)
        if (index > keys.length + 1) return null
        const key = keys[index]
        return key
    }

    removeItem(key: string): void {
        Cookie.remove(key)
    }

    setItem(key: string, value: string): void {
        Cookie.set(key, value)
    }
}

const cookieStorage = new CookieStorage()

export abstract class SessionStorageWrapper extends StorageWrapper {
}

class StdSessionStorageWrapper extends BaseStorageWrapper implements SessionStorageWrapper {
    storage = sessionStorage
}

Container.bind(SessionStorageWrapper).to(StdSessionStorageWrapper)

export abstract class CookieStorageWrapper extends StorageWrapper {
}

class StdCookieStorageWrapper extends BaseStorageWrapper implements CookieStorageWrapper {
    storage = cookieStorage
}

Container.bind(CookieStorageWrapper).to(StdCookieStorageWrapper)

export abstract class LocalStorageWrapper extends StorageWrapper {
}

class StdLocalStorageWrapper extends BaseStorageWrapper implements LocalStorageWrapper {
    storage = localStorage
}

Container.bind(LocalStorageWrapper).to(StdLocalStorageWrapper)

export abstract class StorageWrappers {
    abstract items: Array<StorageWrapper>
}

class StorageWrappersImpl extends StorageWrappers {
    items =
        [
            Container.get(SessionStorageWrapper),
            Container.get(CookieStorageWrapper),
            Container.get(LocalStorageWrapper),
        ]
}

Container.bind(StorageWrappers).to(StorageWrappersImpl)
