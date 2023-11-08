'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  title: z.string({ invalid_type_error: 'Please enter a Link' }),
  url: z.string({ invalid_type_error: 'Please enter a url' }),
  root: z.string({ invalid_type_error: 'Please enter a root' }),
  stem: z.string({ invalid_type_error: 'Please enter a stem' }),
  branch: z.string({ invalid_type_error: 'Please enter a branch' }),
  leaf: z.string({ invalid_type_error: 'Please enter a leaf' }),
  date: z.string(),
});

const CreatResource = FormSchema.omit({ id: true, date: true })
const UpdateResource = FormSchema.omit({ id: true, date: true })



// This is temporary for resources
export type State = {
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


export async function createResource(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreatResource.safeParse({
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
      INSERT INTO resources (customer_id, title, url, root, stem, branch, leaf)
      VALUES (${customerId}, ${title}, ${url}, ${root}, ${stem}, ${branch}, ${leaf})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create External Link.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/resources');
  redirect('/dashboard/resources');
}

export async function updateResource(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateResource.safeParse({
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
      UPDATE Resources
      SET customer_id = ${customerId}, title = ${title}, url = ${url}, root = ${root}, stem = ${stem}, branch = ${branch}, leaf = ${leaf}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update External Link.' };
  }

  revalidatePath('/dashboard/resources');
  redirect('/dashboard/resources');
}

export async function deleteResource(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM resources WHERE id = ${id}`;
    revalidatePath('/dashboard/resources');
    return { message: 'Deleted Resource' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Resource.' };
  }
}