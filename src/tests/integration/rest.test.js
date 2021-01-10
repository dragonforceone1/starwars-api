require('dotenv').config({ 'path': './env/.env.test' })

const app = require('../../app')
const request = require('supertest')

const { mockPlanet, mockPlanet2, mockPlanet3, } = require('../mock/planet')

const { MongoMemoryServer } = require('mongodb-memory-server')
const Planet = require('../../models/planet')

jest.setTimeout(60000)

describe('POST', () => {
    const mongodb = new MongoMemoryServer({ instance: { port: 27017 }, autoStart: false })

    beforeAll(async () => {
        await mongodb.start()

        try {
            await Planet.collection.drop()
        } catch (error) {
            // Nothing to do
        }
    })

    afterEach(async () => {
        try {
            await Planet.collection.drop()
        } catch (error) {
            // Nothing to do
        }
    })

    const { name, climate, ground, countFilmAppearances } = mockPlanet

    describe('Fail Cases', () => {
        it('Creating a planet - should return "missing name field on body"', async () => {
            const { status, body } = await request(app).post('/planets')

            expect(status).toBe(400)
            expect(body.message).toBe('missing name field on body')
        })

        it('Creating a planet - should return "missing climate field on body"', async () => {
            const { status, body } = await request(app).post('/planets')
                .send({ name, ground })

            expect(status).toBe(400)
            expect(body.message).toBe('missing climate field on body')
        })

        it('Creating a planet - should return "missing ground field on body"', async () => {
            const { status, body } = await request(app).post('/planets')
                .send({ name, climate })

            expect(status).toBe(400)
            expect(body.message).toBe('missing ground field on body')
        })

        it(`Creating a planet - should return "Planet ${name} already exists"`, async () => {
            await Planet.insert(mockPlanet)

            const { status, body } = await request(app).post('/planets')
                .send(mockPlanet)

            expect(status).toBe(400)
            expect(body.message).toBe(`Planet ${name} already exists`)
        })
    })

    describe('Success Cases', () => {
        it(`Creating a planet - should return "Planet ${name} created successfully"`, async () => {
            const { status, body: { message, data } } = await request(app).post('/planets')
                .send({ name, climate, ground })

            expect(status).toBe(201)
            expect(message).toBe(`Planet ${name} created successfully`)
            expect(data.name).toBe(name)
            expect(data.climate).toBe(climate)
            expect(data.ground).toBe(ground)
            expect(data.countFilmAppearances).toBe(countFilmAppearances)
        })
    })
})

describe('GET', () => {
    const mongodb = new MongoMemoryServer({ instance: { port: 27017 }, autoStart: false })
    beforeAll(async () => {

        await mongodb.start()

        try {
            await Planet.collection.drop()

            await Planet.insert(mockPlanet)
            await Planet.insert(mockPlanet2)
            await Planet.insert(mockPlanet3)

        } catch (error) {
            // Nothing to do
        }
    })

    afterAll(async () => {
        try {
            await Planet.collection.drop()
        } catch (error) {
            // Nothing to do
        }
    })

    describe('Success Cases', () => {
        it(`Get planet list - should return planets array`, async () => {
            const { status, body: { message, data } } = await request(app).get('/planets')

            expect(status).toBe(200)
            expect(message).toBe('Found 3 planet(s)')
            expect(data.length).toBe(3)
        })
    })
})
