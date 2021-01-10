require('dotenv').config({ 'path': './env/.env.test' })

const app = require('../../app')
const request = require('supertest')

describe('Testing Endpoints', () => {
    jest.setTimeout(60000)

    describe('POST', () => {
        it('Creating a planet - should return "missing name field on body"', async () => {
            const { status, body } = await request(app).post('/planets')

            expect(status).toBe(400)
            expect(body.message).toBe('missing name field on body')
        })

    })
})
