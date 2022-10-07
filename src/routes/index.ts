import { Application } from 'express';
import productsRoute from './products.route';
import usersRoute from './users.route';
import ordersRoute from './orders.route';
import httpErrorMiddleware from '../middlewares/http.error';

export default (app: Application) => {
  app.use(
    productsRoute,
    usersRoute,
    ordersRoute,
    httpErrorMiddleware,
  );
};