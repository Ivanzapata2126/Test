export class Client {
    id: string;
    name: string;
    nationalId: number;
    lastName: string;
    zipCode: number;
    address: string;
    updatedAt: Date;
}

export interface Invoice {
    date:     Date;
    total:    number;
    client:   string;
    packages: Package[];
}

export interface Package {
    name:    string;
    price:   number;
    invoice: string;
}
export interface Resultado {
    ok:           boolean;
    items:        Item[];
    totalPages:   number;
    totalResults: number;
}

export interface Item {
    id:         string;
    createdAt:  Date;
    updatedAt:  Date;
    name:       string;
    nationalId: number;
    lastName:   string;
    zipCode:    number;
    address:    string;
}

