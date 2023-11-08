import Pagination from '@/app/ui/resources/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/resources/table';
import { CreateResource } from '@/app/ui/resources/buttons';
import { lusitana } from '@/app/ui/fonts';
import { ResourcesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchResourcesPages } from '@/app/lib/resources/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'External Links',
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

    const totalPages = await fetchResourcesPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>External Links</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateResource />
            </div>
            <Suspense key={query + currentPage} fallback={<ResourcesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
