import { Request, Response } from "express";
import { IngresoInsumoRepository } from "../../domain/repository/ingreso-insumo.repository";
import { CreateIngresoInsumoDto } from "../../domain/dtos/ingreso-insumo/create";
import { GetIngresoInsumoByAlmacen } from "../../domain/usecases/ingreso-insumo/get-by-almacen";
import { GetIngresoInsumoByInsumo } from "../../domain/usecases/ingreso-insumo/get-by-insumo";
import { UpdateIngresoInsumoDto } from "../../domain/dtos/ingreso-insumo/update";
import { UpdateIngresoInsumo } from "../../domain/usecases/ingreso-insumo/update";
import { MovimientoAlmacenRepository } from "../../domain/repository/movimiento-almacen.repository";
import { InventarioInsumoRepository } from "../../domain/repository/inventario-insumo.repository";
import { AlmacenRepository } from "../../domain/repository/almacen.repository";
import { CreateIngresoInsumo } from "../../domain/usecases/ingreso-insumo/create";

export class IngresoInsumoController {

  constructor(
    private readonly ingresoRepository: IngresoInsumoRepository,
    private readonly almacenRepository: AlmacenRepository,
    private readonly inventarioInsumoRepository: InventarioInsumoRepository,
    private readonly movimientoAlmacenRepository: MovimientoAlmacenRepository
  ) {}

  public createIngreso = (req: Request, res: Response) => {
    if (!req.user?.id_user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const [error, dto] = CreateIngresoInsumoDto.create({
      ...req.body,
      id_user: req.user.id_user
    });


    if (error) return res.status(400).json({ error });

    new CreateIngresoInsumo(
      this.ingresoRepository,
      this.almacenRepository,
      this.inventarioInsumoRepository,
      this.movimientoAlmacenRepository
    )
      .execute(dto!)
      .then(ingreso => res.json(ingreso))
      .catch(err => res.status(400).json({ error: err?.message ?? String(err) }));
  };

  public getByAlmacen = async (req: Request, res: Response) => {
    try {
      const { id_almacen } = req.params;
      const ingresos =
        await new GetIngresoInsumoByAlmacen(this.ingresoRepository)
          .execute(id_almacen);

      return res.json(ingresos);
    } catch (err: any) {
      return res.status(400).json({ error: err?.message ?? String(err) });
    }
  };

  public getByInsumo = async (req: Request, res: Response) => {
    try {
      const { id_insumo } = req.params;
      const ingresos =
        await new GetIngresoInsumoByInsumo(this.ingresoRepository)
          .execute(id_insumo);

      return res.json(ingresos);
    } catch (err: any) {
      return res.status(400).json({ error: err?.message ?? String(err) });
    }
  };

  public updateIngreso = async (req: Request, res: Response) => {
    try {
      const { id_ingreso } = req.params;
      const [error, dto] = UpdateIngresoInsumoDto.update(req.body);
      if (error) return res.status(400).json({ error });

      const ingreso =
        await new UpdateIngresoInsumo(this.ingresoRepository)
          .execute(id_ingreso, dto!);

      return res.json(ingreso);
    } catch (err: any) {
      return res.status(400).json({ error: err?.message ?? String(err) });
    }
  };
}