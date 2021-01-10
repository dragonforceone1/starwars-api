const { Router } = require('express')

const PlanetHandler = require('../handlers/planet-handler')

const mainRouter = new Router()

mainRouter.post('/planets', PlanetHandler.create)
mainRouter.get('/planets', PlanetHandler.get)
mainRouter.delete('/planets/:id', PlanetHandler.deleteById)

module.exports = mainRouter
