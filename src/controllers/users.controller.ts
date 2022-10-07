import { Request, Response } from 'express';
import UserService from '../services/users.service';

export default class UsersController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public async registerUser(req: Request, res: Response) {
    const token = await this.service.registerUser(req.body);
    res.status(201).json({ token });
  }

  public async login(req: Request, res: Response) {
    const token = await this.service.login(req.body);
    res.status(200).json({ token });
  }
} 