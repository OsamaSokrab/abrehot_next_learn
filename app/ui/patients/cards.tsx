import { fetchFilteredPatients } from "@/app/lib/patients/data"
import Image from "next/image";
import nature from '@/public/patient_icon.png'
import { PhoneIcon } from "@heroicons/react/24/outline";

export default async function cards({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {

    const patients = await fetchFilteredPatients(query, currentPage)
    return (
        <div className="grid grid-cols-4 gap-[1.5rem]">
            {patients?.map((patient) => (
                <div
                    key={patient.id}
                    className="max-w-[320px] w-full bg-[#FFFFFF] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] rouded-[0.5rem] p-[1.5rem] text-center border-[#E2E8F0]">
                    <span className="rounded-[9999px] inline-flex items-center justify-center font-500 relative text-[calc(6rem/ 2.5)] text-[#FFFFFF] align-top w-[6rem] h-[6rem]mb-[1rem]">
                        <Image
                            className="fit-cover rounded-[9999px] border-none"
                            src={nature}
                            alt="patient photo"
                            width={100}
                            height={100} />
                    </span>
                    <h2 className="font-[700] leading-[1.33] text-[1.5rem]">
                        {patient.first_name} {patient.last_name}
                    </h2>
                    <div className="font-[600] text-[#718096] mb-[1rem]">
                        <div className="flex justify-center">
                            <PhoneIcon className="w-5" />
                            {patient.phone_number}
                        </div>

                    </div>
                    <div className="text-center text-[#2D3748] ps-[0.75rem] pe-[0.75rem]">
                        {patient.age} years old {patient.gender}, {patient.occupation}, {patient.marital_status}, {patient.education} education
                        <p className="text-[#4299e1]">
                            #Address
                        </p>
                        {patient.country} {patient.state} {patient.city} {patient.area} {patient.street}
                    </div>
                    <div className="flex gap-[1rem] mt-[2rem]">
                        <div className="inline-flex appearance-none items-center justify-center select-none relative whitespace-nowrap align-middle outline outline-[2px] outline-transparent outline-offset-2 leading-[1.2] rounded-[9999px] font-[600] h-[2.5rem] min-w-[2.5rem] ps-[1rem] bg-[#EDF2F7] text-[#1A202C] basis-1/2 text-[0.875rem] p-0">
                            Delete
                        </div>
                        <div className="inline-flex appearance-none items-center justify-center select-none relative whitespace-nowrap align-middle outline outline-[2px] outline-transparent outline-offset-2 leading-[1.2] rounded-[9999px] font-[600] h-[2.5rem] min-w-[2.5rem] ps-[1rem] bg-[#4299e1] text-[#FFFFFF] basis-1/2 text-[0.875rem] p-0 shadow-[0px_1px_25px_-5px_rgb(66_153_225_/_48%),_0_10px_10px_-5px_rgb(66_153_225_/_43%)]">
                            Edit
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
