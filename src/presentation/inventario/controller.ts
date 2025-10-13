import { Request, Response } from "express";
import { InventarioRepository } from "../../domain/repository/inventario.repository";
import { CreateInventarioDto } from "../../domain/dtos/inventario/create";
import { UpdateInventarioDto } from "../../domain/dtos/inventario/update";

export class InventarioController {
  constructor(private readonly inventarioRepository: InventarioRepository) {}

  public createInventario = async (req: Request, res: Response) => {
    const [error, createInventarioDto] = CreateInventarioDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.inventarioRepository.createInventario(createInventarioDto!)
      .then(inventario => res.status(201).json(inventario))
      .catch(error => res.status(400).json({ error }));
  };

  public getInventarioById = async (req: Request, res: Response) => {
    const id = req.params.id;
    this.inventarioRepository.getInventarioById(id)
      .then(inv => {
        if (!inv) return res.status(404).json({ error: "No encontrado" });
        res.json(inv);
      })
      .catch(error => res.status(400).json({ error }));
  };

  public getAllInventarios = async (_req: Request, res: Response) => {
    this.inventarioRepository.getAllInventarios()
      .then(inv => res.json(inv))
      .catch(error => res.status(400).json({ error }));
  };

  public updateInventario = async (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateInventarioDto] = UpdateInventarioDto.update(req.body);
    if (error) return res.status(400).json({ error });

    this.inventarioRepository.updateInventario(id, updateInventarioDto!)
      .then(inv => res.json(inv))
      .catch(error => res.status(400).json({ error }));
  };

  public deleteInventario = async (req: Request, res: Response) => {
    const id = req.params.id;
    this.inventarioRepository.deleteInventario(id)
      .then(inv => res.json(inv))
      .catch(error => res.status(400).json({ error }));
  };
}
