import { sign } from "crypto";
import { User } from "../domain/user";
//import { UserRepo } from "../repositories/user.repo";
import { LoginBody, RegisterBody } from "../schemas/user.schema";
//import { hashPasword } from "../utils/hash-password";
import * as repo from "../repositories/user.repo";
import { setServers } from "dns";

//import {signJwt} from 

export async function register(input: RegisterBody) {
    // create a usre 
    const sessionId = input.sessionId
    const user = await repo.createUser(sessionId);
    return user;

}
/*
export function makeUserService() {
    // return to get functions that controller will use
    return {
        async register(input: RegisterBody): Promise<{user: User; token: string }> {
            const existing = await repo.findByEmail(input.email);
            if(existing){
                throw new Error('User already exists');
            }
            //const passwordHash = await hashPassword(input.passwordHash);
            const newUser = await repo.

            //const token = signJwt({ userId: newUser.id });
            return {
                user: newUser,
                token: 'some-token'
            };
        },
        async login(email: string, password: string) {
                const user = await repo.findByEmail(email);
                if (!user || !user.passwordHash) throw new Error("BAD_CREDENTIALS");
                //const ok = await verifyPassword(password, user.passwordHash);
               // if (!ok) throw new Error("BAD_CREDENTIALS");
                //const token = signJwt({ sub: user.id });
                return { user, token: 'some-token' };
            },

        async currentUser(id: string) {
                return repo.findById(id);
            }
        }

    }
        */


