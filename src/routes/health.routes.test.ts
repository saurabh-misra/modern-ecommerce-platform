import { describe, it, expect } from 'vitest'
import request from 'supertest';
import app from '../app.js';

describe( 'GET /health', () => {
    it( 'should return 200 OK with status OK', async () => {
        const response = await request( app )
            .get( '/health' )
            .expect( 200 )
            .expect( 'Content-Type', /json/ );

        expect( response.body ).toEqual({ status: "ok" });
    });
});