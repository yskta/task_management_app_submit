export interface Task {
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    createdAt: string;
    updatedAt: string;
    creatorId: number;
    creator: {
      id: number;
      name: string;
    };
    assignments: {
      id: number;
      userId: number;
      taskId: number;
      user: {
        id: number;
        name: string;
      };
    }[];
}