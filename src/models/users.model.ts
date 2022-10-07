import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Login, Users } from '../interfaces/interfaces';

export default class UsersModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: Users): Promise<Users> {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }

  public async findUser(userData: Login): Promise<Users> {
    const { username, password } = userData;
    const [[user]] = await this.connection.execute<Users[] & RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?;',
      [username, password],
    );
    return user;
  } 
}