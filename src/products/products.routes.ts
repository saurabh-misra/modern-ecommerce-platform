import { Router } from 'express';
import type { Product } from './product.types.js';
import ProductService from './products.service.js';
import { CreateProductSchema, type CreateProductInput } from './products.schemas.js';
import ProductsRepository from './products.repository.js';
import z from 'zod';
import AppError from '../errors/app-error.js';

const router = Router();
const productsRepo = new ProductsRepository();
const productService = new ProductService( productsRepo );

// GET all products
router.get( '/', async ( _req, res ) => {
    const products = await productService.getAllProducts();
    res.json( { data: products } );
});

// GET Product
router.get( '/:id', async ( req, res ) => {
    // Validate incoming `id` as a valid non-blank UUID.
    const result = z.uuid().safeParse( req.params.id );
    if( !result.success ) { // if parse failed...
        // collect error details.
        const details = result.error.issues.map( issue => ({
            field: issue.path.join( "." ),
            message: issue.message
        }));

        throw new AppError( 400, "PRODUCT_ID_INVALID", "Product ID is invalid.", details );
    }

    // get sanitized `id`
    const sanitizedProductId = result.data;

    // Fetch product details by `id`.
    const product: Product | null = await productService.getProduct( sanitizedProductId );

    // return error response if product is not found.
    if( !product ) {
        throw new AppError( 404, "PRODUCT_NOT_FOUND", "Product not found.", [] );
    }

    // return successful response if product is found and valid.
    res.json( { data: product } );
});

// CREATE product
router.post( "/", async ( req, res ) => {
    let result = CreateProductSchema.safeParse( req.body );
    
    if( !result.success ) {
        const details = result.error.issues.map( issue => ({
            field: issue.path.join( "." ),
            message: issue.message
        }));

        throw new AppError( 400, "PRODUCT_CREATE_REQUEST_INVALID", "The data supplied for creating product is invalid.", details );
    }

    const input: CreateProductInput = result.data;

    // Add product to database.
    const newProduct: Product | null = await productService.createProduct( input );

    if( !newProduct ) {
        throw new AppError( 500, "PRODUCT_CREATE_ERROR", "An error occurred while trying to create this product.", [] );
    }

    return res
        .location( `/products/${newProduct.id}` )
        .status( 201 )
        .json({
            data: newProduct
        });
    
});

export default router;