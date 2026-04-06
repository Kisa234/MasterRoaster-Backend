import { Request, Response } from "express";

import { CreateInsumoDto } from "../../domain/dtos/insumo/create";
import { UpdateInsumoDto } from "../../domain/dtos/insumo/update";
import { InsumoRepository } from "../../domain/repository/insumo.repository";

import { CreateInsumo } from "../../domain/usecases/insumo/create";
import { GetInsumoById } from "../../domain/usecases/insumo/get-by-id";
import { GetAllInsumos } from "../../domain/usecases/insumo/get-all";
import { GetInsumosActivos } from "../../domain/usecases/insumo/get-activos";
import { UpdateInsumo } from "../../domain/usecases/insumo/update";
import { DeleteInsumo } from "../../domain/usecases/insumo/delete";
import { GetInsumosConInventarios } from "../../domain/usecases/insumo/insumo-inventario";
import { GetInsumoConInventariosById } from "../../domain/usecases/insumo/insumo-inventario-id";

export class InsumoController {

  constructor(
    private readonly insumoRepository: InsumoRepository
  ) { }

  public createInsumo = (req: Request, res: Response) => {

    const [error, dto] = CreateInsumoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateInsumo(this.insumoRepository)
      .execute(dto!)
      .then(insumo => res.json(insumo))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public getInsumoById = async (req: Request, res: Response) => {
    const { id_insumo } = req.params;
    new GetInsumoById(this.insumoRepository)
      .execute(id_insumo)
      .then(insumo => res.json(insumo))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public getAllInsumos = async (_req: Request, res: Response) => {
    new GetAllInsumos(this.insumoRepository)
      .execute()
      .then(insumos => res.json(insumos))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public getInsumosActivos = async (_req: Request, res: Response) => {
    new GetInsumosActivos(this.insumoRepository)
      .execute()
      .then(insumos => res.json(insumos))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public updateInsumo = async (req: Request, res: Response) => {
    const { id_insumo } = req.params;
    const [error, dto] = UpdateInsumoDto.update(req.body);
    if (error) return res.status(400).json({ error });
    new UpdateInsumo(this.insumoRepository)
      .execute(id_insumo, dto!)
      .then(insumo => res.json(insumo))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public deleteInsumo = async (req: Request, res: Response) => {
    const { id_insumo } = req.params;
    new DeleteInsumo(this.insumoRepository)
      .execute(id_insumo)
      .then(insumo => res.json(insumo))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public getInsumosConInventarios = async (_req: Request, res: Response) => {
    new GetInsumosConInventarios(this.insumoRepository)
      .execute()
      .then(insumos => res.json(insumos))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  }

  public getInsumoConInventariosById = async (req: Request, res: Response) => {
    const { id_insumo } = req.params;
    new GetInsumoConInventariosById(this.insumoRepository)
      .execute(id_insumo)
      .then(insumo => res.json(insumo))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  }
}
