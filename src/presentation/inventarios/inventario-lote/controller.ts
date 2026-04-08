import { Request, Response } from "express";
import { CreateInventarioLoteDto } from "../../../domain/dtos/inventarios/inventario-lote/create";
import { UpdateInventarioLoteDto } from "../../../domain/dtos/inventarios/inventario-lote/update";
import { InventarioLoteRepository } from "../../../domain/repository/inventario-lote.repository";

import { CreateInventarioLote } from "../../../domain/usecases/inventarios/inventario-lote/create";
import { GetInventarioLoteByAlmacen } from "../../../domain/usecases/inventarios/inventario-lote/get-by-almacen";
import { GetInventarioLoteByLote } from "../../../domain/usecases/inventarios/inventario-lote/get-by-lote";
import { UpdateInventarioLote } from "../../../domain/usecases/inventarios/inventario-lote/update";

export class InventarioLoteController {

  constructor(
    private readonly inventarioRepository: InventarioLoteRepository
  ) {}

  public createInventario = (req: Request, res: Response) => {
    const [error, dto] = CreateInventarioLoteDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    new CreateInventarioLote(this.inventarioRepository)
      .execute(dto!)
      .then(inventario => res.json(inventario))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public getByAlmacen = async (req: Request, res: Response) => {
    try {
      const { id_almacen } = req.params;
      const inventarios = await new GetInventarioLoteByAlmacen(this.inventarioRepository)
        .execute(id_almacen);

      return res.json(inventarios);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public getByLoteAndAlmacen = async (req: Request, res: Response) => {
    try {
      const { id_lote, id_almacen } = req.params;
      const inventario = await new GetInventarioLoteByLote(this.inventarioRepository)
        .execute(id_lote, id_almacen);

      if (!inventario) {
        return res.status(404).json({ error: "Inventario no encontrado" });
      }

      return res.json(inventario);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public updateInventario = async (req: Request, res: Response) => {
    try {
      const { id_inventario } = req.params;
      const [error, dto] = UpdateInventarioLoteDto.update(req.body);
      if (error) {
        return res.status(400).json({ error });
      }

      const inventario = await new UpdateInventarioLote(this.inventarioRepository)
        .execute(id_inventario, dto!);

      return res.json(inventario);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };
}
