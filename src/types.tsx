interface Option {
    size: string;
    amount: number;
}

export interface Product {
    id: number;
    name: string;
    options: Option;
    active: boolean;
    createdAt: string;
}

export const isOptions = (value: unknown): value is Option => {
    return (
        typeof value === "object" &&
        value !== null &&
        "size" in value &&
        "amount" in value
    );
}

export interface PricePlan {
    id: number;
    description: string;
    active: boolean;
    createdAt: string;
    removedAt: string;
}

export interface Page {
    id: number;
    title: string;
    active: boolean;
    updatedAt: string;
    publishedAt: string;
}

export type TableData = Product | PricePlan | Page;
