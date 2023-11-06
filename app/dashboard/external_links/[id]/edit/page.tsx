import Form from '@/app/ui/external_links/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchExlinkById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit External Link',
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [link, customers] = await Promise.all([
        fetchExlinkById(id),
        fetchCustomers(),
    ]);

    if (!link) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'External Links', href: '/dashboard/external_links' },
                    {
                        label: 'Edit Link',
                        href: `/dashboard/external_links/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form link={link} customers={customers} />
        </main>
    );
}
