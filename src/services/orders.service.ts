import Joi from 'joi';
import { JwtPayload } from 'jsonwebtoken';
import { Orders, ProductsId } from '../interfaces/interfaces';
import connection from '../models/connection';
import OrdersModel from '../models/orders.model';
import ProductModel from '../models/products.model';
import HttpException from '../util/http.exception';

export default class OrdersService {
  private model: OrdersModel;

  private productModel: ProductModel;

  private MyJoi;

  constructor() {
    this.model = new OrdersModel(connection);
    this.productModel = new ProductModel(connection);
    this.MyJoi = Joi;
  }

  public async getAllOrders(): Promise<Orders[]> {
    const allOrders = await this.model.findAllOrders();
    return allOrders;
  }

  public async updateOrder(payload: JwtPayload, body: ProductsId) {
    this.validateUpdate(body);
    const { productsIds } = body;
    const insertId = await this.model.create(payload);
    const promiseGenerate = productsIds.map((id) => this.productModel.update(id, insertId));
    const result = await Promise.all(promiseGenerate)
      .then(() => ({
        userId: payload.id,
        productsIds,
      }))
      .catch(() => {
        throw new Error('Internal Error');
      });
    
    return result;
  }

  private validateUpdate(product: ProductsId): Error | undefined {
    const schema = this.MyJoi.object({
      productsIds: Joi.array().items(Joi.number().required()).required(),
    });

    const { error } = schema.validate(product);
    
    if (!error) return undefined;

    const [{ type }] = error.details;
    
    switch (type) {
      case 'any.required':
        throw new HttpException(400, error.message);
      case 'array.base': 
        throw new HttpException(422, error.message);
      case 'array.includesRequiredUnknowns':
        throw new HttpException(422, '"productsIds" must include only numbers');
      default:
        break;
    }
  }
}