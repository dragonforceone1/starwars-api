const MongoDB = require('../databases/mongodb')
const connection = MongoDB.getOrCreateConnection()

const { PlanetSchema } = require('../schema/planet-schema')
const Planet = connection.model('planet', PlanetSchema, 'planets')

}

module.exports = Planet
