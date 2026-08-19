import { z } from 'zod';

// Validate required environment configuration and 
// coerce values into their expected runtime types during application initialization.
// This is to make sure that all the required env config exists 
// during application initialization rather than throwing errors
// after the application starts processing user requests.
const EnvSchema = z.object({
    "PORT": z.coerce.number().default( 3000 ),
    "DATABASE_URL": z.string().nonempty()
});

// Parse the `process.env` object against the env schema.
const result = EnvSchema.safeParse( process.env );

// Throw error if env config is missing or invalid.
if( !result.success ) {
    throw new Error( "Application configuration is invalid." );
}

// export validated data
export const env = result.data;