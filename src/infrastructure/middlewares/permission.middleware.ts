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

      const permiso = await prisma.permiso.findUnique({
        where: {
          codigo: permissionCode,
        },
      });

      // validar que el permiso exista 

      if (!permiso) {
        return res.status(500).json({
          message: 'Permiso no existe en la base de datos',
          permissionCode,
        });
      }

      // Validar permiso
      const rol_permiso = await prisma.rolPermiso.findFirst({
        where: {
          id_rol: user.rolId,
          id_permiso:  permiso.id_permiso
          
      }});

      if (!rol_permiso) {
        return res.status(403).json({
          message: 'No tienes permiso para esta acción',
          permissionRequired: permissionCode,
        });
      }

      next();
    } catch (error) {
      console.error('Permission middleware error:', error);
      return res.status(500).json({
        message: 'Error validando permisos',
      });
    }
  };
};
