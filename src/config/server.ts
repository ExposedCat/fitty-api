import express from 'express'
import session from 'express-session'
import type { HelmetOptions } from 'helmet'
import helmet from 'helmet'

export function initServer() {
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

	return {
		runServer: (port: number) =>
			new Promise(resolve => app.listen(port, () => resolve(port)))
	}
}
