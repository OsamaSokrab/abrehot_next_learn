import { Patient } from "./definitions"
import { sql } from "@vercel/postgres"
import {
    PatientForm,
    PatientCards,
} from './definitions'
import { unstable_noStore as noStore } from "next/cache"

export async function fetchPatients() {

    noStore()
    try {
        const data = await sql<Patient>`
        SELECT * FROM patients`

        return data.rows
    } catch (error) {
        console.error('Database error', error)
        throw new Error('Failed to fetch patients data')
    }
}

const ITEMS_PER_PAGE = 6
export async function fetchFilteredPatients(
    query: string,
    currentPage: number,
) {
    noStore()
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const patients = await sql<PatientForm>`
        SELECT  
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
        education
        FROM patients
        WHERE 
        first_name ILIKE ${`%${query}%`} OR
        middle_name ILIKE ${`%${query}%`} OR
        last_name ILIKE ${`%${query}%`} OR
        age::text ILIKE ${`%${query}%`} OR
        gender ILIKE ${`%${query}%`} OR
        marital_status ILIKE ${`%${query}%`} OR
        occupation ILIKE ${`%${query}%`} OR
        country ILIKE ${`%${query}%`} OR
        state ILIKE ${`%${query}%`} OR
        city ILIKE ${`%${query}%`} OR
        area ILIKE ${`%${query}%`} OR
        street ILIKE ${`%${query}%`} OR
        phone_number ILIKE ${`%${query}%`} OR
        education ILIKE ${`%${query}%`}

        ORDER BY first_name ASC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `
        return patients.rows
    } catch (err) {
        console.error('Database error', err)
        throw new Error('Failed to fetch patients table')
    }
}

export async function fetchPatientPages(query: string) {

    noStore()
    try {
        const count = await sql`SELECT COUNT(*)
        FROM patients 
        WHERE
        first_name ILIKE ${`%${query}%`} OR
        middle_name ILIKE ${`%${query}%`} OR
        last_name ILIKE ${`%${query}%`} OR
        age::text ILIKE ${`%${query}%`} OR
        gender ILIKE ${`%${query}%`} OR
        marital_status ILIKE ${`%${query}%`} OR
        occupation ILIKE ${`%${query}%`} OR
        country ILIKE ${`%${query}%`} OR
        state ILIKE ${`%${query}%`} OR
        city ILIKE ${`%${query}%`} OR
        area ILIKE ${`%${query}%`} OR
        street ILIKE ${`%${query}%`} OR
        phone_number ILIKE ${`%${query}%`} OR
        education ILIKE ${`%${query}%`}
    `
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE)
        return totalPages
    } catch (err) {
        console.error('Database error', err)
        throw new Error('Failed to fetch total number of patients')
    }
}
