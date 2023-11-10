import Form from '@/app/ui/resources/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchTaskById, fetchCustomers } from '@/app/lib/tasks/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Resource',
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [link, customers] = await Promise.all([
        fetchTaskById(id),
        fetchCustomers(),
    ]);

    if (!link) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Tasks', href: '/dashboard/tasks' },
                    {
                        label: 'Edit Link',
                        href: `/dashboard/tasks/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form link={link} customers={customers} />
        </main>
    );
}
