import { User } from "../domain/user";
import crypto from "node:crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
const users = new Map<string, User>();

/*
export interface UserRepo {
  create(u: Omit<User,"id"|"createdAt"|"updatedAt">): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
  */

export async function createUser(sessionId: string ) {
  // creates a user object with the session
  const user = await prisma.user.create({
    data: {
      sessions: {
        connect: [{id: sessionId}], // connect exisitng session by its id 
      },
      // TODO: connect profile when developed 

    } 
  })

  if(!user ){
    throw new Error(" error creating user in repo")
  }
  return user;
}

