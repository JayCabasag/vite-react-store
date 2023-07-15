export interface User {
    fullname: string,
    address: {
        apartmentNumber: string,
        street: string,
        barangay: string,
        city: string
    },
    contactNumber: string,
    email: string
}