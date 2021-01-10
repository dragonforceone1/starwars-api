const axiosInstance = require('../helpers/axios')

const Planet = require('../models/planet')

class PlanetService {
    static async create(params) {
        const { name } = params

        const countFilmAppearances = await PlanetService.getPlanetMovieAppearances(name)

        return Planet.insert({ ...params, countFilmAppearances })
    }

    static async getPlanetMovieAppearances(planetName) {
        let filmAppearances = 0

        try {
            const { data: { results } } = await axiosInstance(`http://swapi.dev/api/planets?search=${planetName}`)

            for (const planet of results) {
                const { name, films } = planet

                if (name.toLowerCase() === planetName.toLowerCase()) {
                    filmAppearances += films.length
                }
            }

        } catch (error) {
            console.log(`failed getting ${planetName} film appearances`)
        }

        return filmAppearances
    }
}

module.exports = PlanetService
