import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../data/postgres';

export const checkPermission = (permissionCode: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user; // JwtPayload | undefined

      // 1️⃣ No autenticado
      if (!user) {
        return res.status(401).json({
          message: 'No autenticado',
        });
      }

      // 2️⃣ Sin rol
      if (!user.rolId) {
        return res.status(403).json({
          message: 'Usuario sin rol asignado',
        });
      }

      // 3️⃣ Validar permiso
      const permiso = await prisma.rolPermiso.findFirst({
        where: {
          id_rol: user.rolId,
          permiso: {
            codigo: permissionCode,
          },
        },
        select: {
          id_permiso: true,
        },
      });

      if (!permiso) {
        return res.status(403).json({
          message: 'No tienes permiso para esta acción',
          permissionRequired: permissionCode,
        });
      }

      // 4️⃣ OK
      next();
    } catch (error) {
      console.error('Permission middleware error:', error);
      return res.status(500).json({
        message: 'Error validando permisos',
      });
    }
  };
};
