import { Injectable } from '@nestjs/common';
import * as Redis from 'redis';

@Injectable()
export class RedisService {
  private client: Redis.RedisClientType;

  constructor() {
    const host = process.env.REDIS_HOST || 'redis';
    const port = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379;
    this.client = Redis.createClient({ socket: { host, port } });
    this.client.connect();
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }
}
