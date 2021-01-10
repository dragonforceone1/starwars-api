const { Router } = require('express')

const PlanetHandler = require('../handlers/planet-handler')

const mainRouter = new Router()

mainRouter.post('/planets', PlanetHandler.create)
mainRouter.delete('/planets/*', PlanetHandler.deleteById)
mainRouter.get('/planets', PlanetHandler.get)

module.exports = mainRouter
