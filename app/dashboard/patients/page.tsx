import Search from "@/app/ui/search"
import Pagination from "@/app/ui/resources/pagination"
import { lusitana } from "@/app/ui/fonts";
import { ResourcesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchPatientPages } from "@/app/lib/patients/data"
import Cards from "@/app/ui/patients/cards";
import { Metadata } from "next";
import { CreatePatient } from "@/app/ui/patients/buttons";

export const metadata: Metadata = {
    title: 'Patients',
}

export default async function page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page || 1)

    const totalPages = await fetchPatientPages(query)
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Patients</h1>
            </div>
            <div className="mt-4 mb-[2rem] flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search patients..." />
                <CreatePatient />
            </div>
            <Suspense key={query + currentPage} fallback={<ResourcesTableSkeleton />}>
                <Cards query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}
