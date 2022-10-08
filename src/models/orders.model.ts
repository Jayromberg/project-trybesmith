import { JwtPayload } from 'jsonwebtoken';
import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Orders } from '../interfaces/interfaces';

export default class OrdersModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async findAllOrders(): Promise<Orders[]> {
    const [result] = await this.connection
      .execute<Orders[] & RowDataPacket[]>(`
        SELECT t1.*, JSON_ARRAYAGG(t2.id)  AS productsIds FROM Trybesmith.Orders t1 
        JOIN Trybesmith.Products t2
        ON t2.orderId = t1.id
        GROUP BY t1.id;
      `);    
    return result;
  }

  public async create(payload: JwtPayload): Promise<number> {
    const { id } = payload;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [id],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return insertId;
  }
}