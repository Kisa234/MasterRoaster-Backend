import { Request, Response } from "express";

import { CreateAlmacenDto } from "../../../domain/dtos/almacen/almacen/create";

import { CreateAlmacen } from "../../../domain/usecases/almacen/almacen/create";
import { GetAlmacenById } from "../../../domain/usecases/almacen/almacen/get-by-id";
import { GetAllAlmacenes } from "../../../domain/usecases/almacen/almacen/get-all";
import { UpdateAlmacen } from "../../../domain/usecases/almacen/almacen/update";
import { DeleteAlmacen } from "../../../domain/usecases/almacen/almacen/delete";
import { GetAlmacenesActivos } from "../../../domain/usecases/almacen/almacen/get-active";
import { UpdateAlmacenDto } from "../../../domain/dtos/almacen/almacen/update";
import { AlmacenRepository } from "../../../domain/repository/almacen.repository";
import { InventarioInsumoRepository } from "../../../domain/repository/inventario-insumo.repository";
import { InventarioProductoRepository } from "../../../domain/repository/inventario-producto.repository";
import { InventarioMuestraRepository } from "../../../domain/repository/inventario-muestra.repository";
import { InventarioLoteTostadoRepository } from "../../../domain/repository/inventario-lote-tostado.repository";
import { InventarioLoteRepository } from "../../../domain/repository/inventario-lote.repository";
import { MovimientoAlmacenRepository } from "../../../domain/repository/movimiento-almacen.repository";
import { HistorialRepository } from "../../../domain/repository/historial.repository";
import { AjustarStockAlmacenDto } from "../../../domain/dtos/almacen/almacen/ajustar-stock";
import { TrasladarStockAlmacenDto } from "../../../domain/dtos/almacen/almacen/trasladar-stock";
import { AjustarStockAlmacen } from "../../../domain/usecases/almacen/almacen/ajustar-stock";
import { TrasladarStockAlmacen } from "../../../domain/usecases/almacen/almacen/trasladar-stock";

export class AlmacenController {

  constructor(
    private readonly almacenRepository: AlmacenRepository,
    private readonly historialRepository: HistorialRepository,
    private readonly movimientoAlmacenRepository: MovimientoAlmacenRepository,
    private readonly inventarioLoteRepository: InventarioLoteRepository,
    private readonly inventarioLoteTostadoRepository: InventarioLoteTostadoRepository,
    private readonly inventarioMuestraRepository: InventarioMuestraRepository,
    private readonly inventarioProductoRepository: InventarioProductoRepository,
    private readonly inventarioInsumoRepository: InventarioInsumoRepository,
  ) { }

  public createAlmacen = (req: Request, res: Response) => {

    const [error, dto] = CreateAlmacenDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateAlmacen(this.almacenRepository)
      .execute(dto!)
      .then(almacen => res.json(almacen))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public getAlmacenById = async (req: Request, res: Response) => {
    try {
      const { id_almacen } = req.params;

      const almacen = await new GetAlmacenById(this.almacenRepository)
        .execute(id_almacen);

      if (!almacen) {
        return res.status(404).json({ error: "Almacen no encontrado" });
      }

      return res.json(almacen);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public getAllAlmacenes = async (_req: Request, res: Response) => {
    try {
      const almacenes = await new GetAllAlmacenes(this.almacenRepository).execute();
      return res.json(almacenes);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public getAlmacenesActivos = async (_req: Request, res: Response) => {
    try {
      const almacenes = await new GetAlmacenesActivos(this.almacenRepository).execute();
      return res.json(almacenes);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public updateAlmacen = async (req: Request, res: Response) => {
    try {
      const { id_almacen } = req.params;

      const [error, dto] = UpdateAlmacenDto.update(req.body);
      if (error) return res.status(400).json({ error });

      const almacen = await new UpdateAlmacen(this.almacenRepository)
        .execute(id_almacen, dto!);

      return res.json(almacen);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public deleteAlmacen = async (req: Request, res: Response) => {
    try {
      const { id_almacen } = req.params;

      const almacen = await new DeleteAlmacen(this.almacenRepository)
        .execute(id_almacen);

      return res.json(almacen);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };


  public ajustarStock = (req: Request, res: Response) => {
    const [error, ajustarStockDto] = AjustarStockAlmacenDto.create({
      ...req.body,
      id_user: req.body.id_user ?? req.body.user?.id_user ?? req.body.userId,
    });

    if (error) return res.status(400).json({ error });

    new AjustarStockAlmacen(
      this.almacenRepository,
      this.historialRepository,
      this.movimientoAlmacenRepository,
      this.inventarioLoteRepository,
      this.inventarioLoteTostadoRepository,
      this.inventarioMuestraRepository,
      this.inventarioProductoRepository,
      this.inventarioInsumoRepository
    )
      .execute(ajustarStockDto!)
      .then(() => res.json({ message: "Stock ajustado correctamente" }))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));

  };

  public trasladarStock = (req: Request, res: Response) => {
    const [error, trasladarStockDto] = TrasladarStockAlmacenDto.create({
      ...req.body,
      id_user: req.body.id_user ?? req.body.user?.id_user ?? req.body.userId,
    });

    if (error) return res.status(400).json({ error });

    new TrasladarStockAlmacen(
      this.almacenRepository,
      this.historialRepository,
      this.movimientoAlmacenRepository,
      this.inventarioLoteRepository,
      this.inventarioLoteTostadoRepository,
      this.inventarioMuestraRepository,
      this.inventarioProductoRepository,
      this.inventarioInsumoRepository
    )
      .execute(trasladarStockDto!)
      .then(() => res.json({ message: "Stock trasladado correctamente" }))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));

  };
}

