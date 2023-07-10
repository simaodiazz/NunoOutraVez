const express = require('express');
const { find, create, remove, update, findAll } = require('./rented.controller');

const rentedRoutes = express.Router();

// Rota para criar um novo usuário
rentedRoutes.post('/rented', create);

// Rota para obter um usuário pelo ID
rentedRoutes.get('/rented/:id', find);

rentedRoutes.get('/rented/', findAll);

// Rota para atualizar um usuário pelo ID
rentedRoutes.put('/rented/:id', update);

// Rota para excluir um usuário pelo ID
rentedRoutes.delete('/rented/:id', remove);

module.exports = rentedRoutes;
