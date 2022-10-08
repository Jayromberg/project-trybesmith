import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';
import AuthJwt from '../middlewares/auth';

const router = Router();
const ordersController = new OrdersController();

router
  .get(
    '/orders',
    (req, res) => ordersController.getAllOrders(req, res),
  )
  .post(
    '/orders',
    AuthJwt,
    (req, res) => ordersController.updateOrdersAndProducts(req, res),
  );

export default router;