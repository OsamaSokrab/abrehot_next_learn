import { fetchCustomers } from '@/app/lib/data';
import Form from '@/app/ui/resources/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Resource',
};

export default async function Page() {
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Resources', href: '/dashboard/resources' },
                    {
                        label: 'Create Resource',
                        href: '/dashboard/resources/create',
                        active: true,
                    },
                ]}
            />
            <Form customers={customers} />
        </main>
    );
}
