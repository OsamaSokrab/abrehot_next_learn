import Form from '@/app/ui/tasks/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchTaskById } from '@/app/lib/tasks/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Tasks',
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const task = await fetchTaskById(id)

    if (!task) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Tasks', href: '/dashboard/tasks' },
                    {
                        label: 'Edit Task',
                        href: `/dashboard/tasks/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form task={task} />
        </main>
    );
}
