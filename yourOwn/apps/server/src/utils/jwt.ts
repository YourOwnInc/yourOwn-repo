import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET ?? "dev-secret";
export const signJwt = (payload: object) => jwt.sign(payload, SECRET, { expiresIn: "7d" });
export const verifyJwt = (token: string) => jwt.verify(token, SECRET);