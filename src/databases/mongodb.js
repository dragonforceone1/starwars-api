const mongoose = require('mongoose')

let connection = null

process.on('exit', () => {
    mongoose.disconnect()
})

class MongoDB {

    static getOrCreateConnection() {
        if (!connection) {
            connection = MongoDB.createConnection()
            MongoDB.startEvents(connection)
        }

        return connection
    }

    static createConnection() {
        const options = {
            user: process.env.DB_MONGO_USER,
            pass: process.env.DB_MONGO_PASSWORD,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            poolSize: 10,
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 20000,
            connectTimeoutMS: 15000
        }

        if (!process.env.DB_MONGO_USER || process.env.DB_MONGO_USER.length === 0) {
            delete options.user
        }

        if (!process.env.DB_MONGO_PASSWORD || process.env.DB_MONGO_PASSWORD.length === 0) {
            delete options.pass
        }

        if (process.env.DB_REPLICASET && process.env.DB_REPLICASET.length > 0) {
            process.env.DB_MONGO_HOST = process.env.DB_MONGO_HOST + process.env.DB_REPLICASET
        }

        return mongoose.createConnection(`mongodb://${process.env.DB_MONGO_HOST}`, options)
    }

    static startEvents(connection) {
        connection.on('error', error => {
            console.error(`Error in MongoDb connection: ${error}`)
            mongoose.disconnect()
        })

        connection.on('disconnected', () => {
            console.log('MongoDB disconnected! Restarting connection')
            connection = MongoDB.createConnection()
        })

        connection.on('connected', () => console.log('MongoDB connected!'))
        connection.on('reconnected', () => console.log('MongoDB reconnected!'))
        connection.on('reconnectFailed', () => console.log('MongoDB reconnect failed!'))
        connection.on('close', () => console.log('MongoDB close!'))
    }
}

module.exports = MongoDB
