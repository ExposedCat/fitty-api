import type { RouteData, RouteHandler } from '../config/server.js'

const handler: RouteHandler = (req, res) => {
	res.json({
		isError: false,
		message: 'Pong'
	})
}

export const route: RouteData = {
	handler,
	method: 'get',
	path: '/'
}
