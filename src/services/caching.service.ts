import { RedisClient } from 'redis';
import hashFuncFactory from './hashing-factory';
import { HashStrategies } from './hashing-factory';
/**
 * Service to cache events
 */
class CachingService {
    /**
     * The data store instance caching service will use
     */
    db: RedisClient;
    /**
     * The hash function caching service will use
     */
    generateHash: Function;
    /**
     *
     * @param db {Redis Client} Supported data stores
     * @param hashStrategy {HashStrategiesEnum} Supported Hash Strategies | {function} custom hash function
     */
    constructor(db: RedisClient, hashStrategy: HashStrategies | Function) {
        this.db = db;
        if (typeof hashStrategy === 'function') {
            // Caching service instantiated with custom hash function
            this.generateHash = hashStrategy;
        } else {
            // Generate one of our supported hash functions.
            this.generateHash = hashFuncFactory(hashStrategy);
        }
    }
    /**
     * Function that reads from cache
     * @param key {string} - key to search for in cache
     */
    readCache(key: string): Error | any {
        return new Error('unable to read from cache');
    }
    /**
     * Function that writes to cache
     * @param key {string} key to write to
     * @param value  {string} value at specified key
     */
    writeCache(key: string, value: any): Error | any {
        return new Error('unable to write to cache');
    }
}

export default CachingService;
