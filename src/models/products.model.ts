import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Product } from '../interfaces/interfaces';

export default class ProductModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(product: Product): Promise<Product> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }

  public async findAll(): Promise<Product[]> {
    const [result] = await this.connection
      .execute<Product[] & RowDataPacket[]>('SELECT * FROM Trybesmith.Products');
    return result;
  }
}