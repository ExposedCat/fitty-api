import { config as loadEnv } from 'dotenv'
import { startServer } from './server.js'
import { startDatabase } from './database.js'

export async function startApp() {
	loadEnv()
	process.env.PORT = Number(process.env.PORT)
	for (const env of [
		'PORT',
		'SESSION_SECRET',
		'DB_CONNECTION_STRING',
		'DB_COLLECTION_NAME'
	]) {
		if (!process.env[env]) {
			throw new Error(`"${env}" is not specified`)
		}
	}

	const database = await startDatabase()
	await startServer(database)
}
