import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { envs } from '../../config/envs';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 1) Extraemos el header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no presente' });
  }

  // 2) Separamos "Bearer" del token
  const token = authHeader.split(' ')[1];

  try {
    // 3) Verificamos y decodificamos
    const decoded = jwt.verify(token, envs.JWT_SECRET) as any;

    if (!decoded.id || !decoded.email || !decoded.rol) {
      return res.status(401).json({ message: 'Token inválido (estructura incompleta)' });
    }

    // 4) Inyectamos el usuario en la request
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
