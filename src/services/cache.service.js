import redis from 'redis';
import { promisify } from 'util';

class CacheService {
  constructor() {
    this.redisClient = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ...(process.env.REDIS_PASSWORD && { password: process.env.REDIS_PASSWORD })
    });
    // TODO: Remove when node-redis supports promise in v4.0
    this.hset = promisify(this.redisClient.hset).bind(this.redisClient);
    this.hget = promisify(this.redisClient.hget).bind(this.redisClient);
    this.expire = promisify(this.redisClient.expire).bind(this.redisClient);
  }

  getCurrencyRatesFromCache() {
    return this.hget('data', "rates");
  }

  storeCurrencyRatesToCache(rates) {
    this.hset('data', 'rates', JSON.stringify(rates));
    // Set the key to expire in 1 hour
    this.expire('data', 60 * 60);
  }
}

export default CacheService;
