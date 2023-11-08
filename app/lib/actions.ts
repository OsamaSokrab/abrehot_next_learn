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
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  task: z.string({ invalid_type_error: 'Please enter a task' }),
  title: z.string({ invalid_type_error: 'Please enter a Link' }),
  url: z.string({ invalid_type_error: 'Please enter a url' }),
  root: z.string({ invalid_type_error: 'Please enter a root' }),
  stem: z.string({ invalid_type_error: 'Please enter a stem' }),
  branch: z.string({ invalid_type_error: 'Please enter a branch' }),
  leaf: z.string({ invalid_type_error: 'Please enter a leaf' }),
  taskstatus: z.enum(['pending', 'done', 'delayed', 'cancelled'], {
    invalid_type_error: 'Please select a task status'
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true, task: true, title: true, url: true, root: true, stem: true, branch: true, leaf: true, taskstatus: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true, task: true, title: true, url: true, root: true, stem: true, branch: true, leaf: true, taskstatus: true });
const CreateTask = FormSchema.omit({ id: true, amount: true, status: true, date: true, title: true, url: true, root: true, stem: true, branch: true, leaf: true, })
const UpdateTask = FormSchema.omit({ id: true, amount: true, status: true, date: true, title: true, url: true, root: true, stem: true, branch: true, leaf: true, })
const CreatExlink = FormSchema.omit({ id: true, amount: true, status: true, date: true, task: true, taskstatus: true })
const UpdateExlink = FormSchema.omit({ id: true, amount: true, status: true, date: true, task: true, taskstatus: true })


// This is temporary for invoices
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// This is temporary for tasks
export type StateTasks = {
  errors?: {
    customerId?: string[];
    task?: string[];
    taskstatus?: string[];
  };
  message?: string | null;
};

// This is temporary for exlinks
export type StateLinks = {
  errors?: {
    customerId?: string[];
    title?: string[];
    url?: string[];
    root?: string[];
    stem?: string[];
    branch?: string[];
    leaf?: string[];
  };
  message?: string | null;
};


export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function createExlink(prevState: StateLinks, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreatExlink.safeParse({
    customerId: formData.get('customerId'),
    title: formData.get('title'),
    url: formData.get('url'),
    root: formData.get('root'),
    stem: formData.get('stem'),
    branch: formData.get('branch'),
    leaf: formData.get('leaf'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create External Link.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, title, url, root, stem, branch, leaf } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO exlinks (customer_id, title, url, root, stem, branch, leaf)
      VALUES (${customerId}, ${title}, ${url}, ${root}, ${stem}, ${branch}, ${leaf})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create External Link.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/external_links');
  redirect('/dashboard/external_links');
}

export async function createTask(prevState: StateTasks, formData: FormData) {
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
  const { customerId, task, taskstatus } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO tasks (customer_id, title, taskstatus, date)
      VALUES (${customerId}, ${task}, ${taskstatus}, ${date})
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

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateExlink(
  id: string,
  prevState: StateLinks,
  formData: FormData,
) {
  const validatedFields = UpdateExlink.safeParse({
    customerId: formData.get('customerId'),
    title: formData.get('title'),
    url: formData.get('url'),
    root: formData.get('root'),
    stem: formData.get('stem'),
    branch: formData.get('branch'),
    leaf: formData.get('leaf'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update External Link.',
    };
  }

  const { customerId, title, url, root, stem, branch, leaf } = validatedFields.data;

  try {
    await sql`
      UPDATE exlinks
      SET customer_id = ${customerId}, title = ${title}, url = ${url}, root = ${root}, stem = ${stem}, branch = ${branch}, leaf = ${leaf}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update External Link.' };
  }

  revalidatePath('/dashboard/external_links');
  redirect('/dashboard/external_links');
}

export async function updateTask(
  id: string,
  prevState: StateTasks,
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

  const { customerId, task, taskstatus } = validatedFields.data;

  try {
    await sql`
      UPDATE tasks
      SET customer_id = ${customerId}, task = ${task}, taskstatus = ${taskstatus}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Task.' };
  }

  revalidatePath('/dashboard/tasks');
  redirect('/dashboard/tasks');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function deleteExlink(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM exlinks WHERE id = ${id}`;
    revalidatePath('/dashboard/external_links');
    return { message: 'Deleted External Link' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete External Link.' };
  }
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
