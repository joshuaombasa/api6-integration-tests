const mongoose = require('mongoose')
const Property = require('../models/property')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./helper')
const api = supertest(app)

beforeEach(async () => {
  await Property.deleteMany({})
  for (let property of helper.propertyData) {
    const propertyObject = new Property(property)
    await propertyObject.save()
  }
})

describe('When there are some properties stored ', () => {
  test('properties are returned as JSON', async () => {
    await api.get('/api/properties')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})