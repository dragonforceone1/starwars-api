class PlanetHandler {
    static async create(request, response) {
        const responseObject = {
            message: '',
            data: null,
            meta: {
                api_status: 'stable'
            }
        }

        try {
            const { body } = request

            PlanetHandler.verifyRequiredFields(body)

            response.status(201)

        } catch (error) {
            response.status(400)

            responseObject.message = error.message
        }

        return response.send(responseObject)
    }

    static verifyRequiredFields(body) {
        const { name, climate, ground } = body

        PlanetHandler.verifyField(name, 'missing name field on body')
        PlanetHandler.verifyField(climate, 'missing climate field on body')
    }

    static verifyField(field, errorMessage) {
        if (!field || field === null) {
            throw new Error(errorMessage)
        }
    }
}

module.exports = PlanetHandler
