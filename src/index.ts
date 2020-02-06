import CachingService from './services/caching.service';
import redis, { RedisClient } from 'redis';

let client: RedisClient;

async function initDB() {
    client = await redis.createClient();
    return new Promise((resolve, reject) => {
        client.on('error', err => {
            console.log('error connecting to redis');
            reject(err);
        });
        client.on('connect', () => {
            console.log('connected');
            resolve();
        });
    });
}

async function testCache(): Promise<void> {
    await initDB();
    const mockCachingService = new CachingService(client, 'SHA256');
    const hash = mockCachingService.generateHash('hello').toString();
    const writeCache = await mockCachingService.writeCache(hash, 'hello');
    const result = await mockCachingService.readCache(hash);
    console.log(result);
}

testCache();

export default CachingService;
