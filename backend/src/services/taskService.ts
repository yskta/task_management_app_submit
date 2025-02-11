import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TaskService {
  async getAllTasks(userId: number) {
    // TaskのTitle等も含めて取得している
    return await prisma.task.findMany({
      where: {
        creatorId: userId
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
          }
        },
        assignments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      }
    });
  }

  async createTask(userId: number, data: { title: string; description?: string; dueDate?: Date }) {
    return await prisma.task.create({
      data: {
        ...data,
        creatorId: userId
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  async updateTask(taskId: number, userId: number, data: { title?: string; description?: string; dueDate?: Date; status?: string }) {
    // まず、タスク作成者を確認
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        creatorId: userId
      }
    });

    if (!task) {
      throw new Error('タスクが見つからないか、アクセス権限がありません');
    }

    return await prisma.task.update({
      where: { id: taskId },
      data,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  async deleteTask(taskId: number, userId: number) {
    // まず、タスク作成者を確認
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        creatorId: userId
      }
    });

    if (!task) {
      throw new Error('タスクが見つからないか、アクセス権限がありません');
    }

    await prisma.task.delete({
      where: { id: taskId }
    });
  }
}