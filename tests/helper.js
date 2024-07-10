const mongoose = require('mongoose')
const Property = require('../models/property')
const app = require('./app')
const supertest = require('supertest')

const api = supertest(app)


afteAll(async () => {
  await mongoose.connection.close()
})