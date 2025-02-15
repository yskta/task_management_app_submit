import React, { useState } from 'react';
import { Task } from '../types/task';
import { EditTaskModal } from './EditTaskModal';
import { taskService } from '../services/taskService';

interface TaskDetailModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  isOpen,
  onClose,
  onTaskUpdated,
  onTaskDeleted
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  if (!isOpen) return null;

  const handleDelete = async () => {
    if (window.confirm('このタスクを削除してもよろしいですか？')) {
      try {
        await taskService.deleteTask(task.id);
        onTaskDeleted();
        onClose();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('タスクの削除に失敗しました');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            編集
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            削除
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {isEditModalOpen && (
          <EditTaskModal
            task={task}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onTaskUpdated={() => {
              onTaskUpdated();
              onClose();
            }}
          />
        )}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">説明:{task.description || '説明なし'}</h3>
          </div>

          <div className="flex gap-4">
            <div>
              <span className={`inline-block px-2 py-1 rounded text-sm ${
                task.status === 'TODO' ? 'bg-yellow-100 text-yellow-800' :
                task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                ステータス:{task.status}
              </span>
            </div>

            <div>
              <p>作成者:{task.creator.name}</p>
            </div>

            {task.dueDate && (
              <div>
                <p>期限:{new Date(task.dueDate).toLocaleString()}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">アサイン済みユーザー</h3>
            {task.assignments.length > 0 ? (
              <ul className="list-disc list-inside">
                {task.assignments.map(assignment => (
                  <li key={assignment.id}>{assignment.user.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">アサインされているユーザーはいません</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};