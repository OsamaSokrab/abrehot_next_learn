import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

export function CreatePatient() {
    return (
        <Link
            href="/dashboard/patients/create"
            className='inline-flex appearance-none items-center justify-center select-none relative whitespace-nowrap align-middle outline outline-[2px] outline-transparent outline-offset-2 leading-[1.2] rounded-[9999px] font-[600] h-[2.5rem] min-w-[2.5rem] ps-[1rem] bg-[#4299e1] text-[#FFFFFF] text-[0.875rem] p-0 shadow-[0px_1px_25px_-5px_rgb(66_153_225_/_48%),_0_10px_10px_-5px_rgb(66_153_225_/_43%)]'>
            <span className='hidden md:block'>Create Patient</span>
            <PlusIcon className='h-5 md:ml-4' />
        </Link>
    )
}
