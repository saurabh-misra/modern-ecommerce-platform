export default class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly details: any[];

    constructor( statusCode: number, code: string, message: string, details: any[] ) {
        super( message );
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;

        // Backwards compatibility with older JS versions.
        // Fix broken prototype chain.
        Object.setPrototypeOf( this, new.target.prototype );

        // Remove the AppError constructor from stack trace.
        Error.captureStackTrace( this, this.constructor );
    }
}