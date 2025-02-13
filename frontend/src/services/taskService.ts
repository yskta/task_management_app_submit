import axios from 'axios';
import { Task } from '../types/task';

// const API_URL = 'http://localhost:8080';
const API_URL = process.env.REACT_APP_API_URL;

export const taskService = {
  // タスク一覧取得
  async getTasks(): Promise<Task[]> {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },

  // タスク作成
  async createTask(title: string, description?: string, dueDate?: string): Promise<Task> {
    const response = await axios.post(
      `${API_URL}/tasks`,
      { title, description, dueDate },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  },

  // タスク更新
  async updateTask(
    taskId: number,
    updates: { title?: string; description?: string; status?: string; dueDate?: string }
  ): Promise<Task> {
    const response = await axios.put(
      `${API_URL}/tasks/${taskId}`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  },

  // タスク削除
  async deleteTask(taskId: number): Promise<void> {
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  },

  async assignUser(taskId: number, assigneeId: number): Promise<Task> {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/tasks/${taskId}/assign`,
      { assigneeId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  }
};