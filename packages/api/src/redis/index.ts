import { Response } from "express";
import redis, { RedisClient } from "redis";
import { promisify } from "util"
import ExpressCache from "express-redis-cache";
import config from "../config";

const redisClient: RedisClient = redis.createClient(config.redis)
const expressClient = ExpressCache({
    client: redisClient,
    expire: 60
})

const ahget = promisify(redisClient.hget).bind(redisClient);
const asmembers = promisify(redisClient.smembers).bind(redisClient);
const ahkeys = promisify(redisClient.hkeys).bind(redisClient)

redisClient.on("error", (err) => {
    console.log(`Error ${err}`)
})

expressClient.on("connected", () => {
    console.log(`Connected to Redis`)
})

const saveToCache = (key: string, res: Response, controller: Function) => {
    return redisClient.get(key, async (err, result) => {
        if (result) {
            const resultJSON = JSON.parse(result)

            return res.status(200).json(resultJSON);
        } else {
            const result = await controller()

            if (result.status === 200) {
                redisClient.setex(key, 3600, JSON.stringify(result))
            }

            return res.status(200).json(result)
        }
    })
}

const getCache = async (key: string) => {
    const result: any = await asmembers(key)

    if (result) {
        return result
    } else {
        return false
    }
}

const fetchCache = (key: string, res: Response) => {
    return redisClient.get(key, async (err, result: any) => {

        const resultJSON = JSON.parse(result)

        return res.status(200).json(resultJSON);
    })
}

const createCache = async (key: string, payload: any) => {
    await redisClient.setex(key, 3600, JSON.stringify(payload))
}

export {
    saveToCache,
    getCache,
    redisClient,
    createCache,
    fetchCache,
    expressClient
}