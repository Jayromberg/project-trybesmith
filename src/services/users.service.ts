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
    this.validateNameClasseAndPasswordRegister(user);
    this.validateLevelRegister(user);
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

  private validateNameClasseAndPasswordRegister(user: Users): Error | undefined {
    const schema = this.MyJoi.object({
      username: Joi.string().min(3).required(),
      classe: Joi.string().min(3).required(),
      password: Joi.string().min(8).required(),
    });
    const { error } = schema.validate(user);
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

  private validateLevelRegister(user: Users): Error | undefined {
    const schema = this.MyJoi.object({
      level: Joi.number().min(1).required(),
    });
    const { error } = schema.validate(user);
    if (!error) return undefined;
    const [{ type }] = error.details;
    switch (type) {
      case 'any.required':
        throw new HttpException(400, error.message);
      case 'number.base':
        throw new HttpException(422, error.message);
      case 'number.min': 
        throw new HttpException(422, error.message);
      default:
        break;
    }
  }
}