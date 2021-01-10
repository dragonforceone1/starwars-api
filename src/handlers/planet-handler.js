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

    static async getById(request, response) {
        const responseObject = PlanetHandler.getDefaultOutput()

        try {
            const _id = PlanetHandler.getIdFromUrl(request.originalUrl)

            responseObject.data = await PlanetService.getById(_id)

            if (responseObject.data === null) {
                throw new Error('Planet not found')
            }

            responseObject.message = 'Planet found'

            response.status(200)
        } catch (error) {
            response.status(400)

            console.log(error.message)

            responseObject.message = 'Planet not found'
        }

        return response.send(responseObject)
    }

    static getIdFromUrl(originalUrl) {
        const params = originalUrl.split('/')

        if (params.length !== 3) {
            throw new Error('Invalid url')
        }

        return params[2]
    }

    static async deleteById(request, response) {
        const responseObject = PlanetHandler.getDefaultOutput()

        try {
            const _id = PlanetHandler.getIdFromUrl(request.originalUrl)

            const foundPlanet = await PlanetService.getById(_id)

            if (foundPlanet === null) {
                throw new Error('Planet not found')
            }

            await PlanetService.deleteById(_id)

            responseObject.message = `Planet ${foundPlanet.name} deleted`

            response.status(202)
        } catch (error) {
            response.status(400)

            console.log(error.message)

            responseObject.message = 'Planet not found'
        }

        return response.send(responseObject)
    }
}

module.exports = PlanetHandler
