import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';

const taskService = new TaskService();

export class TaskController {
  async getAllTasks(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      const tasks = await taskService.getAllTasks(userId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'タスクの一覧取得に失敗しました' });
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      const { title, description, dueDate } = req.body;

      if (!title) {
        return res.status(400).json({ message: 'タイトルは必須です' });
      }

      const task = await taskService.createTask(userId, { title, description, dueDate });
      res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'タスクの作成に失敗しました' });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      const taskId = parseInt(req.params.id);
      const { title, description, dueDate, status } = req.body;

      const task = await taskService.updateTask(taskId, userId, { 
        title, 
        description, 
        dueDate,
        status
      });
      res.json(task);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'タスクの更新に失敗しました' });
      }
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      const taskId = parseInt(req.params.id);

      await taskService.deleteTask(taskId, userId);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'タスクの削除に失敗しました' });
      }
    }
  }
}