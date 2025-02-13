import React from 'react';
import { useForm } from 'react-hook-form';
import { Task } from '../types/task';
import { taskService } from '../services/taskService';

interface EditTaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onTaskUpdated: () => void;
}

interface TaskFormData {
  title: string;
  description?: string;
  dueDate?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onTaskUpdated
}) => {
  const { register, handleSubmit } = useForm<TaskFormData>({
    defaultValues: {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status
    }
  });

  const onSubmit = async (data: TaskFormData) => {
    try {
      await taskService.updateTask(task.id, data);
      onTaskUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('このタスクを削除してもよろしいですか？')) {
      try {
        await taskService.deleteTask(task.id);
        onTaskUpdated();
        onClose();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">タスクの編集</h2>
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
            <label className="block text-gray-700 mb-2">ステータス</label>
            <select
              {...register('status')}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              削除
            </button>
            <div className="flex gap-2">
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
                更新
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};