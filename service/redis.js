import { createClient } from 'redis';
const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {

    console.log('No REDIS_URL set, Redis is disabled');

}
const client = createClient(
    {
        url: process.env.REDIS_URL
    });

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();
console.log("connected to redisss");

export default client;