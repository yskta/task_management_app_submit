import React from 'react';
import { Task } from '../types/task';

interface TaskDetailModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">説明</h3>
            <p className="text-gray-600">{task.description || '説明なし'}</p>
          </div>

          <div className="flex gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500">ステータス</h3>
              <span className={`inline-block px-2 py-1 rounded text-sm ${
                task.status === 'TODO' ? 'bg-yellow-100 text-yellow-800' :
                task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.status}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500">作成者</h3>
              <p>{task.creator.name}</p>
            </div>

            {task.dueDate && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500">期限</h3>
                <p>{new Date(task.dueDate).toLocaleString()}</p>
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