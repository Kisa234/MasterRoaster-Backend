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

export class AlmacenController {

  constructor(
    private readonly almacenRepository: AlmacenRepository
  ) {}

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
}
