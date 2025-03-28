import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envs } from "../../config/envs";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token; // Obtener token de la cookie

    if (!token) {
        return res.status(401).json({ error: "Acceso no autorizado. No hay token." });
    }

    try {
        const decoded = jwt.verify(token, envs.JWT_SECRET) as { userId: string; email: string; rol: string };
        req.user = decoded; // Guardamos los datos del usuario en `req.user`
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido o expirado." });
    }
};
