import { Request, Response, NextFunction } from "express";
import { CreateHistorialDto } from "../../domain/dtos/historial/create";

// Cualquier clase que tenga createHistorial(dto) sirve (tu Repository o tu DataSourceImpl)
type HistorialWriter = { createHistorial: (dto: any) => Promise<any> };

type AuditOptions = {
  entidad: string;            // "Lote" | "Pedido" | "Usuario" | ...
  accion: string;             // "CREAR" | "ACTUALIZAR" | "ELIMINAR" | ...
  idParam?: string;           // nombre del param o campo body que contiene el id de la entidad (ej: "id_lote")
  comment?: (req: Request, res: Response) => string; // opcional
};

export function audit(writer: HistorialWriter, opts: AuditOptions) {
  return function (req: Request, res: Response, next: NextFunction) {
    // Identificador del usuario (ajusta si usas otro campo)
    const userId =
      (req as any).user?.id_user ||
      (req as any).user?.id ||
      "anonymous";

    // Resolvemos el ID de la entidad desde params/body
    const idEntidad =
      (opts.idParam && ((req.params as any)[opts.idParam] ?? (req.body as any)[opts.idParam])) ??
      (req.params as any).id ??
      (req.body as any).id ??
      "";

    // Registramos cuando la respuesta termine
    res.on("finish", async () => {
      try {
        const comentario = opts.comment ? opts.comment(req, res) : "";
        const [, dto] = CreateHistorialDto.create({
          entidad: opts.entidad,
          id_entidad: String(idEntidad),
          id_user: String(userId),
          accion: opts.accion,
          comentario,
          cambios: {}, // simple: sin diffs
        });
        if (dto) await writer.createHistorial(dto);
      } catch (e) {
        console.error("[audit] error creando historial:", e);
      }
    });

    next();
  };
}
