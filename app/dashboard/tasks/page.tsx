import Pagination from '@/app/ui/tasks/pagination';
import Search from '@/app/ui/search';
import { CreateTask } from '@/app/ui/tasks/buttons';
import { lusitana } from '@/app/ui/fonts';
import { TasksTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchTasksPages } from '@/app/lib/tasks/data';
import { Metadata } from 'next';
import Boards from '@/app/ui/tasks/boards/boards';

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
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchTasksPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Tasks</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search tasks..." />
                <CreateTask />
            </div>
            <Suspense key={query + currentPage} fallback={<TasksTableSkeleton />}>
                <Boards query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
