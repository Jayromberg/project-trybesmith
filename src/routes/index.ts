import { Application } from 'express';
import productsRoute from './products.route';
import usersRoute from './users.route';
import ordersRoute from './orders.route';

export default (app: Application) => {
  app.use(
    productsRoute,
    usersRoute,
    ordersRoute,
  );
};