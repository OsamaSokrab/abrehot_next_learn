import { fetchCustomers } from '@/app/lib/data';
import Form from '@/app/ui/external_links/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create External Link',
};

export default async function Page() {
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'External Links', href: '/dashboard/external_links' },
                    {
                        label: 'Create External Link',
                        href: '/dashboard/invoexternal_links/create',
                        active: true,
                    },
                ]}
            />
            <Form customers={customers} />
        </main>
    );
}
