import Redis from 'ioredis';

const client = new Redis({
    host: '127.0.0.1',
    port: 6379,
    db: 0
});

client.on('connect', async () => {
    console.log('Redis client connected');
});

client.on('error', async (err) => {
    console.log('Something went wrong ' + err);
});

export default client;