import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: 'https://us1-warm-thrush-41863.upstash.io',
  token: process.env.REDIS_KEY!,
})