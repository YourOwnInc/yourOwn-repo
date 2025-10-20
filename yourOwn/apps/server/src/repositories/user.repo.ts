import { User } from "../domain/user";
import crypto from "node:crypto";

const users = new Map<string, User>();

export interface UserRepo {
  create(u: Omit<User,"id"|"createdAt"|"updatedAt">): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

export function makeInMemoryUserRepo(): UserRepo {
  return {
    async create(u) {
      const id = crypto.randomUUID();
      const now = new Date();
      const user: User = { id, createdAt: now, updatedAt: now, ...u };
      users.set(id, user);
      return user;
    },
    async findByEmail(email) {
      for (const u of users.values()) if (u.email === email) return u;
      return null;
    },
    async findById(id) {
      return users.get(id) ?? null;
    }
  };
}


