import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
const taskController = new TaskController();

// すべてのルートで認証を必要とする
router.use(authenticateToken);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: タスク一覧を取得
 *     description: 認証ユーザーが作成またはアサインされたタスク一覧を取得する
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: タスク一覧の取得成功
 *       401:
 *        description: 認証エラー
 *       500:
 *         description: タスクの一覧取得に失敗
 */

// タスク一覧の取得
router.get('/', async (req, res) => {
  await taskController.getAllTasks(req, res);
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: 指定したタスクの詳細を取得
 *     description: 認証ユーザーが作成またはアサインされたタスクを取得する
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 取得するタスクのID
 *     responses:
 *       200:
 *         description: タスク取得成功
 *       401:
 *         description: 認証エラー
 *       404:
 *         description: タスクが見つからないかアクセス権がない
 *       500:
 *         description: サーバーエラー
 */
// タスク詳細の取得
router.get('/:id', async (req, res) => {
  await taskController.getTaskById(req, res);
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: 新しいタスクを作成
 *     description: タスクを作成し、その詳細を返す
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: タスクのタイトル（必須）
 *               description:
 *                 type: string
 *                 description: タスクの説明（任意）
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: 締め切り日時（任意）
 *     responses:
 *       201:
 *         description: タスク作成成功
 *       400:
 *         description: タイトルが不足
 *       401:
 *         description: 認証エラー
 *       500:
 *         description: サーバーエラー
 */
// タスクの作成
router.post('/', async (req, res) => {
  await taskController.createTask(req, res);
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: タスクを更新
 *     description: 指定したタスクの情報を更新する
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 更新するタスクのID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: タスク更新成功
 *       400:
 *         description: 無効なリクエスト
 *       401:
 *        description: 認証エラー
 *       500:
 *         description: サーバーエラー
 */
// タスクの更新
router.put('/:id', async (req, res) => {
  await taskController.updateTask(req, res);
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: タスクを削除
 *     description: 指定したタスクを削除する（作成者のみ可能）
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 削除するタスクのID
 *     responses:
 *       204:
 *         description: タスク削除成功（レスポンスボディなし）
 *       400:
 *         description: タスクが見つからない、または削除権限がない
 *       401:
 *         description: 認証エラー
 *       500:
 *         description: サーバーエラー
 */
// タスクの削除
router.delete('/:id', async (req, res) => {
  await taskController.deleteTask(req, res);
});

/**
 * @swagger
 * /tasks/{id}/assign:
 *   post:
 *     summary: タスクにユーザーをアサイン
 *     description: タスク作成者が他のユーザーをアサインする
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ユーザーをアサインするタスクのID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assigneeId
 *             properties:
 *               assigneeId:
 *                 type: integer
 *                 description: アサインするユーザーのID
 *     responses:
 *       200:
 *         description: ユーザーのアサイン成功
 *       400:
 *         description: アサインするユーザーが存在しない、または既にアサイン済み
 *       401:
 *        description: 認証エラー
 *       500:
 *         description: サーバーエラー
 */
// タスクへのユーザーアサイン
router.post('/:id/assign', async (req, res) => {
  await taskController.assignUser(req, res);
});

export default router;