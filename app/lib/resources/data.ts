import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTable,
  ResourcesForm,
  ResourcesTable,
} from './definitions'
import { formatCurrency } from '../utils';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredResources(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const links = await sql<ResourcesTable>`
      SELECT
        resources.id,
        resources.title,
        resources.url,
        resources.root,
        resources.stem,
        resources.branch,
        resources.leaf,
        customers.name,
        customers.email,
        customers.image_url
      FROM resources
      JOIN customers ON resources.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        resources.title ILIKE ${`%${query}%`} OR
        resources.url ILIKE ${`%${query}%`} OR
        resources.root ILIKE ${`%${query}%`} OR
        resources.stem ILIKE ${`%${query}%`} OR
        resources.branch ILIKE ${`%${query}%`} OR
        resources.leaf ILIKE ${`%${query}%`}
      ORDER BY resources.root, resources.stem, resources.branch, resources.leaf 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return links.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Resources.');
  }
}

export async function fetchResourcesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM resources
    JOIN customers ON resources.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      resources.title ILIKE ${`%${query}%`} OR
      resources.url ILIKE ${`%${query}%`} OR
      resources.root ILIKE ${`%${query}%`} OR
      resources.stem ILIKE ${`%${query}%`} OR
      resources.branch ILIKE ${`%${query}%`} OR
      resources.leaf ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of Resources.');
  }
}

export async function fetchResourceById(id: string) {
  noStore();
  try {
    const data = await sql<ResourcesForm>`
      SELECT
        resources.id,
        resources.customer_id,
        resources.title,
        resources.url,
        resources.root,
        resources.stem,
        resources.branch,
        resources.leaf
      FROM resources
      WHERE resources.id = ${id};
    `;

    const link = data.rows.map((link) => ({
      ...link
    }));

    return link[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch link.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTable>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}