const mongoose = require('mongoose')

module.exports = {
    mockPlanet: {
        _id: mongoose.Types.ObjectId(),
        name: 'Mocked Planet',
        climate: 'Mocked Climate',
        ground: 'Mocked Ground'
    }
}
