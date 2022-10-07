import jwt from 'jsonwebtoken';
import { Users } from '../interfaces/products.interfaces';
import connection from '../models/connection';
import UsersModel from '../models/users.model';

export default class UserService {
  private model: UsersModel;

  private MyJwt;

  constructor() {
    this.model = new UsersModel(connection);
    this.MyJwt = jwt;
  }

  public async registerUser(user: Users): Promise<string> {
    const registeredUser = await this.model.create(user);
    const token = this.generateToken(registeredUser);
    return token;
  }

  private generateToken(user: Users): string {
    const payload = {
      id: user.id,
      username: user.username,
      password: user.password,
    };
    const secret: string = process.env.JWT_SECRET || 'lalaland';
    const token = this.MyJwt.sign(payload, secret);
    return token;
  }
}