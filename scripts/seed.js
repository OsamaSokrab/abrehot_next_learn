const { db } = require('@vercel/postgres');
const {
  invoices,
  customers,
  revenue,
  users,
  tasks,
  exLinks,
  Patients,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');
const { sql } = require("@vercel/postgres");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedExlinks(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "exlinks" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS exlinks (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        customer_id UUID NOT NULL,
        title VARCHAR(255) NOT NULL,
        url TEXT NOT NULL ,
        root TEXT NOT NULL,
        stem TEXT NOT NULL,
        branch TEXT NOT NULL,
        leaf TEXT NOT NULL
      );
    `;

    console.log(`Created "exlinks" table`);

    // Insert data into the "users" table
    const insertedExlinks = await Promise.all(
      exLinks.map(async (exlink) => {
        return client.sql`
        INSERT INTO exlinks (id, name, url, root, stem, branch, leaf)
        VALUES (${exlink.id}, ${exlink.name}, ${exlink.url}, ${exlink.root}, ${exlink.stem}, ${exlink.branch}, ${exlink.leaf})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedExlinks.length} external links`);

    return {
      createTable,
      users: insertedExlinks,
    };
  } catch (error) {
    console.error('Error seeding exlinks:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedTasks(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "tasks" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        customer_id UUID NOT NULL,
        task VARCHAR(255) NOT NULL,
        taskstatus VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      );
    `;

    console.log(`Created "tasks" table`);

    // Insert data into the "tasks" table
    const insertedTasks = await Promise.all(
      tasks.map(
        (task) => client.sql`
        INSERT INTO tasks (customer_id, task, status, date)
        VALUES (${task.customer_id}, ${task.task}, ${task.status}, ${task.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedTasks.length} tasks`);

    return {
      createTable,
      tasks: insertedTasks,
    };
  } catch (error) {
    console.error('Error seeding tasks:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function seedPatient(client) {
  //Create table if not exist
  try {
    const createTable = client.sql`
        CREATE TABLE IF NOT EXISTS patients (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          middle_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          age INT NOT NULL,
          gender VARCHAR(255) NOT NULL,
          marital_status VARCHAR(255) NOT NULL,
          occupation VARCHAR(255) NOT NULL,
          country VARCHAR(255) NOT NULL,
          state VARCHAR(255) NOT NULL,
          city VARCHAR(255) NOT NULL,
          area VARCHAR(255) NOT NULL,
          street VARCHAR(255) NOT NULL,
          phone_number VARCHAR(255) NOT NULL,
          education VARCHAR(255) NOT NULL
          
        )
      `
    console.log('created table patients')

    //Insert date into table patients
    const insertedPatient = await Promise.all(
      Patients.map((patient) => client.sql`
    INSERT INTO patients (id, first_name, middle_name, last_name, age, gender, marital_status, occupation, country, state, city, area, street, phone_number, education )
    VALUES(${patient.id}, ${patient.first_name},${patient.middle_name},${patient.last_name},${patient.age},${patient.gender},${patient.marital_status},${patient.occupation},${patient.country},${patient.state},${patient.city},${patient.area},${patient.street},${patient.phone_number},${patient.education})
    ON CONFLICT (id) DO NOTHING
    `,
      ),
    );
    console.log(`inserted ${insertedPatient.length} patients`)

    return {
      createTable,
      insertedPatient
    }

  } catch (error) {
    console.error('Error seeding patients', error)
    throw error
  }
}

async function main() {
  const client = await db.connect();

  // await seedUsers(client);
  // await seedCustomers(client);
  // await seedInvoices(client);
  // await seedRevenue(client);
  // await seedTasks(client);
  // await seedExlinks(client);
  await seedPatient(client)

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
