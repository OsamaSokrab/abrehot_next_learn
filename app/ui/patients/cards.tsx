import { fetchFilteredPatients } from "@/app/lib/patients/data"

export default async function cards({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {

    const patients = await fetchFilteredPatients(query, currentPage)
    return (
        <div>
            {patients.map((patient) => (
                <div>
                    <div>
                        {patient.first_name}
                    </div>
                    <div>
                        {patient.last_name}
                    </div>
                    <div>
                        {patient.middle_name}
                    </div>
                    <div>
                        {patient.age}
                    </div>
                    <div>
                        {patient.gender}
                    </div>
                    <div>
                        {patient.occupation}
                    </div>
                    <div>
                        {patient.marital_status}
                    </div>
                    <div>
                        {patient.country}
                    </div>
                    <div>
                        {patient.state}
                    </div>
                    <div>
                        {patient.city}
                    </div>
                    <div>
                        {patient.area}
                    </div>
                    <div>
                        {patient.street}
                    </div>
                    <div>
                        {patient.phone_number}
                    </div>
                    <div>
                        {patient.education}
                    </div>

                </div>
            ))}
        </div>
    )
}
