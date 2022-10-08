import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
import { RequestCustom } from '../interfaces/interfaces';
import HttpException from '../util/http.exception';

export default function auth(request: Request, _res: Response, next: NextFunction) {
  const token = request.header('Authorization');

  if (!token) throw new HttpException(401, 'Token not found');

  try {
    const secret: string = process.env.JWT_SECRET || 'lalaland';
    const decoded = jwt.verify(token as string, secret) as JwtPayload;
    const req = request as RequestCustom;
    req.user = decoded;
    next();
  } catch {
    throw new HttpException(401, 'Invalid token');
  }
}
