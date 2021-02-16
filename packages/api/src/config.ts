import dotenv from "dotenv";

dotenv.config()

const config: {
    database: any;
    secret_key: any;
    twitter: {
        apiKey: any;
        apiSecretKey: any;
        bearerToken: any;
        appId: any;
        accessToken: any;
        accessTokenSecret: any;
    }
    redis: any;
    spaces: {
        key: any;
        secret: any;
    }
} = {
    database: process.env.DATABASE_URL,
    secret_key: process.env.SECRET_KEY,
    twitter: {
        apiKey: process.env.TWITTER_API_KEY,
        apiSecretKey: process.env.TWITTER_SECRET_KEY,
        bearerToken: process.env.TWITTER_BEARER_TOKEN,
        appId: process.env.TWITTER_APP_ID,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    },
    redis: process.env.REDIS_URL,
    spaces: {
        key: process.env.SPACES_KEY,
        secret: process.env.SPACES_SECRET
    }
}

export default config