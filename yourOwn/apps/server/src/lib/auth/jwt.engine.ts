import jwt from 'jsonwebtoken';
import { z } from 'zod';



const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me ';


// Validate paylod schema 

export const JwtPayloadSchema = z.object({
    sub: z.string().uuid(),
    sessionId: z.string().uuid(),
    userId: z.string().uuid().optional(), // place holder for 3rd service auth id ( goodgle , github, etc)
    email: z.string().email().optional(),
    role: z.enum(['GUEST','USER', 'ADMIN'])   
});
export type JwtPayload = z.infer<typeof JwtPayloadSchema>;




export class JwtEngine {
    // Function to Create the JWT token 
    static sign(payload: JwtPayload): string {
        return jwt.sign(payload, SECRET, { algorithm: 'HS256' });
    }

    // fucntion to Verify the JWT token
    static verify(token: string ): JwtPayload {
        const decoded = jwt.verify(token, SECRET, { algorithms: ['HS256'] });
        // extract session id and role from the decoded token
        console.log('Decoded JWT payload:', decoded);
        
        return JwtPayloadSchema.parse(decoded);
    }
}

