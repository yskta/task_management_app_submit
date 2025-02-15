import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

router.use(authenticateToken);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: ユーザー一覧を取得
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ユーザー一覧取得成功
 *       401:
 *        description: 認証エラー
 *       500:
 *         description: ユーザー一覧の取得に失敗
 */
router.get('/', async (req, res) => {
  await userController.getUsers(req, res);
});

export default router;