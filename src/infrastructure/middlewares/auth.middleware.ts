import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { envs } from '../../config/envs';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  try {
    const decoded = jwt.verify(token, envs.JWT_SECRET);
    req.user = decoded as { id: string; email: string; rol: string };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
