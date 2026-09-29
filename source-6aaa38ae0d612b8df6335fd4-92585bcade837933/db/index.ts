import { drizzle } from 'drizzle-orm/netlify-db'
import * as schema from './schema.js'

// DATABASE_URL takes precedence when set; otherwise the Netlify Database
// adapter picks up the connection Netlify provisions for this deploy.
const connectionString = process.env.DATABASE_URL

export const db = connectionString
  ? drizzle({ schema, connection: connectionString })
  : drizzle({ schema })
