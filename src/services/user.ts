import type { Database, User } from '../config/database.js'

async function getOrCreate(args: {
	database: Database
	userId: string
}): Promise<User> {
	const query = await args.database.users.findOneAndUpdate(
		{ userId: args.userId },
		{
			$set: {
				userId: args.userId,
				points: 0,
				usedPoints: 0
			}
		},
		{ upsert: true, returnDocument: 'after' }
	)

	if (!query.ok || !query.value) {
		throw ['Unable to create user', query.lastErrorObject]
	}
	return query.value
}

export const userService = { getOrCreate }
