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

export class InsumoController {

  constructor(
    private readonly insumoRepository: InsumoRepository
  ) {}

  public createInsumo = (req: Request, res: Response) => {

    const [error, dto] = CreateInsumoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateInsumo(this.insumoRepository)
      .execute(dto!)
      .then(insumo => res.json(insumo))
      .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
  };

  public getInsumoById = async (req: Request, res: Response) => {
    try {
      const { id_insumo } = req.params;

      const insumo = await new GetInsumoById(this.insumoRepository)
        .execute(id_insumo);

      if (!insumo) {
        return res.status(404).json({ error: "Insumo no encontrado" });
      }

      return res.json(insumo);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public getAllInsumos = async (_req: Request, res: Response) => {
    try {
      const insumos = await new GetAllInsumos(this.insumoRepository).execute();
      return res.json(insumos);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public getInsumosActivos = async (_req: Request, res: Response) => {
    try {
      const insumos = await new GetInsumosActivos(this.insumoRepository).execute();
      return res.json(insumos);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public updateInsumo = async (req: Request, res: Response) => {
    try {
      const { id_insumo } = req.params;

      const [error, dto] = UpdateInsumoDto.update(req.body);
      if (error) return res.status(400).json({ error });

      const insumo = await new UpdateInsumo(this.insumoRepository)
        .execute(id_insumo, dto!);

      return res.json(insumo);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };

  public deleteInsumo = async (req: Request, res: Response) => {
    try {
      const { id_insumo } = req.params;

      const insumo = await new DeleteInsumo(this.insumoRepository)
        .execute(id_insumo);

      return res.json(insumo);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? String(error) });
    }
  };
}
