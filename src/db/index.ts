// import { drizzle } from "drizzle-orm/postgres-js"
// import postgres from "postgres"

// const sql = postgres(process.env.DATABASE_URL!, {
//   prepare: false,
// })

// export const db = drizzle(sql, {
//   schema,
// })

import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

import "dotenv/config"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
export const db = drizzle(pool, {
  schema,
})
