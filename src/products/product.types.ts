export type Product = {
    id: string;
    name: string;
    price: number;
};

export type ProductRow = {
    id: string,
    name: string,
    price: string
}

export type CreateProductInput = {
    name: string;
    price: number;
};