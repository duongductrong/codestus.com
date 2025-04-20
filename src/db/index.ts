import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

const sql = postgres(process.env.DATABASE_URL!, {
  max: 1,
  debug: process.env.NODE_ENV === "development",
})

export const db = drizzle(sql, {
  schema,
  logger: process.env.NODE_ENV === "development",
})
