import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

// ミドルウェアの設定
app.use(cors());
app.use(express.json());

// ルートの設定
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

// 基本的なエラーハンドリング
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

app.use(cors({
  origin: 'http://localhost:3000', // Reactのデフォルトポート
  credentials: true
}));

// app.ts
app.get('/health', (req, res) => {
  console.log('health check');
  res.json({ status: 'ok' });
});

export default app;