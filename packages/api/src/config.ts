import dotenv from "dotenv";

dotenv.config()

const config: any = {
    database: process.env.DATABASE_URL,
    secret_key: process.env.SECRET_KEY
}

export default config