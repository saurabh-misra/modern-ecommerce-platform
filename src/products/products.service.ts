import type { Product, CreateProductInput } from "./product.types.js";
import type ProductsRepository from "./products.repository.js";

export default class ProductService {
    constructor( private readonly repo: ProductsRepository ) {}

    public async getAllProducts(): Promise<Product[]> {
        return this.repo.getAll();
    }

    public async getProduct( id: string ): Promise<Product | null> {
        return this.repo.getById( id );
    }

    public async createProduct( input: CreateProductInput ): Promise<Product | null> {
        return this.repo.create( input );
    }
}