import { Storage } from '@pipisasa/storage';
import superjson from 'superjson';
import { type Storage as PersistStorage } from 'redux-persist';
import { Me } from '../services/getMe';

export type MyStorage = {
    me: Me;
}

export const storage = new Storage<MyStorage>({
    prefix: `income-tracker-v${import.meta.env.APP_VERSION}:`,
    jsonSerializer: superjson,
});

class PersistStorageAdapter implements PersistStorage {
    constructor(
        private readonly storage: Storage,
    ) { }

    async getItem<T = unknown>(key: string): Promise<T | null> {
        return this.storage.get<string, T>(key)
    }
    async setItem<T = unknown>(key: string, value: T): Promise<T | null> {
        return this.storage.set(key, value);
    }
    async removeItem(key: string): Promise<unknown> {
        return this.storage.delete(key);
    }
}

export const persistStorage = new PersistStorageAdapter(storage);

