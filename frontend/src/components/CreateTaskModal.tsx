import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../types/user';
import { taskService } from '../services/taskService';
import { userService } from '../services/userService';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

interface TaskFormData {
  title: string;
  description?: string;
  dueDate?: string;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onTaskCreated
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm<TaskFormData>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const onSubmit = async (data: TaskFormData) => {
    try {
      const createdTask = await taskService.createTask(data.title, data.description, data.dueDate);
      if (selectedUserId) {
        await taskService.assignUser(createdTask.id, selectedUserId);
      }
      reset();
      onClose();
      onTaskCreated();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">新規タスク作成</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">タイトル</label>
            <input
              {...register('title', { required: true })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">説明</label>
            <textarea
              {...register('description')}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">期限</label>
            <input
              type="datetime-local"
              {...register('dueDate')}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">メンバーのアサイン</label>
            <select
              value={selectedUserId || ''}
              onChange={(e) => setSelectedUserId(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">ユーザーを選択</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};