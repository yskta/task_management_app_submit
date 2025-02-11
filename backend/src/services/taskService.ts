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
  
  //タスクの作成者とアサインされたユーザーのみがタスクを取得できるように
  async getTaskById(taskId: number, userId: number) {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        OR: [
          { creatorId: userId },
          {
            assignments: {
              some: {
                userId: userId
              }
            }
          }
        ]
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true
          }
        },
        assignments: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });
  
    if (!task) {
      throw new Error('タスクが見つからないか、アクセス権限がありません');
    }
  
    return task;
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

  async assignUser(taskId: number, creatorId: number, assigneeId: number) {
    //タスクの作成者を確認
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        creatorId: creatorId
      }
    });
  
    if (!task) {
      throw new Error('タスクが見つからないか、アクセス権限がありません');
    }

    // アサインするユーザーが存在するか確認
    const assignee = await prisma.user.findUnique({
        where: { id: assigneeId }
    });
    
    if (!assignee) {
        throw new Error('アサインするユーザーが見つかりません');
    }
  
    // 既にアサイン済みかチェック
    const existingAssignment = await prisma.taskAssignment.findFirst({
      where: {
        taskId,
        userId: assigneeId
      }
    });
  
    if (existingAssignment) {
      throw new Error('このユーザーは既にアサインされています');
    }
  
    // アサインを作成
    await prisma.taskAssignment.create({
      data: {
        taskId,
        userId: assigneeId
      }
    });
  
    // 更新されたタスク情報を返す
    return this.getTaskById(taskId, creatorId);
  }
}