import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: number;
}

// リクエストオブジェクトにuserIdを追加するための型拡張
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: '認証トークンが必要です' });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    req.userId = payload.userId;
    next();
  } catch (error) {
    res.status(403).json({ message: '無効なトークンです' });
    return ;
  }
};