import { fetchFilteredTasks } from '@/app/lib/data';
import TasksTable from '@/app/ui/tasks/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tasks',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';

    const tasks = await fetchFilteredTasks(query);

    return (
        <main>
            <TasksTable tasks={tasks} />
        </main>
    );
}
