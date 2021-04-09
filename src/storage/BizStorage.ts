import StorageWrapper from "@/storage/StorageWrapper";

export default abstract class BizStorage<T> {

    protected abstract storage: StorageWrapper

    protected abstract key: string

    get(): T {
        return this.storage.get(this.key)
    }

    getOrNull(): T | null {
        return this.storage.getOrNull(this.key)
    }

    remove(): void {
        this.storage.remove(this.key)
    }

    set(obj: T): void {
        this.storage.set(this.key, obj)
    }

    exist(): boolean {
        return this.storage.exist(this.key)
    }
}
