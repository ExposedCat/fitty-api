import { initApp } from './config/app.js'

const runApp = await initApp()
await runApp()

console.debug('App started')
