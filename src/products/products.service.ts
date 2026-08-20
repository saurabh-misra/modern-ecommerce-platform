import type { Product } from "./product.types.js";
import type ProductsRepository from "./products.repository.js";
import type { CreateProductInput } from "./products.schemas.js";

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