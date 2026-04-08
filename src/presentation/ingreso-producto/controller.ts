import { Request, Response } from "express";
import { IngresoProductoRepository } from "../../domain/repository/ingreso-producto.repository";
import { CreateIngresoProductoDto } from "../../domain/dtos/ingreso-producto/create";
import { CreateIngresoProducto } from "../../domain/usecases/ingreso-producto/create";
import { GetIngresoProductoByAlmacen } from "../../domain/usecases/ingreso-producto/get-by-almacen";
import { GetIngresoProductoByProducto } from "../../domain/usecases/ingreso-producto/get-by-producto";
import { UpdateIngresoProductoDto } from "../../domain/dtos/ingreso-producto/update";
import { UpdateIngresoProducto } from "../../domain/usecases/ingreso-producto/update";
import { MovimientoAlmacenRepository } from "../../domain/repository/movimiento-almacen.repository";
import { InventarioProductoRepository } from "../../domain/repository/inventario-producto.repository";
import { AlmacenRepository } from "../../domain/repository/almacen.repository";

export class IngresoProductoController {

  constructor(
    private readonly ingresoRepository: IngresoProductoRepository,
    private readonly almacenRepository: AlmacenRepository,
    private readonly inventarioProductoRepository: InventarioProductoRepository,
    private readonly movimientoAlmacenRepository: MovimientoAlmacenRepository
  ) { }

  public createIngreso = (req: Request, res: Response) => {
    if (!req.user?.id_user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const [error, dto] = CreateIngresoProductoDto.create({
      ...req.body,
      id_user: req.user.id_user
    });
    if (error) return res.status(400).json({ error });
    new CreateIngresoProducto(
      this.ingresoRepository,
      this.almacenRepository,
      this.inventarioProductoRepository,
      this.movimientoAlmacenRepository

    )
      .execute(dto!)
      .then(ingreso => {res.json(ingreso)})
      .catch(err => res.status(400).json({ error: err?.message ?? String(err) }));
  };

  public getByAlmacen = async (req: Request, res: Response) => {
    try {
      const { id_almacen } = req.params;
      const ingresos =
        await new GetIngresoProductoByAlmacen(this.ingresoRepository)
          .execute(id_almacen);

      return res.json(ingresos);
    } catch (err: any) {
      return res.status(400).json({ error: err?.message ?? String(err) });
    }
  };

  public getByProducto = async (req: Request, res: Response) => {
    try {
      const { id_producto } = req.params;
      const ingresos =
        await new GetIngresoProductoByProducto(this.ingresoRepository)
          .execute(id_producto);

      return res.json(ingresos);
    } catch (err: any) {
      return res.status(400).json({ error: err?.message ?? String(err) });
    }
  };

  public updateIngreso = async (req: Request, res: Response) => {
    try {
      const { id_ingreso } = req.params;
      const [error, dto] = UpdateIngresoProductoDto.update(req.body);
      if (error) return res.status(400).json({ error });

      const ingreso =
        await new UpdateIngresoProducto(this.ingresoRepository)
          .execute(id_ingreso, dto!);

      return res.json(ingreso);
    } catch (err: any) {
      return res.status(400).json({ error: err?.message ?? String(err) });
    }
  };
}
