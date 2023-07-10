const Express = require('express')
const { findAll, find, create, update, remove } = require('./car.controller')

const carRoutes = Express.Router()

carRoutes.get('/cars/', findAll)

carRoutes.get('/cars/:id', find)

carRoutes.post('/cars/', create)

carRoutes.put('/cars/:id', update)

carRoutes.delete('/cars/:id', remove)

module.exports = {
    carRoutes
}