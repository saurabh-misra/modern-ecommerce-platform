import z from "zod";

export const BaseErrorResponseSchema = z.object({
    error: z.object({
        code: z.string(),
        message: z.string()
    })
});

const ErrorDetailSchema = z.object({
    field: z.string(),
    message: z.string()
});

export const AppErrorResponseSchema = z.object({
    error: BaseErrorResponseSchema.shape.error.extend({
        details: z.array( ErrorDetailSchema )
    })
});

export type BaseErrorResponse = z.infer<typeof BaseErrorResponseSchema>;
export type AppErrorResponse = z.infer<typeof AppErrorResponseSchema>;