import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
const taskController = new TaskController();

// すべてのルートで認証を必要とする
router.use(authenticateToken);

// タスク一覧の取得
router.get('/', async (req, res) => {
  await taskController.getAllTasks(req, res);
});

// タスクの作成
router.post('/', async (req, res) => {
  await taskController.createTask(req, res);
});

// タスクの更新
router.put('/:id', async (req, res) => {
  await taskController.updateTask(req, res);
});

// タスクの削除
router.delete('/:id', async (req, res) => {
  await taskController.deleteTask(req, res);
});

export default router;