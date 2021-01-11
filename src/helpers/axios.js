const axios = require('axios')
const https = require('https')

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: true,
        keepAlive: true,
        withCredentials: true
    }),
    jar: true,
    timeout: 30000,
    withCredentials: true,
    responseEncoding: 'binary',
    agentOptions: {
        rejectUnauthorized: false,
        requestCert: true
    }

})

module.exports = axiosInstance
