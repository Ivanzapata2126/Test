export class Client {
    id: string;
    name: string;
    nationalId: number;
    lastName: string;
    zipCode: number;
    address: string;
    updatedAt?: Date;
}

export class Invoice {
    date:     Date;
    clientId:   string;
    items: Package[];
}

export class Package {
    name:    string;
    price:   number;
    trackId: string;
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
    origin:     string;
    destiny:   string;
    cost:        number;
}

export class Track {
    origin: string;
    destiny: string;
    cost: number;
}

