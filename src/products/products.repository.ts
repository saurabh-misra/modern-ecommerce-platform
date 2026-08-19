import pool from "../db/pool.js";
import type { Product, ProductRow, CreateProductInput } from "./product.types.js";

export default class ProductsRepository {
    
    // Get all products
    public async getAll(): Promise<Product[]>{
        try {
            const { rows } = await pool.query<ProductRow>(`
                SELECT 
                    id,
                    name,
                    price
                FROM
                    products
                ORDER BY
                    created_at DESC;    
            `);

            // Map database rows to application domain data( ProductRow[] -> Product[] )
            const products: Product[] = rows.map( row => (
                { 
                    id: row.id, 
                    name: row.name, 
                    price: Number( row.price ) 
                }
            ));

            return products;
        } catch (error) {
            throw new Error( "Something went wrong while fetching all products.", { cause: error } );
        }
    }

    public async getById( id: string ): Promise<Product | null> {
        try {
            const { rows } = await pool.query<ProductRow>(`
                SELECT 
                    id,
                    name,
                    price
                FROM
                    products
                WHERE
                    id = $1
                `, 
                [ id ]
            );

            const row = rows[0];

            // Return `null` if product not found.
            if( !row ) { return null };

            // Map ProductRow to Product
            const product: Product = { 
                id: row.id,
                name: row.name,
                price: Number( row.price )
            };
                
            return product;
        } catch (error) {
            throw new Error( "Something went wrong while fetching product.", { cause: error } );
        }
    }

    public async create( input: CreateProductInput ): Promise<Product | null> {
        try {
            // construct the parameterized insert query and the array of parameter values.
            const query = `
                INSERT INTO products( 
                    name, 
                    price 
                ) VALUES( 
                    $1, 
                    $2 
                )
                RETURNING 
                    id,
                    name,
                    price;
            `;
            const values = [ input.name, input.price ];

            throw new Error( "dummy error" );

            // // Run the query and fetch the affected rowcount.
            // const { rows } = await pool.query<ProductRow>( query, values );

            // // If no rows are inserted/affected, return null.
            // const row = rows[0];
            // if( !row ) {
            //     return null;
            // }

            // // Map ProductRow to Product and return it.
            // const newProduct: Product = {
            //     ...row,
            //     price: Number( row.price )
            // }

            // return newProduct;
        } catch(error) {
            throw new Error( "Something went wrong while inserting this product.", { cause: error } );
        }
    }
}