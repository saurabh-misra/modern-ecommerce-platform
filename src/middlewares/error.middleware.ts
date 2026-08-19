import type { NextFunction, Request, Response } from "express";
import AppError from "../errors/app-error.js";

export const errorHandler = ( err: any, req: Request, res: Response, next: NextFunction ) => {
    // 1. If this is an OPERATIONAL AppError, then format and return it
    if( err instanceof AppError ) {
        return res.status( err.statusCode ).json({
            error: {
                code: err.code,
                message: err.message,
                details: err.details
            }
        });
    }

    // 2. If this is an unexpected failure error, then log it and return generic 500 response.
    console.error( "Unexpected error: ", err );
    return res.status( 500 ).json({
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred on the server."
        }
    });
}