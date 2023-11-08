'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  task: z.string({ invalid_type_error: 'Please enter a task' }),
  status: z.enum(['pending', 'done', 'delayed', 'cancelled'], {
    invalid_type_error: 'Please select a task status'
  }),
  date: z.string(),
});

const CreateTask = FormSchema.omit({ id: true, date: true })
const UpdateTask = FormSchema.omit({ id: true, date: true })


// This is temporary for tasks
export type State = {
  errors?: {
    customerId?: string[];
    task?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createTask(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateTask.safeParse({
    customerId: formData.get('customerId'),
    task: formData.get('task'),
    taskstatus: formData.get('taskstatus'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Task.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, task, status } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO tasks (customer_id, title, taskstatus, date)
      VALUES (${customerId}, ${task}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Task.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/tasks');
  redirect('/dashboard/tasks');
}

export async function updateTask(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateTask.safeParse({
    customerId: formData.get('customerId'),
    task: formData.get('task'),
    taskstatus: formData.get('taskstatus'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Task.',
    };
  }

  const { customerId, task, status } = validatedFields.data;

  try {
    await sql`
      UPDATE tasks
      SET customer_id = ${customerId}, task = ${task}, taskstatus = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Task.' };
  }

  revalidatePath('/dashboard/tasks');
  redirect('/dashboard/tasks');
}

export async function deleteTask(id: string) {
  // throw new Error('Failed to Delete Task');

  try {
    await sql`DELETE FROM tasks WHERE id = ${id}`;
    revalidatePath('/dashboard/tasks');
    return { message: 'Deleted Task' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Task.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialsSignin';
    }
    throw error;
  }
}
