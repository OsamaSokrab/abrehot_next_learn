import Search from "@/app/ui/search"
import Pagination from "@/app/ui/resources/pagination"
import { fetchPatientPages } from "@/app/lib/patients/data"
import Cards from "@/app/ui/patients/cards";

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
        <div>
            <h1>Patients</h1>
            <Cards query={query} currentPage={currentPage} />
        </div>
    )
}
