import { Request, Response } from 'express';
import OrdersService from '../services/orders.service';

export default class OrdersController {
  private service: OrdersService;

  constructor() {
    this.service = new OrdersService();
  }

  public async getAllOrders(_req: Request, res: Response) {
    const allOrders = await this.service.getAllOrders();
    res.status(200).json(allOrders); 
  }
}