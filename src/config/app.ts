import { config as loadEnv } from 'dotenv'
import { initServer } from './server.js'

export async function initApp() {
	loadEnv()
	process.env.PORT = Number(process.env.PORT)
	for (const env of ['PORT', 'SESSION_SECRET']) {
		if (!process.env[env]) {
			throw new Error(`"${env}" is not specified`)
		}
	}

	const { runServer } = initServer()

	return async () => {
		await runServer(process.env.PORT)
	}
}
