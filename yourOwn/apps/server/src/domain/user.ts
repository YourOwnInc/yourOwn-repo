export type UserId = string;

export interface User {
    id: UserId;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}