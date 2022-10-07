import Joi from 'joi';
import { Product } from '../interfaces/interfaces';
import connection from '../models/connection';
import ProductModel from '../models/products.model';
import HttpException from '../util/http.exception';

export default class ProductService {
  private model: ProductModel;

  private MyJoi;

  constructor() {
    this.model = new ProductModel(connection);
    this.MyJoi = Joi;
  }

  public async registerProducts(product: Product): Promise<Product> {
    this.validateRegister(product);
    const registeredProduct = await this.model.create(product);
    return registeredProduct;
  }
  
  public async getAllProducts(): Promise<Product[]> {
    const allProducts = await this.model.findAll();
    return allProducts;
  }

  private validateRegister(product: Product): Error | undefined {
    const schema = this.MyJoi.object({
      name: Joi.string().min(3).required(),
      amount: Joi.string().min(3).required(),
    });

    const { error } = schema.validate(product);
    
    if (!error) return undefined;

    const [{ type }] = error.details;
    
    switch (type) {
      case 'any.required':
        throw new HttpException(400, error.message);
      case 'string.base':
        throw new HttpException(422, error.message);
      case 'string.min': 
        throw new HttpException(422, error.message);
      default:
        break;
    }
  }
}