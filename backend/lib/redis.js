import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

let redisInstance;

if (process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_URL !== "placeholder") {
	try {
		redisInstance = new Redis(process.env.UPSTASH_REDIS_URL);
		redisInstance.on("error", (err) => {
			console.warn("Redis connection error, using fallback in-memory store...", err.message);
		});
	} catch (e) {
		console.warn("Failed to initialize Redis client, using fallback in-memory store...", e.message);
	}
}

if (!redisInstance) {
	console.log("Using safe in-memory store instead of Redis server");
	const store = new Map();
	redisInstance = {
		get: async (key) => store.get(key) || null,
		set: async (key, value, ...args) => {
			store.set(key, value);
			return "OK";
		},
		del: async (key) => {
			store.delete(key);
			return 1;
		},
		on: () => {},
	};
}

export const redis = redisInstance;

