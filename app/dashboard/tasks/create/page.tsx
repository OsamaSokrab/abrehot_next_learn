import { fetchCustomers } from '@/app/lib/tasks/data';
import Form from '@/app/ui/tasks/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Task',
};

export default async function Page() {
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Tasks', href: '/dashboard/tasks' },
                    {
                        label: 'Create Task',
                        href: '/dashboard/tasks/create',
                        active: true,
                    },
                ]}
            />
            <Form customers={customers} />
        </main>
    );
}
