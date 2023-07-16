export type Province = {
    href: string;
    id: string;
    name: string;
    region_code: string;
}


export type City = {
    id: string;
    name: string;
    region_code: string;
    province_code: string;
    href: string;
};

export type Barangay = {
    id: string;
    name: string;
    region_code: string;
    province_code: string;
    city_code: string;
    href: string;
};

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

export type StatusType = 'idle' | 'failed' | 'success' | 'loading' | 'loading-next-page'
