// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type exLinks = {
  id: string;
  customer_id: string;
  title: string;
  url: string;
  root: string;
  stem: string;
  branch: string;
  leaf: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};


export type CustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type TasksTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  task: string;
  status: 'pending' | 'done' | 'delayed' | 'cancelled';
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type FormattedTasksTable = {
  id: string;
  customer_id: string;
  task: string;
  status: 'pending' | 'done' | 'delayed' | 'cancelled';
  date: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type TaskForm = {
  id: string;
  customer_id: string;
  task: number;
  status: 'pending' | 'done' | 'delayed' | 'cancelled';
};
