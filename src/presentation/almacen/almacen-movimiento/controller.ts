import { Request, Response } from "express";
import { CreateMovimientoAlmacenDto } from "../../../domain/dtos/almacen/movimiento-almacen/create";
import { UpdateMovimientoAlmacenDto } from "../../../domain/dtos/almacen/movimiento-almacen/update";
import { MovimientoAlmacenRepository } from "../../../domain/repository/movimiento-almacen.repository";

import { GetMovimientoAlmacenById } from "../../../domain/usecases/almacen/movimiento-almacen/get-by-id";
import { GetAllMovimientos } from "../../../domain/usecases/almacen/movimiento-almacen/get-all";
import { GetMovimientosByEntidad } from "../../../domain/usecases/almacen/movimiento-almacen/get-by-entidad";
import { GetMovimientosByAlmacen } from "../../../domain/usecases/almacen/movimiento-almacen/get-by-almacen";
import { GetMovimientosByFechaRange } from "../../../domain/usecases/almacen/movimiento-almacen/get-by-fecha-range";

import { EntidadInventario } from "../../../enums/entidad-inventario.enum";
import { TipoMovimiento } from "../../../enums/tipo-movimiento.enum";
import { CreateMovimientoAlmacen } from "../../../domain/usecases/almacen/movimiento-almacen/creates";

export class MovimientoAlmacenController {

  constructor(
    private readonly movimientoRepository: MovimientoAlmacenRepository
  ) {}

  public createMovimiento = (req: Request, res: Response) => {
    const payload = {
      ...req.body,
      id_user: (req as any).user?.id, // consistente con tu auth actual
    };

    const [error, dto] = CreateMovimientoAlmacenDto.create(payload);
    if (error) {
      return res.status(400).json({ error });
    }

    new CreateMovimientoAlmacen(this.movimientoRepository)
      .execute(dto!)
      .then(movimiento => res.json(movimiento))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public getMovimientoById = async (req: Request, res: Response) => {
    try {
      const { id_movimiento } = req.params;
      const movimiento = await new GetMovimientoAlmacenById(this.movimientoRepository)
        .execute(id_movimiento);

      if (!movimiento) {
        return res.status(404).json({ error: "Movimiento no encontrado" });
      }

      return res.json(movimiento);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public getAllMovimientos = async (req: Request, res: Response) => {
    try {
      const { from, to } = req.query as { from?: string; to?: string };

      let fromDate: Date | undefined;
      let toDate: Date | undefined;

      if (from) {
        fromDate = new Date(from);
        if (isNaN(fromDate.getTime())) {
          return res.status(400).json({ error: "Parametro 'from' inválido (YYYY-MM-DD)" });
        }
      }

      if (to) {
        toDate = new Date(to);
        if (isNaN(toDate.getTime())) {
          return res.status(400).json({ error: "Parametro 'to' inválido (YYYY-MM-DD)" });
        }
      }

      const movimientos = await new GetAllMovimientos(this.movimientoRepository)
        .execute(fromDate, toDate);

      return res.json(movimientos);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public getMovimientosByEntidad = async (req: Request, res: Response) => {
    try {
      const { entidad, id_entidad } = req.params as { entidad: string; id_entidad: string };
      const { from, to } = req.query as { from?: string; to?: string };

      const entidadEnum = entidad.toUpperCase() as EntidadInventario;

      let fromDate: Date | undefined;
      let toDate: Date | undefined;

      if (from) {
        fromDate = new Date(from);
        if (isNaN(fromDate.getTime())) {
          return res.status(400).json({ error: "Parametro 'from' inválido" });
        }
      }

      if (to) {
        toDate = new Date(to);
        if (isNaN(toDate.getTime())) {
          return res.status(400).json({ error: "Parametro 'to' inválido" });
        }
      }

      const movimientos = await new GetMovimientosByEntidad(this.movimientoRepository)
        .execute(entidadEnum, id_entidad, fromDate, toDate);

      return res.json(movimientos);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public getMovimientosByAlmacen = async (req: Request, res: Response) => {
    try {
      const { id_almacen } = req.params;
      const { from, to } = req.query as { from?: string; to?: string };

      let fromDate: Date | undefined;
      let toDate: Date | undefined;

      if (from) {
        fromDate = new Date(from);
        if (isNaN(fromDate.getTime())) {
          return res.status(400).json({ error: "Parametro 'from' inválido" });
        }
      }

      if (to) {
        toDate = new Date(to);
        if (isNaN(toDate.getTime())) {
          return res.status(400).json({ error: "Parametro 'to' inválido" });
        }
      }

      const movimientos = await new GetMovimientosByAlmacen(this.movimientoRepository)
        .execute(id_almacen, fromDate, toDate);

      return res.json(movimientos);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public getMovimientosByFechaRange = async (req: Request, res: Response) => {
    try {
      const { from, to } = req.query as { from?: string; to?: string };

      if (!from || !to) {
        return res.status(400).json({ error: "Parámetros 'from' y 'to' son requeridos" });
      }

      const fromDate = new Date(`${from}T00:00:00`);
      const toExclusive = new Date(`${to}T00:00:00`);
      toExclusive.setDate(toExclusive.getDate() + 1);

      if (isNaN(fromDate.getTime()) || isNaN(toExclusive.getTime())) {
        return res.status(400).json({ error: "Fechas inválidas (YYYY-MM-DD)" });
      }

      const movimientos = await new GetMovimientosByFechaRange(this.movimientoRepository)
        .execute(fromDate, toExclusive);

      return res.json(movimientos);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };
}
