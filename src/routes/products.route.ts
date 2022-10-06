import { Router } from 'express';
import ProductsController from '../controllers/products.controller';

const router = Router();
const productController = new ProductsController();

router
  .post(
    '/products',
    (req, res) => productController.registerProduct(req, res),
  )
  .get(
    '/products',
    (req, res) => productController.getAllProducts(req, res),
  );

export default router;