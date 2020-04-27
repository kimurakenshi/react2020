import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (taskName: string) => {
  try {
    const newTask = await prisma.task.create({
      data: {
        name: taskName,
        completed: false,
      },
    });

    return newTask;
  } catch (e) {
    throw e;
  } finally {
    await prisma.disconnect();
  }
};

export const getTasks = async () => {
  try {
    const tasks = await prisma.task.findMany();

    return tasks;
  } catch (e) {
    throw e;
  } finally {
    await prisma.disconnect();
  }
};

export const updateTask = async (taskId: number, completed: boolean) => {
  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        completed: completed,
      },
    });

    return updatedTask;
  } catch (e) {
    throw e;
  } finally {
    await prisma.disconnect();
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const deletedTask = await prisma.task.delete({
      where: { id: taskId },
    });

    return deletedTask;
  } catch (e) {
    throw e;
  } finally {
    await prisma.disconnect();
  }
};
