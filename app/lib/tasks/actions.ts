'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  task: z.string({ invalid_type_error: 'Please enter a Task' }),
  status: z.enum(['pending', 'done', 'delayed', 'cancelled'], {
    invalid_type_error: 'Please select a task status'
  }),
  date: z.string(),
});

const CreatTask = FormSchema.omit({ id: true })
const UpdateTask = FormSchema.omit({ id: true })



// This is temporary for resources
export type State = {
  errors?: {
    // customerId?: string[];
    task?: string[];
    status?: string[];
    date?: string[];
  };
  message?: string | null;
};


export async function createTask(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreatTask.safeParse({
    // customerId: formData.get('customerId'),
    task: formData.get('task'),
    status: formData.get('status'),
    date: formData.get('date'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Task.',
    };
  }

  // Prepare data for insertion into the database
  const { task, status, date } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO tasks (task, status, date)
      VALUES (${task}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Task.',
    };
  }

  // Revalidate the cache for the tasks page and redirect the user.
  revalidatePath('/dashboard/tasks');
  redirect('/dashboard/tasks');
}

export async function updateTask(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateTask.safeParse({
    task: formData.get('task'),
    status: formData.get('status'),
    date: formData.get('date'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Task.',
    };
  }

  const { task, status, date } = validatedFields.data;

  try {
    await sql`
      UPDATE tasks
      SET task = ${task}, status = ${status}, date = ${date}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Tasks.' };
  }

  revalidatePath('/dashboard/tasks');
  redirect('/dashboard/tasks');
}

export async function deleteTask(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM tasks WHERE id = ${id}`;
    revalidatePath('/dashboard/tasks');
    return { message: 'Deleted tasks' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Task.' };
  }
}