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


describe('fetching a spacific property', () => {
  test('succeeds with status code 200 when given a validId', async () => {
    const propertiesInDb = await helper.propertiesInDb()
    const response = await api.get(`/api/properties/${propertiesInDb[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with status code 400 when given an invalidId', async () => {
    const response = await api.get(`/api/properties/32576095`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  // test('fails with status code 404 when given an nonExistent Id', async () => {
  //   const response = await api.get(`/api/properties/66995c959373585ef98b759`)
  //     .expect(404)
  //     .expect('Content-Type', /application\/json/)
  // })
})


describe('addition of a new property', () => {

  test('succeeds when given valid data', async () => {
    const response = await api.post(`/api/properties/66995c959373585ef98b759`)
      .expect(200)
      .send(helper.validProperty)
      .expect('Content-Type', /application\/json/)
  })

  // test('fails with status code 400 when given invalid data', async () => {
  //   const response = await api.get(`/api/properties/66995c959373585ef98b759`)
  //     .expect(404)
  //     .expect('Content-Type', /application\/json/)
  // })

})



afterAll(async () => {
  await mongoose.connection.close()
})