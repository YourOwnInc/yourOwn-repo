import { z} from 'zod';

export const RegisterBody = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    passwordHash: z.string().min(6),
})

export type RegisterBody = z.infer<typeof RegisterBody>;

export const LoginBody = z.object({
    email: z.string().email(),
    passwordHash: z.string().min(6),
})

export type LoginBody = z.infer<typeof LoginBody>;

