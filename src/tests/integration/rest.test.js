require('dotenv').config({ 'path': './env/.env.test' })

const app = require('../../app')
const request = require('supertest')

const { mockPlanet } = require('../mock/planet')

describe('Testing Endpoints', () => {
    jest.setTimeout(60000)

    describe('POST', () => {
        it('Creating a planet - should return "missing name field on body"', async () => {
            const { status, body } = await request(app).post('/planets')

            expect(status).toBe(400)
            expect(body.message).toBe('missing name field on body')
        })

        it('Creating a planet - should return "missing climate field on body"', async () => {
            const { name, ground } = mockPlanet

            const { status, body } = await request(app).post('/planets')
                .send({ name, ground })

            expect(status).toBe(400)
            expect(body.message).toBe('missing climate field on body')
        })

    })
})
