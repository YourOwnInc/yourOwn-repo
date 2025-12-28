import { z } from 'zod';

export const RegisterBody = z.object({
    sessionId: z.uuid()
    /*
    email: z.email(),
    name: z.string().min(1),
    passwordHash: z.string().min(6),
    */
})

export type RegisterBody = z.infer<typeof RegisterBody>;

export const LoginBody = z.object({
    email: z.email(),
    passwordHash: z.string().min(6),
})

export type LoginBody = z.infer<typeof LoginBody>;

