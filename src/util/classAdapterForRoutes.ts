import { Request, Response, NextFunction } from 'express';

const classAdapter = (handlerFn: any) => ((
  req: Request,
  res: Response, 
  next: NextFunction,
) => handlerFn(req, res, next));

export default classAdapter;
