import { Request, Response, NextFunction } from 'express';

export interface AuditContext {
  entidad: string;
  accion: string;
}

export const auditMiddleware =
  (entidad: string, accion: string) =>
  (req: Request, _res: Response, next: NextFunction) => {

    req.auditContext = {
      entidad,
      accion,
    };

    next();
  };
