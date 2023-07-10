const Express = require('express')
const { findAll, find, create, update, remove } = require('./car.controller')

const carRoutes = Express.Router()

carRoutes.get('/car', findAll)

carRoutes.get('/car/:id', find)

carRoutes.post('/car', create)

carRoutes.put('/car/:id', update)

carRoutes.delete('/car/:id', remove)

module.exports = {
    carRoutes
}