import { Response } from "express";
import redis, { RedisClient } from "redis";
import { promisify } from "util"
import ExpressCache from "express-redis-cache";
import config from "../config";

const client: RedisClient = redis.createClient(config.redis)
const expressClient = ExpressCache({
    client,
    expire: 60
})

const ahget = promisify(client.hget).bind(client);
const asmembers = promisify(client.smembers).bind(client);
const ahkeys = promisify(client.hkeys).bind(client)

client.on("error", (err) => {
    console.log(`Error ${err}`)
})

expressClient.on("connected", () => {
    console.log(`Connected to Redis`)
})

const saveToCache = (key: string, res: Response, controller: Function) => {
    return client.get(key, async (err, result) => {
        if (result) {
            const resultJSON = JSON.parse(result)

            return res.status(200).json(resultJSON);
        } else {
            const result = await controller()

            if (result.status === 200) {
                client.setex(key, 3600, JSON.stringify(result))
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
    return client.get(key, async (err, result: any) => {

        const resultJSON = JSON.parse(result)

        return res.status(200).json(resultJSON);
    })
}

const createCache = async (key: string, payload: any) => {
    await client.setex(key, 3600, JSON.stringify(payload))
}

export {
    saveToCache,
    client,
    getCache,
    createCache,
    fetchCache,
    expressClient
}