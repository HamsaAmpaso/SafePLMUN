import {  z } from 'zod';
export const resolveRequestSchema = z.object({
     requestId: z.string().min(1),
     userId: z.string().min(1)
});