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
        // allow promises & async await syntax when using redis
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
     * @return Promise<Error | any>
     */
    async get(key: string): Promise<unknown> {
        const db = this.db;
        return new Promise((resolve, reject) => {
            // changes to data store library / implementation will result in code changes within this promise.
            db.get(key, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
            // User of this module will not have to change anything. We can abstract away details
        });
    }
    /**
     * Function that writes to cache
     * @param key {string} key to write to
     * @param value {string} value at specified key
     */
    async set(key: string, value: any): Promise<unknown> {
        const db = this.db;
        return new Promise((resolve, reject) => {
            // changes to data store library / implementation will result in code changes within this promise.
            db.set(key, value, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
            // User of this module will not have to change anything. We can abstract away details
        });
    }

    async expire(key: string, timeInSeconds: number): Promise<unknown> {
        return new Promise((resolve, reject) => {
            const db = this.db;
            // changes to data store library / implementation will result in code changes within this promise.
            db.expire(key, timeInSeconds, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
            // User of this module will not have to change anything. We can abstract away details
        });
    }
}

export default CachingService;
