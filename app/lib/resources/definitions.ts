// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type Resources = {
  id: string;
  customer_id: string;
  title: string;
  url: string;
  root: string;
  stem: string;
  branch: string;
  leaf: string;
};

export type ResourcesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  title: string;
  url: string;
  root: string;
  stem: string;
  branch: string;
  leaf: string;
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

export type CustomerField = {
  id: string;
  name: string;
};

export type ResourcesForm = {
  id: string;
  customer_id: string;
  title: string;
  url: string;
  root: string;
  stem: string;
  branch: string;
  leaf: string;
};
