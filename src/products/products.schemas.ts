import { z } from 'zod';
import { type CreateProductInput } from './product.types.js';

export const CreateProductSchema = z.object({
    name: z.string().trim().min( 1, "Product name is required." ),
    price: z.number().nonnegative( "Product price must be a positive number." )
}) satisfies z.ZodType<CreateProductInput>;