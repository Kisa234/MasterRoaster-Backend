import { Request, Response } from "express";
import { CreateInventarioMuestraDto } from "../../../domain/dtos/inventarios/inventario-muestra/create";
import { UpdateInventarioMuestraDto } from "../../../domain/dtos/inventarios/inventario-muestra/update";
import { InventarioMuestraRepository } from "../../../domain/repository/inventario-muestra.repository";

import { CreateInventarioMuestra } from "../../../domain/usecases/inventarios/inventario-muestra/create";
import { GetInventarioMuestraByAlmacen } from "../../../domain/usecases/inventarios/inventario-muestra/get-by-almacen";
import { GetInventarioMuestraByMuestra } from "../../../domain/usecases/inventarios/inventario-muestra/get-by-muestra";
import { UpdateInventarioMuestra } from "../../../domain/usecases/inventarios/inventario-muestra/update";

export class InventarioMuestraController {

  constructor(
    private readonly inventarioRepository: InventarioMuestraRepository
  ) {}

  public createInventario = (req: Request, res: Response) => {
    const [error, dto] = CreateInventarioMuestraDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateInventarioMuestra(this.inventarioRepository)
      .execute(dto!)
      .then(inventario => res.json(inventario))
      .catch(err => res.status(400).json({ error: err?.message ?? String(err) }));
  };

  public getByAlmacen = async (req: Request, res: Response) => {
    try {
      const { id_almacen } = req.params;
      const inventarios =
        await new GetInventarioMuestraByAlmacen(this.inventarioRepository)
          .execute(id_almacen);

      return res.json(inventarios);
    } catch (err: any) {
      return res.status(400).json({ error: err?.message ?? String(err) });
    }
  };

  public getByMuestraAndAlmacen = async (req: Request, res: Response) => {
    try {
      const { id_muestra, id_almacen } = req.params;
      const inventario =
        await new GetInventarioMuestraByMuestra(this.inventarioRepository)
          .execute(id_muestra, id_almacen);

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
      const [error, dto] = UpdateInventarioMuestraDto.update(req.body);
      if (error) return res.status(400).json({ error });

      const inventario =
        await new UpdateInventarioMuestra(this.inventarioRepository)
          .execute(id_inventario, dto!);

      return res.json(inventario);
    } catch (err: any) {
      return res.status(400).json({ error: err?.message ?? String(err) });
    }
  };
}
