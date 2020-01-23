import { RedisClient } from "redis";

/**
 * Service to cache events
 */

class CachingService {      
    db:RedisClient;
    generateHash: Function
    constructor(db:RedisClient,generateHash: Function) {
        this.db = db;
        this.generateHash = generateHash
    }
    readCache(key:string): Error | any {
        return new Error('unable to read from cache')
    }
    writeCache(key:string,value:any): Error | any {
        return new Error ('unable to write to cache')
    }
}


export default CachingService