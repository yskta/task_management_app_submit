import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

router.use(authenticateToken);

router.get('/', async (req, res) => {
  await userController.getUsers(req, res);
});

export default router;