import { RedisClient } from 'redis';
import hashFuncFactory from './hashing-factory';
import { HashStrategiesEnum } from '../hashEnum';

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
     * @param hashStrategy {HashStrategiesEnum} Supported Hash Strategies
     * @param options {any} options for caching & connection
     */
    constructor(db: RedisClient, hashStrategy: HashStrategiesEnum) {
        this.db = db;
        this.generateHash = hashFuncFactory(hashStrategy);
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
