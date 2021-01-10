const express = require('express')
const bodyParser = require('body-parser')

const router = require('./routes/router')

class App {
    constructor() {
        this.server = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(bodyParser.json())
    }

    routes() {
        this.server.use(router)
    }
}

module.exports = new App().server
