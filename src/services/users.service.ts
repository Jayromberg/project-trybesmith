import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { Users } from '../interfaces/interfaces';
import connection from '../models/connection';
import UsersModel from '../models/users.model';
import HttpException from '../util/http.exception';

export default class UserService {
  private model: UsersModel;

  private MyJwt;

  private MyJoi;

  constructor() {
    this.model = new UsersModel(connection);
    this.MyJwt = jwt;
    this.MyJoi = Joi;
  }

  public async registerUser(user: Users): Promise<string> {
    const registeredUser = await this.model.create(user);
    const token = this.generateToken(registeredUser);
    return token;
  }

  public async login(userData: Users): Promise<string> {
    this.validateLogin(userData);
    const user = await this.model.findUser(userData);
    if (!user) throw new HttpException(401, 'Username or password invalid');
    const token = this.generateToken(user);
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

  private validateLogin(user: Users): Error | void {
    const loginSchema = this.MyJoi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error } = loginSchema.validate(user);
    if (error) throw new HttpException(400, error.message);
  }
}