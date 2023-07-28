import type { Collection } from 'mongodb'
import { MongoClient } from 'mongodb'

export type User = {
	userId: string
	points: number
	usedPoints: number
}

export type Database = {
	users: Collection<User>
}

export async function startDatabase() {
	const client = new MongoClient(process.env.DB_CONNECTION_STRING)
	await client.connect()
	const mongoDb = client.db()
	const users = mongoDb.collection<User>(process.env.DB_COLLECTION_NAME)
	const database: Database = { users }
	return database
}
