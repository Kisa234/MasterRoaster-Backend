import { Request, Response } from "express";
import { InventarioRepository } from "../../domain/repository/inventario.repository";
import { CreateInventarioDto } from "../../domain/dtos/inventario/create";
import { UpdateInventarioDto } from "../../domain/dtos/inventario/update";

import { CreateInventario } from "../../domain/usecases/inventario/create";
import { GetInventarioById } from "../../domain/usecases/inventario/get-by-id";
import { UpdateInventario } from "../../domain/usecases/inventario/update";
import { DeleteInventario } from "../../domain/usecases/inventario/delete";
import { GetAllInventario } from "../../domain/usecases/inventario/get-all";


export class InventarioController {
  constructor(private readonly inventarioRepository: InventarioRepository) {}

  public createInventario = async (req: Request, res: Response) => {
    const [error, dto] = CreateInventarioDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateInventario(this.inventarioRepository)
      .execute(dto!)
      .then(inv => res.status(201).json(inv))
      .catch(error => res.status(400).json({ error }));
  };

  public getInventarioById = async (req: Request, res: Response) => {
    const { id } = req.params;

    new GetInventarioById(this.inventarioRepository)
      .execute(id)
      .then(inv => {
        if (!inv) return res.status(404).json({ error: "No encontrado" });
        res.json(inv);
      })
      .catch(error => res.status(400).json({ error }));
  };

  public getAllInventarios = async (_req: Request, res: Response) => {
    new GetAllInventario(this.inventarioRepository)
      .execute()
      .then(inv => res.json(inv))
      .catch(error => res.status(400).json({ error }));
  };

  public updateInventario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateInventarioDto.update(req.body);
    if (error) return res.status(400).json({ error });

    new UpdateInventario(this.inventarioRepository)
      .execute(id, dto!)
      .then(inv => res.json(inv))
      .catch(error => res.status(400).json({ error }));
  };

  public deleteInventario = async (req: Request, res: Response) => {
    const { id } = req.params;

    new DeleteInventario(this.inventarioRepository)
      .execute(id)
      .then(inv => res.json(inv))
      .catch(error => res.status(400).json({ error }));
  };
}
