import { Request, Response } from 'express';
import { RequestCustom } from '../interfaces/interfaces';
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

  public async updateOrdersAndProducts(request: Request, res: Response) {
    const req = request as RequestCustom;
    const result = await this.service.updateOrder(req.user, req.body);
    res.status(201).json(result); 
  }
}