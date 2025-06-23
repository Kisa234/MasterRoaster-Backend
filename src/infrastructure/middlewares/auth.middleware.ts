import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { envs } from '../../config/envs';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'Token no presente' });
  }

  try {
    const decoded = jwt.verify(token, envs.JWT_SECRET) as any;

    if (!decoded.id || !decoded.email || !decoded.rol) {
      return res.status(401).json({ message: 'Token inválido (estructura incompleta)' });
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
      rol: decoded.rol
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
