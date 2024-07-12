const mongoose = require('mongoose')
const Property = require('../models/property')
const app = require('./app')
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


afteAll(async () => {
  await mongoose.connection.close()
})