import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const router = Router();
const userController = new UsersController();

router
  .post(
    '/users',
    (req, res) => userController.registerUser(req, res),
  );

export default router;