import CachingService from './services/caching.service';
import redis from 'redis';

const client = redis.createClient();

const mockCachingService = new CachingService(client, 'SHA256');

const hash = mockCachingService.generateHash('hello');

console.log(hash);

const writeCache = await mockCachingService.writeCache(hash, 'hello');
const result = await mockCachingService.readCache(hash);
console.log(result);

export default CachingService;
