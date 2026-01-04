import { Request, Response } from "express";
import { IngresoCafeRepository } from "../../domain/repository/ingreso-cafe.repository";
import { CreateIngresoCafeDto } from "../../domain/dtos/lotes/ingreso-cafe/create";
import { CreateIngresoCafe } from "../../domain/usecases/lote/ingreso-cafe/create-ingreso-cafe";
import { GetIngresoCafe } from "../../domain/usecases/lote/ingreso-cafe/get-ingreso-cafe";
import { GetAllIngresosCafe } from "../../domain/usecases/lote/ingreso-cafe/et-all-ingresos-cafe";
import { GetIngresosByLote } from "../../domain/usecases/lote/ingreso-cafe/get-ingresos-by-lote";
import { DeleteIngresoCafe } from "../../domain/usecases/lote/ingreso-cafe/delete-ingreso-cafe";


export class IngresoCafeController {

  constructor(
    private readonly ingresoCafeRepository: IngresoCafeRepository
  ) {}

  public createIngresoCafe = async (req: Request, res: Response) => {
    const [error, dto] = CreateIngresoCafeDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateIngresoCafe(this.ingresoCafeRepository)
      .execute(dto!)
      .then(ingreso => res.status(201).json(ingreso))
      .catch(error => res.status(400).json({ error }));
  };

  public getIngresoCafeById = async (req: Request, res: Response) => {
    const { id } = req.params;

    new GetIngresoCafe(this.ingresoCafeRepository)
      .execute(id)
      .then(ingreso => {
        if (!ingreso) return res.status(404).json({ error: "No encontrado" });
        res.json(ingreso);
      })
      .catch(error => res.status(400).json({ error }));
  };

  public getAllIngresosCafe = async (_req: Request, res: Response) => {
    new GetAllIngresosCafe(this.ingresoCafeRepository)
      .execute()
      .then(ingresos => res.json(ingresos))
      .catch(error => res.status(400).json({ error }));
  };

  public getIngresosByLote = async (req: Request, res: Response) => {
    const { id_lote } = req.params;

    new GetIngresosByLote(this.ingresoCafeRepository)
      .execute(id_lote)
      .then(ingresos => res.json(ingresos))
      .catch(error => res.status(400).json({ error }));
  };

  public deleteIngresoCafe = async (req: Request, res: Response) => {
    const { id } = req.params;

    new DeleteIngresoCafe(this.ingresoCafeRepository)
      .execute(id)
      .then(ingreso => res.json(ingreso))
      .catch(error => res.status(400).json({ error }));
  };
}
