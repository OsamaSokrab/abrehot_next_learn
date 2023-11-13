import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import Form from "@/app/ui/patients/create-form"
import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Create Patient'
}
export default async function page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Patients', href: '/dashboard/patients' },
                    {
                        label: 'Create Patient',
                        href: '/dashboard/patients/create',
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    )
}
