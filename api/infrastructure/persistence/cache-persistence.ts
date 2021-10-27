import {LRUCache} from "typescript-lru-cache";

export class CachePersistence<T> {

    protected cache = new LRUCache<string, T>({
        entryExpirationTimeInMS: 3540000
    });

    constructor() {

    }

    public set = (key: string, object: T): void => {
        this.cache.set(key, object);
    }

    public get = (key: string): T => {
        return this.cache.get(key) as T;
    }

    public has = (key: string): boolean => {
        return this.cache.has(key);
    }

}
