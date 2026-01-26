import { Request, Response } from "express";
import { CreateInventarioInsumoDto } from "../../../domain/dtos/inventarios/inventario-insumo/create";
import { UpdateInventarioInsumoDto } from "../../../domain/dtos/inventarios/inventario-insumo/update";
import { InventarioInsumoRepository } from "../../../domain/repository/inventario-insumo.repository";

import { CreateInventarioInsumo } from "../../../domain/usecases/inventarios/inventario-insumo/create";
import { GetInventarioInsumoByAlmacen } from "../../../domain/usecases/inventarios/inventario-insumo/get-by-almacen";
import { GetInventarioInsumoByInsumo } from "../../../domain/usecases/inventarios/inventario-insumo/get-by-insumo";
import { UpdateInventarioInsumo } from "../../../domain/usecases/inventarios/inventario-insumo/update";

export class InventarioInsumoController {

  constructor(
    private readonly inventarioRepository: InventarioInsumoRepository
  ) {}

  public createInventario = (req: Request, res: Response) => {
    const [error, dto] = CreateInventarioInsumoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateInventarioInsumo(this.inventarioRepository)
      .execute(dto!)
      .then(inventario => res.json(inventario))
      .catch(err => res.status(400).json({ error: err?.message ?? String(err) }));
  };

  public getByAlmacen = async (req: Request, res: Response) => {
    try {
      const { id_almacen } = req.params;
      const inventarios =
        await new GetInventarioInsumoByAlmacen(this.inventarioRepository)
          .execute(id_almacen);

      return res.json(inventarios);
    } catch (err: any) {
      return res.status(400).json({ error: err?.message ?? String(err) });
    }
  };

  public getByInsumoAndAlmacen = async (req: Request, res: Response) => {
    try {
      const { id_insumo, id_almacen } = req.params;
      const inventario =
        await new GetInventarioInsumoByInsumo(this.inventarioRepository)
          .execute(id_insumo, id_almacen);

      if (!inventario) {
        return res.status(404).json({ error: "Inventario no encontrado" });
      }

      return res.json(inventario);
    } catch (err: any) {
      return res.status(400).json({ error: err?.message ?? String(err) });
    }
  };

  public updateInventario = async (req: Request, res: Response) => {
    try {
      const { id_inventario } = req.params;
      const [error, dto] = UpdateInventarioInsumoDto.update(req.body);
      if (error) return res.status(400).json({ error });

      const inventario =
        await new UpdateInventarioInsumo(this.inventarioRepository)
          .execute(id_inventario, dto!);

      return res.json(inventario);
    } catch (err: any) {
      return res.status(400).json({ error: err?.message ?? String(err) });
    }
  };
}
