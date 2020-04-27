import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (taskName: string) => {
  try {
    return await prisma.task.create({
      data: {
        name: taskName,
        completed: false,
      },
    });
  } catch (e) {
    throw e;
  } finally {
    await prisma.disconnect();
  }
};

export const getTasks = async () => {
  try {
    return await prisma.task.findMany();
  } catch (e) {
    throw e;
  } finally {
    await prisma.disconnect();
  }
};

export const updateTask = async (taskId: number, completed: boolean) => {
  try {
    return await prisma.task.update({
      where: { id: taskId },
      data: {
        completed: completed,
      },
    });
  } catch (e) {
    throw e;
  } finally {
    await prisma.disconnect();
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    return await prisma.task.delete({
      where: { id: taskId },
    });
  } catch (e) {
    throw e;
  } finally {
    await prisma.disconnect();
  }
};
