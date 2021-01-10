const PlanetService = require('../services/planet-service')

class PlanetHandler {
    static async create(request, response) {
        const responseObject = PlanetHandler.getDefaultOutput()

        try {
            const { body } = request

            PlanetHandler.verifyRequiredFields(body)

            const { name, climate, ground } = body

            const newPlanet = await PlanetService.create({ name, climate, ground })

            if (!newPlanet._id) {
                throw new Error(`Failed to create planet ${name}`)
            }

            response.status(201)

            responseObject.data = newPlanet
            responseObject.message = `Planet ${name} created successfully`

        } catch (error) {
            response.status(400)

            responseObject.message = error.message
        }

        return response.send(responseObject)
    }

    static getDefaultOutput() {
        return {
            message: '',
            data: null,
            meta: {
                api_status: 'stable'
            }
        }
    }

    static verifyRequiredFields(body) {
        const { name, climate, ground } = body

        PlanetHandler.verifyField(name, 'missing name field on body')
        PlanetHandler.verifyField(climate, 'missing climate field on body')
        PlanetHandler.verifyField(ground, 'missing ground field on body')
    }

    static verifyField(field, errorMessage) {
        if (!field || field === null) {
            throw new Error(errorMessage)
        }
    }

    static async getAll(request, response) {
        const responseObject = PlanetHandler.getDefaultOutput()

        try {
            responseObject.data = await PlanetService.getAll()
            responseObject.message = `Found ${responseObject.data.length} planet(s)`

            response.status(200)

        } catch (error) {
            response.status(400)

            console.error(error.message)

            responseObject.message = error.message
        }

        return response.send(responseObject)
    }
}

module.exports = PlanetHandler
