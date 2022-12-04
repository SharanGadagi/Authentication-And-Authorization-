export interface RegisterTypes {
    firstName: string,
    lastName: string,
    fullName: string,
    dob: Date,
    age: number,
    gender: string,
    email: string,
    pno: number,
    password: string,
    confirmPassword: string,
    role: string,
}

export interface LoginTypes {
    email: string,
    password: string
}