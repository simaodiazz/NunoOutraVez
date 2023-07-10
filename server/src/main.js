const Express = require('express');
const { sequelize } = require('./database');
const userRoutes = require('./user/user.routes');
const { carRoutes } = require('./car/car.routes');
const rentedRoutes = require('./rented/rented.routes');
const cors = require('cors')


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

express.use(cors());

express.use('/api/v1', userRoutes);
express.use('/api/v1', carRoutes);
express.use('/api/v1', rentedRoutes);
