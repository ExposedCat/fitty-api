import type { Database } from './config/database.js'

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number
			SESSION_SECRET: string
			DB_CONNECTION_STRING: string
			DB_COLLECTION_NAME: string
		}
	}

	namespace Express {
		interface Locals {
			db: Database
		}
	}
}

export {}
