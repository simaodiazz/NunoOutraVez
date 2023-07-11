const express = require('express');
const { create, find, update, remove, login, findAll } = require('./user.controller');

const userRoutes = express.Router();

// Rota para criar um novo usuário
userRoutes.post('/users', create);

// Rota para obter um usuário pelo ID
userRoutes.get('/users/:id', find);

// Rota para obter um usuário pelo ID
userRoutes.get('/users/', findAll);

// Rota para atualizar um usuário pelo ID
userRoutes.put('/users/:id', update);

// Rota para excluir um usuário pelo ID
userRoutes.delete('/users/:id', remove);

// Rota para iniciar sessão
userRoutes.post('/users/login', login)

module.exports = userRoutes;
