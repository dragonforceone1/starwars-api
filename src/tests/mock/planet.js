const mongoose = require('mongoose')

module.exports = {
    mockPlanet: {
        _id: mongoose.Types.ObjectId(),
        name: 'Kashyyyk',
        climate: 'Mocked Climate',
        ground: 'Mocked Ground',
        countFilmAppearances: 1
    }
}
