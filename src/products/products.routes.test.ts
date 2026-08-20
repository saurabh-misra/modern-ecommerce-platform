import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import request from 'supertest';
import app from '../app.js';
import pool from '../db/pool.js';
import { ProductResponseSchema } from './products.schemas.js';
import { AppErrorResponseSchema, BaseErrorResponseSchema } from '../errors/errors.schemas.js';


describe( 'POST /products', () => {
    // Clean-up products table before each test executes.
    beforeEach( async () => {
        await pool.query( 'TRUNCATE TABLE products RESTART IDENTITY CASCADE' );
    });

    // Stop ALL active pool connections to the database
    // This is done so that the NODE process can exit and 
    // test runner can complete successfully.
    afterAll( async () => {
        await pool.end();
    });

    // HAPPY PATH - Valid product creation
    it( 'should create a product when valid inputs are provided', async () => {
        const validInput = {
            name: "Mouse",
            price: 100
        };

        const response = await request( app )
            .post( "/products" )
            .send( validInput )
            .expect( 201 )
            .expect( 'Location', /products/ );
        
        // response schema/shape validation
        const result = ProductResponseSchema.safeParse( response.body );
        expect( result.success, JSON.stringify(result.error?.issues, null, 2) ).toBe( true );

        // value assertion
        if( result.success ) {
            const validatedProduct = result.data.data;
            expect( validatedProduct.name ).toEqual( validInput.name );
            expect( validatedProduct.price ).toEqual( validInput.price );
        }
    });

    // Failure Path — Invalid Product Payload
    it( 'should not create product when invalid inputs are provided', async () => {
        const invalidInput = {
            name: "   ",
            price: -100
        };

        const response = await request( app )
            .post( "/products" )
            .send( invalidInput )
            .expect( 400 );

        // response shape/schema validation
        const result = AppErrorResponseSchema.safeParse( response.body );
        expect( result.success ).toBe( true );

        // response value assertions
        if( result.success ) {
            const validatedErrorResponse = result.data;
            expect( validatedErrorResponse.error.code ).toEqual( "PRODUCT_CREATE_REQUEST_INVALID" );
            expect( validatedErrorResponse.error.message ).toEqual( "The data supplied for creating product is invalid." );
        }

    });

    // Failure Path — Failure Path — Duplicate Product Name
    it( 'should not create product when duplicate name is provided', async () => {
        // Insert the product once.
        const validInput = {
            name: "Mouse",
            price: 100
        };
        await request( app )
            .post( "/products" )
            .send( validInput );

        // Try inserting the same product again.
        const response = await request( app )
            .post( "/products" )
            .send( validInput )
            .expect( 500 );

        // response shape/schema validation
        const result = BaseErrorResponseSchema.safeParse( response.body );
        expect( result.success ).toBe( true );

        // response value assertions
        if( result.success ) {
            const validatedErrorResponse = result.data;
            expect( validatedErrorResponse.error.code ).toEqual( "INTERNAL_SERVER_ERROR" );
            expect( validatedErrorResponse.error.message ).toEqual( "An unexpected error occurred on the server." );
        }

    });
});