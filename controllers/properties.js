const express = require('express')
const Property = require('../models/property')
const propertiesRouter = express.Router()

usersRouter.get('/', async (request, response, next) => {
  try {
    const properties = await Property.find({})
    response.send(properties)
  } catch (error) {
    next(error)
  }
})

module.exports = propertiesRouter