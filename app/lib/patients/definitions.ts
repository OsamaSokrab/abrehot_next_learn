export type Patient = {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    age: number;
    gender: 'male' | 'female';
    marital_status: 'married' | 'single' | 'divorced' | 'widow'
    occupation: string;
    country: string;
    state: string;
    city: string;
    area: string;
    street: string;
    phone_number: string;
    education: 'ilitterate' | 'undergraduate' | 'postgraduate'
}