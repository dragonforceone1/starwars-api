require('dotenv').config({ 'path': './env/.env' })

const server = require('./src/app')

const PORT = process.env.PORT || 8002
server.listen(PORT)