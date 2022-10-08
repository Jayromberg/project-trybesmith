import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface Product {
  id?: number;
  name: string;
  amount: string;
}

export interface Users {
  id?: number;
  username: string,
  classe: string,
  level: number,
  password: string
}

export interface Orders {
  id: number,
  userId: number,
  productsIds: Array<number>,
}

export interface Login {
  username: string,
  password: string
}

export interface ProductsId {
  productsIds: [
    number,
  ]
}

export interface RequestCustom extends Request {
  user: JwtPayload;
}
