const express = require('express');
const { create, get, update, remove } = require('./user.controller');

const userRoutes = express.Router();

// Rota para criar um novo usuário
userRoutes.post('/users', create);

// Rota para obter um usuário pelo ID
userRoutes.get('/users/:userId', get);

// Rota para atualizar um usuário pelo ID
userRoutes.put('/users/:userId', update);

// Rota para excluir um usuário pelo ID
userRoutes.delete('/users/:userId', remove);

// Rota para iniciar sessão
userRoutes.get('/users/login', )

module.exports = userRoutes;
