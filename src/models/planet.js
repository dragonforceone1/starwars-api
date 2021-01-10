const MongoDB = require('../databases/mongodb')
const connection = MongoDB.getOrCreateConnection()

const { PlanetSchema } = require('../schema/planet-schema')
const Planet = connection.model('planet', PlanetSchema, 'planets')

Planet.insert = async params => {
    const { name, climate, ground, countFilmAppearances = 0 } = params

    const foundPlanet = await Planet.findOne({ name })

    if (foundPlanet !== null) {
        throw new Error(`Planet ${name} already exists`)
    }

    return new Planet({ name, climate, ground, countFilmAppearances }).save()
}

module.exports = Planet
