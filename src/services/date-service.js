const moment = require('moment-timezone')

class DateService {
    static moment(date) {
        return moment(date).tz('America/Sao_Paulo')
    }
}

module.exports = DateService
