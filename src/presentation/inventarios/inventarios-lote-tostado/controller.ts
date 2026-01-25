import { Request, Response } from "express";
import { CreateInventarioLoteTostadoDto } from "../../../domain/dtos/inventarios/inventario-lote-tostado/create";
import { UpdateInventarioLoteTostadoDto } from "../../../domain/dtos/inventarios/inventario-lote-tostado/update";
import { InventarioLoteTostadoRepository } from "../../../domain/repository/inventario-lote-tostado.repository";

import { CreateInventarioLoteTostado } from "../../../domain/usecases/inventarios/inventario-lote-tostado/create";
import { GetInventarioLoteTostadoByAlmacen } from "../../../domain/usecases/inventarios/inventario-lote-tostado/get-by-almacen";
import { GetInventarioLoteTostadoByLote } from "../../../domain/usecases/inventarios/inventario-lote-tostado/get-by-lote-tostado";
import { UpdateInventarioLoteTostado } from "../../../domain/usecases/inventarios/inventario-lote-tostado/update";

export class InventarioLoteTostadoController {

  constructor(
    private readonly inventarioRepository: InventarioLoteTostadoRepository
  ) {}

  public createInventario = (req: Request, res: Response) => {
    const [error, dto] = CreateInventarioLoteTostadoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateInventarioLoteTostado(this.inventarioRepository)
      .execute(dto!)
      .then(inventario => res.json(inventario))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public getByAlmacen = async (req: Request, res: Response) => {
    try {
      const { id_almacen } = req.params;
      const inventarios =
        await new GetInventarioLoteTostadoByAlmacen(this.inventarioRepository)
          .execute(id_almacen);

      return res.json(inventarios);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public getByLoteTostadoAndAlmacen = async (req: Request, res: Response) => {
    try {
      const { id_lote_tostado, id_almacen } = req.params;

      const inventario =
        await new GetInventarioLoteTostadoByLote(this.inventarioRepository)
          .execute(id_lote_tostado, id_almacen);

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
      const [error, dto] = UpdateInventarioLoteTostadoDto.update(req.body);
      if (error) return res.status(400).json({ error });

      const inventario =
        await new UpdateInventarioLoteTostado(this.inventarioRepository)
          .execute(id_inventario, dto!);

      return res.json(inventario);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };
}
