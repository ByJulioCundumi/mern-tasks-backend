import {config} from "dotenv"
config()

export const DB_USER = process.env.DB_USER || "testUser";
export const DB_PASSWORD = process.env.DB_PASSWORD || "testPassword";
export const DB_NAME = process.env.DB_NAME || "db-name";