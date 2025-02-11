import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();
const authController = new AuthController();

// サインアップ
router.post('/signup', async (req, res) => {
    await authController.signup(req, res);
});
  
// ログイン
router.post('/login', async (req, res) => {
    await authController.login(req, res);
});

export default router;