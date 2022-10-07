import { Application } from 'express';
import productsRoute from './products.route';
import usersRoute from './users.route';

export default (app: Application) => {
  app.use(
    productsRoute,
    usersRoute,
  );
};