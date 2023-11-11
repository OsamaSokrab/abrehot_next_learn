import { sql } from '@vercel/postgres';
import {
  TasksForm,
  TasksTable,
} from './definitions'
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredDoneTasks(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tasks = await sql<TasksTable>`
      SELECT
        tasks.id,
        tasks.task,
        tasks.status,
        tasks.date
      FROM tasks
      WHERE
        tasks.status = 'done' AND
        tasks.task ILIKE ${`%${query}%`}
      ORDER BY tasks.date, tasks.status, tasks.task 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tasks.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Tasks.');
  }
}

export async function fetchFilteredPendingTasks(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tasks = await sql<TasksTable>`
      SELECT
        tasks.id,
        tasks.task,
        tasks.status,
        tasks.date
      FROM tasks
      WHERE
        tasks.status = 'pending' AND
        tasks.task ILIKE ${`%${query}%`}
      ORDER BY tasks.date, tasks.status, tasks.task 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tasks.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Tasks.');
  }
}

export async function fetchFilteredCancelledTasks(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tasks = await sql<TasksTable>`
      SELECT
        tasks.id,
        tasks.task,
        tasks.status,
        tasks.date
      FROM tasks
      WHERE
        tasks.status = 'cancelled' AND
        tasks.task ILIKE ${`%${query}%`}
      ORDER BY tasks.date, tasks.status, tasks.task 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tasks.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Tasks.');
  }
}

export async function fetchFilteredDelayedTasks(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tasks = await sql<TasksTable>`
      SELECT
        tasks.id,
        tasks.task,
        tasks.status,
        tasks.date
      FROM tasks
      WHERE
        tasks.status = 'delayed' AND
        tasks.task ILIKE ${`%${query}%`}
      ORDER BY tasks.date, tasks.status, tasks.task 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tasks.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Tasks.');
  }
}

export async function fetchTasksPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tasks
    WHERE
      tasks.task ILIKE ${`%${query}%`} OR
      tasks.status ILIKE ${`%${query}%`} 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of Tasks.');
  }
}

export async function fetchTaskById(id: string) {
  noStore();
  try {
    const data = await sql<TasksForm>`
      SELECT
        tasks.id,
        tasks.task,
        tasks.status,
        tasks.date
      FROM tasks
      WHERE tasks.id = ${id};
    `;

    const task = data.rows.map((task) => ({
      ...task
    }));

    return task[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Task.');
  }
}
