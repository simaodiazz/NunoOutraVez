const express = require('express');
const { create, find, update, remove, login, findAll } = require('./user.controller');

const userRoutes = express.Router();

// Rota para criar um novo usuário
userRoutes.post('/user', create);

// Rota para obter um usuário pelo ID
userRoutes.get('/user/:id', find);

// Rota para obter um usuário pelo ID
userRoutes.get('/user/', findAll);

// Rota para atualizar um usuário pelo ID
userRoutes.put('/user/:id', update);

// Rota para excluir um usuário pelo ID
userRoutes.delete('/user/:id', remove);

// Rota para iniciar sessão
userRoutes.get('/user/login', login)

module.exports = userRoutes;
