'use server'

import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const FormSchema = z.object({
    id: z.string(),
    first_name: z.string({ invalid_type_error: 'Please enter first name' }),
    middle_name: z.string({ invalid_type_error: 'Please enter middle name' }),
    last_name: z.string({ invalid_type_error: 'Please enter last name' }),
    age: z.number({ invalid_type_error: 'Please enter age' }),
    gender: z.string({ invalid_type_error: 'Please enter gender' }),
    occupation: z.string({ invalid_type_error: 'Please enter occupation' }),
    marital_status: z.string({ invalid_type_error: 'Please enter marital status' }),
    country: z.string({ invalid_type_error: 'Please enter country' }),
    state: z.string({ invalid_type_error: 'Please enter state' }),
    city: z.string({ invalid_type_error: 'Please enter city' }),
    area: z.string({ invalid_type_error: 'Please enter area' }),
    street: z.string({ invalid_type_error: 'Please enter street' }),
    phone_number: z.string({ invalid_type_error: 'Please enter phone number' }),
    education: z.string({ invalid_type_error: 'Please enter education' }),
})

const UpdatePatient = FormSchema.omit({ id: true })
const CreatePatient = FormSchema.omit({ id: true })

export type state = {
    error?: {
        id: string[];
        first_name: string[];
        middle_name: string[];
        last_name: string[];
        age: number;
        gender: string[];
        marital_status: string[]
        occupation: string[];
        country: string[];
        state: string[];
        city: string[];
        area: string[];
        street: string[];
        phone_number: string[];
        education: string[]
    };
    message?: string | null
}

export async function CreatePatient(prevState: state, formData: FormData) {
    const validatedFields = CreatePatient.safeParse({
        id: formData.get('id'),
        first_name: formData.get('first_name'),
        middle_name: formData.get('middle_name'),
        last_name: formData.get('last_name'),
        age: formData.get('age'),
        gender: formData.get('gender'),
        marital_status: formData.get('marital_status'),
        occupation: formData.get('occupation'),
        country: formData.get('country'),
        state: formData.get('state'),
        city: formData.get('city'),
        area: formData.get('area'),
        street: formData.get('street'),
        phone_number: formData.get('phone_number'),
        education: formData.get('education'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Patient'
        }
    }

    const {
        id,
        first_name,
        middle_name,
        last_name,
        age, gender,
        marital_status,
        occupation,
        country,
        state,
        city,
        area,
        street,
        phone_number,
        education,
    } = validatedFields.data
}

try {
    await sql`
    INSERT INTO patients ( id,
        first_name,
        middle_name,
        last_name,
        age, 
        gender,
        marital_status,
        occupation,
        country,
        state,
        city,
        area,
        street,
        phone_number,
        education)
    VALUES ( ${id},
        ${first_name},
        ${middle_name},
        ${last_name},
        ${age}, 
        ${gender},
        ${marital_status},
        ${occupation},
        ${country},
        ${state},
        ${city},
        ${area},
        ${street},
        ${phone_number},
        ${education})
    `
} catch (error) {
    return {
        message: 'Database Error: Failed to Create Patient',
    }
}

revalidatePath('/dashboard/patients')
redirect('/dashboard/patients')