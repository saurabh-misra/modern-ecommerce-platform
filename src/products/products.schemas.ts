import { z } from 'zod';

export const CreateProductSchema = z.object({
    name: z.string().trim().min( 1, "Product name is required." ),
    price: z.number().nonnegative( "Product price must be a positive number." )
});
export type CreateProductInput = z.infer<typeof CreateProductSchema>;

export const ProductResponseSchema = z.object({
    data: z.object({
        id: z.uuid(),
        name: z.string(),
        price: z.number()
    })
});
export type ProductResponse = z.infer<typeof ProductResponseSchema>;