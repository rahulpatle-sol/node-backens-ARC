import { z, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: result.error.issues[0].message
            });
        }
        req.body = result.data;
        next();
    };
};

// User schema
export const userSchema = z.object({
    name: z.string().min(2, 'Name min 2 chars'),
    email: z.string().email('Valid email required'),
    password: z.string().min(6, 'Password min 6 chars')
});