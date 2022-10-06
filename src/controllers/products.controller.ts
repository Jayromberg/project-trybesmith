import { Request, Response } from 'express';
import ProductService from '../services/products.service';

export default class ProductsController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  public async registerProduct(req: Request, res: Response) {
    const registeredProduct = await this.service.registerProducts(req.body);
    res.status(201).json(registeredProduct);
  }

  public async getAllProducts(_req: Request, res: Response) {
    const allProducts = await this.service.getAllProducts();
    res.status(200).json(allProducts);
  }
}