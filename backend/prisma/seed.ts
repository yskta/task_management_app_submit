import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // ユーザーの作成
  const hashedPassword = await bcrypt.hash('password', 10);
  
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      name: 'User1',
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      name: 'User2',
      password: hashedPassword,
    },
  });

  // タスクの作成
  const task1 = await prisma.task.create({
    data: {
      title: 'First Task',
      description: 'This is the first task',
      status: 'TODO',
      creatorId: user1.id,
    },
  });

  const task2 = await prisma.task.create({
    data: {
      title: 'Second Task',
      description: 'This is the second task',
      status: 'IN_PROGRESS',
      creatorId: user2.id,
    },
  });

  // タスクアサインメントの作成
  await prisma.taskAssignment.create({
    data: {
      taskId: task1.id,
      userId: user2.id,
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });