import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: ユーザー登録
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: ユーザー登録成功
 *         content:
 *             application/json:
 *               example:
 *                  id: 1
 *                  email: "test@example.com"
 *                  name: "Taro Yamada"
 *       400:
 *          description: 必須項目が不足している、または不正なリクエスト
 *          content:
 *          application/json:
 *             example:
 *              message: "必須項目が不足しています"
 *       500:
 *          description: サーバーエラー
 *          content:
 *          application/json:
 *             example:
 *               message: "予期せぬエラーが発生しました"
 */
// サインアップ
router.post('/signup', async (req, res) => {
    await authController.signup(req, res);
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: ログイン
 *     tags: [Auth]
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: "test@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: ログイン成功時のレスポンス
 *       400:
 *         description: 必須項目が不足している、または認証に失敗した場合
 *       500:
 *         description: サーバーエラー
 */
// ログイン
router.post('/login', async (req, res) => {
    await authController.login(req, res);
});

export default router;