import { Orders } from '../interfaces/interfaces';
import connection from '../models/connection';
import OrdersModel from '../models/orders.model';

export default class OrdersService {
  private model: OrdersModel;

  constructor() {
    this.model = new OrdersModel(connection);
  }

  public async getAllOrders(): Promise<Orders[]> {
    const allOrders = await this.model.findAllOrders();
    return allOrders;
  }
}