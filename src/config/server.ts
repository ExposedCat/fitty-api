import express from 'express'
import type { Request, Response, NextFunction, Express } from 'express'
import session from 'express-session'
import type { HelmetOptions } from 'helmet'
import helmet from 'helmet'

import { route as root } from '../controllers/root.js'
import { route as getUser } from '../controllers/get-user.js'
import type { Database } from './database.js'

export type RouteHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => void

export type RouteData = {
	method: 'get' | 'post'
	handler: RouteHandler
	path: string
	validations?: RouteHandler[]
}

function setupControllers(app: Express) {
	for (const controller of [root, getUser]) {
		app[controller.method](
			controller.path,
			...(controller.validations ?? []),
			controller.handler
		)
	}
}

export function startServer(database: Database) {
	const app = express()

	// Security headers
	app.use(
		helmet({
			referrerPolicy: 'strict-origin-when-cross-origin'
		} as HelmetOptions)
	)

	// Express session
	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: true,
			saveUninitialized: true
		})
	)

	// Express config
	app.use(express.json())
	app.use(
		express.urlencoded({
			extended: true
		})
	)

	// Inject dependencies
	app.use((_, res, next) => {
		res.locals.db = database
		return next()
	})

	setupControllers(app)

	return new Promise(resolve =>
		app.listen(process.env.PORT, () => resolve(process.env.PORT))
	)
}
