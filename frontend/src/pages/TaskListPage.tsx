import React, { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import { Task } from '../types/task';
import { CreateTaskModal } from '../components/CreateTaskModal';
import { TaskDetailModal } from '../components/TaskDetailModal';

export const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">タスク一覧</h1>
            <button 
                onClick={() => setIsModalOpen(true)} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                タスクを作成
            </button>
        </div>
        <CreateTaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={fetchTasks}
        />
        <div className="grid gap-4">
            {tasks.map(task => (  
            <div 
                key={task.id} 
                className="p-4 bg-white rounded-lg shadow"
                onClick={() => setSelectedTask(task)}
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
            {selectedTask && (
                <TaskDetailModal
                task={selectedTask}
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                onTaskUpdated={fetchTasks}
                />
            )}
        </div>
    </div>
  );
};