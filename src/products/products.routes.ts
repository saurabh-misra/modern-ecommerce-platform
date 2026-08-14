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
    res.json( mockData );
});

router.get( '/:id', ( req, res ) => {
    const id = Number( req.params.id );

    if( Number.isNaN( id ) ){
        return res.status( 400 ).json( { status: "error", message: "Invalid request." } );
    }

    const product = mockData.find( p => p.id === id );

    if( !product ) {
        return res.status( 404 ).json({ status: "error", message: "Not found." });
    }

    res.json( product );
});

export default router;