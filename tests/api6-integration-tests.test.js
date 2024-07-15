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

  test('all properties are returned', async () => {
    const response = await api.get('/api/properties')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.propertyData.length)
  })

  test('a specific property is among the returned properties', async () => {
    const response = await api.get('/api/properties')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      const names = response.body.map(p => p.name)
    expect(names).toContain(helper.propertyData[0].name)
  })
})




afterAll(async () => {
  await mongoose.connection.close()
})