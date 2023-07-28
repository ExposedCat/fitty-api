declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number
			SESSION_SECRET: string
		}
	}
}

export {}
