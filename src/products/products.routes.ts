import { Router } from 'express';
import type { Product } from './product.types.js';

const router = Router();

const mockData: Product[] = [
    {
        "id": 1,
        "name": "Mechanical Keyboard",
        "price": 4999
    },
    {
        "id": 2,
        "name": "Wireless Mouse",
        "price": 1999
    }
];

router.get( '/', ( _req, res ) => {
    res.json( { data: mockData } );
});

router.get( '/:id', ( req, res ) => {
    const id = Number( req.params.id );

    if( Number.isNaN( id ) ){
        return res.status( 400 )
            .json({ 
                error: { 
                    code: "PRODUCT_ID_INVALID", 
                    message: "Product ID is invalid." 
                }
            });
    }

    const product = mockData.find( p => p.id === id );

    if( !product ) {
        return res.status( 404 )
            .json({
                error: { 
                    code: "PRODUCT_NOT_FOUND", 
                    message: "Product not found." 
                }
            });
    }

    res.json( { data: product } );
});

export default router;