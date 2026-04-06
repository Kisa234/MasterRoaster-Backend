import { Request, Response } from "express";
import { InventarioProductoRepository } from "../../../domain/repository/inventario-producto.repository";
import { CreateInventarioProductoDto } from "../../../domain/dtos/inventarios/inventario-producto/create";
import { UpdateInventarioProductoDto } from "../../../domain/dtos/inventarios/inventario-producto/update";
import { CreateInventarioProducto } from "../../../domain/usecases/inventarios/inventario-producto/create";
import { GetInventarioProductoById } from "../../../domain/usecases/inventarios/inventario-producto/get-by-id";
import { GetAllInventarioProducto } from "../../../domain/usecases/inventarios/inventario-producto/get-all";
import { UpdateInventarioProducto } from "../../../domain/usecases/inventarios/inventario-producto/update";
import { DeleteInventarioProducto } from "../../../domain/usecases/inventarios/inventario-producto/delete";
import { GetInventarioProductoByProductoAndAlmacen } from "../../../domain/usecases/inventarios/inventario-producto/get-by-producto-and-almacen";




export class InventarioProductoController {
  constructor(private readonly inventarioRepository: InventarioProductoRepository) { }

  public createInventario = async (req: Request, res: Response) => {
    const [error, dto] = CreateInventarioProductoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateInventarioProducto(this.inventarioRepository)
      .execute(dto!)
      .then(inv => res.status(201).json(inv))
      .catch(error => res.status(400).json({ error }));
  };

  public getInventarioById = async (req: Request, res: Response) => {
    const { id } = req.params;

    new GetInventarioProductoById(this.inventarioRepository)
      .execute(id)
      .then(inv => {
        if (!inv) return res.status(404).json({ error: "No encontrado" });
        res.json(inv);
      })
      .catch(error => res.status(400).json({ error }));
  };

  public getAllInventarios = async (_req: Request, res: Response) => {
    new GetAllInventarioProducto(this.inventarioRepository)
      .execute()
      .then(inv => res.json(inv))
      .catch(error => res.status(400).json({ error }));
  };

  public updateInventario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateInventarioProductoDto.update(req.body);
    if (error) return res.status(400).json({ error });

    new UpdateInventarioProducto(this.inventarioRepository)
      .execute(id, dto!)
      .then(inv => res.json(inv))
      .catch(error => res.status(400).json({ error }));
  };

  public deleteInventario = async (req: Request, res: Response) => {
    const { id } = req.params;

    new DeleteInventarioProducto(this.inventarioRepository)
      .execute(id)
      .then(inv => res.json(inv))
      .catch(error => res.status(400).json({ error }));
  };

  getByProductoAndAlmacen = (req: Request, res: Response) => {
    const { id_producto, id_almacen } = req.params;
    const { gramaje, molienda } = req.query;

    new GetInventarioProductoByProductoAndAlmacen(this.inventarioRepository)
      .execute(
        id_producto,
        id_almacen,
        gramaje ? Number(gramaje) : null,
        molienda as any
      )
      .then(data => res.json(data))
      .catch(error => res.status(400).json({ error }));
  };
}
