import type { RouteData, RouteHandler } from '../config/server.js'
import { userService } from '../services/user.js'

const handler: RouteHandler = async (req, res) => {
	const { userId } = req.params
	if (!userId) {
		return res.status(422).json({
			isError: true,
			message: '`userId` is missing'
		})
	} else if (typeof userId !== 'string') {
		return res.status(422).json({
			isError: true,
			message: '`userId` is invalid'
		})
	}
	try {
		const user = await userService.getOrCreate({
			database: res.locals.db,
			userId
		})
		res.json({
			isError: false,
			data: { user }
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			isError: true,
			message: 'Internal server error'
		})
	}
}

export const route: RouteData = {
	handler,
	method: 'get',
	path: '/users/:userId'
}
