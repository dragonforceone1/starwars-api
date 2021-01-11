const mongoose = require('mongoose')

module.exports = {
    mockPlanet: {
        _id: mongoose.Types.ObjectId(),
        name: 'Kashyyyk',
        climate: 'Mocked Climate',
        ground: 'Mocked Ground',
        countFilmAppearances: 1
    },
    mockPlanet2: {
        _id: mongoose.Types.ObjectId(),
        name: 'Tatooine',
        climate: 'Mocked Climate',
        ground: 'Mocked Ground',
        countFilmAppearances: 5
    },
    mockPlanet3: {
        _id: mongoose.Types.ObjectId(),
        name: 'Alderaan',
        climate: 'Mocked Climate',
        ground: 'Mocked Ground',
        countFilmAppearances: 2
    },
}
