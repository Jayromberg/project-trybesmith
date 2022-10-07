import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const router = Router();
const userController = new UsersController();

router
  .post(
    '/login',
    (req, res) => userController.login(req, res),
  )
  .post(
    '/users',
    (req, res) => userController.registerUser(req, res),
  );

export default router;