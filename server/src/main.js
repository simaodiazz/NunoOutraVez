const Express = require('express');
const { sequelize } = require('./database');
const userRoutes = require('./user/user.routes');
const { authenticate } = require('./user/user.controller');

const express = Express();

sequelize
  .sync()
  .then(() => {
    express.listen(3000, () => {
      console.log('Servidor ligado.');
    });
  })
  .catch((error) => {
    console.log(error);
  });

express.use(Express.json());

express.use(authenticate)

express.use('/api/v1/user', userRoutes);
