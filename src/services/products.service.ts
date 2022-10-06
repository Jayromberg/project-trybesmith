import Product from '../interfaces/products.interfaces';
import connection from '../models/connection';
import ProductModel from '../models/products.model';

export default class ProductService {
  private model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async registerProducts(product: Product): Promise<Product> {
    const registeredProduct = await this.model.create(product);

    return registeredProduct;
  } 
}