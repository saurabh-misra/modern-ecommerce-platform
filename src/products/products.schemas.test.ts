import { describe, expect, it } from 'vitest';
import { CreateProductSchema } from './products.schemas.js';

describe( 'CreateProductSchema', () => {
    it( 'should validate a correct product user input successfully', () => {
        const validInput = {
            name: "Mechanical Keyboard",
            price: 1299.00
        };

        const result = CreateProductSchema.safeParse( validInput );

        expect( result.success ).toBe( true );

        if( result.success ) {
            expect( result.data ).toEqual( validInput );
        }
    });

    it( 'should reject an empty or white-space only product name', () => {
        const invalidInput = {
            name: "   ",
            price: 1299.00
        };

        const result = CreateProductSchema.safeParse( invalidInput );

        expect( result.success ).toBe( false );

        if( !result.success ) {
            const issues = result.error.issues;
            expect( issues ).toHaveLength( 1 );
            expect( issues[ 0 ]?.message ).toEqual( "Product name is required." );
        }
    });

    it('should reject a negative product price', () => {
        const invalidInput = {
            name: 'Gaming Chair',
            price: -150.00
        };

        const result = CreateProductSchema.safeParse(invalidInput);

        expect(result.success).toBe(false);

        if (!result.success) {
            const issues = result.error.issues;
            expect(issues).toHaveLength(1);
            expect(issues[0]?.message).toBe('Product price must be a positive number.');
        }
    });

    it('should reject missing fields', () => {
        const invalidInput = {};

        const result = CreateProductSchema.safeParse(invalidInput);
        
        expect(result.success).toBe(false);
    });
});