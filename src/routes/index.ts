import { Application } from 'express';
import productRoute from './products.route';

export default (app: Application) => {
  app.use(
    productRoute,
  );
};