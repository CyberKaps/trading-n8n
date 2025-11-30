import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET!;

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'] as string;
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(authHeader, JWT_SECRET) as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token invalid" });
    }
}