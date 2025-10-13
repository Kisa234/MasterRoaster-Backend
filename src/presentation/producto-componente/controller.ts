import { Request, Response } from "express";
import { CreateProductoComponenteDto } from "../../domain/dtos/producto-componente/create";
import { UpdateProductoComponenteDto } from "../../domain/dtos/producto-componente/update";
import { ProductoComponenteRepository } from "../../domain/repository/producto-componente.repository";

export class ProductoComponenteController {
  constructor(private readonly repository: ProductoComponenteRepository) {}

  public createComponente = async (req: Request, res: Response) => {
    const [error, dto] = CreateProductoComponenteDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.repository.createComponente(dto!)
      .then(pc => res.status(201).json(pc))
      .catch(error => res.status(400).json({ error }));
  };

  public updateComponente = async (req: Request, res: Response) => {
    const { id_combo, id_producto } = req.params;
    const [error, dto] = UpdateProductoComponenteDto.update(req.body);
    if (error) return res.status(400).json({ error });

    this.repository.updateComponente(id_combo, id_producto, dto!)
      .then(pc => res.json(pc))
      .catch(error => res.status(400).json({ error }));
  };

  public deleteComponente = async (req: Request, res: Response) => {
    const { id_combo, id_producto } = req.params;
    this.repository.deleteComponente(id_combo, id_producto)
      .then(pc => res.json(pc))
      .catch(error => res.status(400).json({ error }));
  };
}
