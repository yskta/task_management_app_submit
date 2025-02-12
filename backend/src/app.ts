import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

// ミドルウェアの設定
app.use(cors());
app.use(express.json());

// ルートの設定
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// 基本的なエラーハンドリング
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

app.use(cors({
  origin: 'http://localhost:3000', // Reactのデフォルトポート
  credentials: true
}));

export default app;