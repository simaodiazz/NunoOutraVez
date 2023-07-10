const express = require('express');
const { find, create, remove, update, findAll } = require('./rented.controller');

const rentedRoutes = express.Router();

// Rota para criar um novo usuário
rentedRoutes.post('/renteds/', create);

// Rota para obter um usuário pelo ID
rentedRoutes.get('/renteds/:id', find);

rentedRoutes.get('/renteds/', findAll);

// Rota para atualizar um usuário pelo ID
rentedRoutes.put('/renteds/:id', update);

// Rota para excluir um usuário pelo ID
rentedRoutes.delete('/renteds/:id', remove);

module.exports = rentedRoutes;
