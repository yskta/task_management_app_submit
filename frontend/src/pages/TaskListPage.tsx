import React, { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import { Task } from '../types/task';

export const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await taskService.getTasks();
        setTasks(fetchedTasks);
        setError(null);
      } catch (err) {
        setError('タスクの取得に失敗しました');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">タスク一覧</h1>
      <div className="grid gap-4">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className="p-4 bg-white rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold">{task.title}</h2>
            {task.description && (
              <p className="text-gray-600 mt-2">{task.description}</p>
            )}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                作成者: {task.creator.name}
              </span>
              <span className={`px-2 py-1 rounded text-sm ${
                task.status === 'TODO' ? 'bg-yellow-100 text-yellow-800' :
                task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};