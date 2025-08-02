import { CreateVariedadDto } from "../../domain/dtos/variedades/create";
import { UpdateVariedadDto } from "../../domain/dtos/variedades/update";
import { VariedadRepository } from "../../domain/repository/variedad.repository";
import { Request, Response } from 'express';
import { CreateVariedad } from "../../domain/usecases/variedad/create-variedad";
import { UpdateVariedad } from "../../domain/usecases/variedad/update-variedad";
import { DeleteVariedad } from "../../domain/usecases/variedad/delete-variedad";
import { GetAllVariedad } from "../../domain/usecases/variedad/get-all-variedad";
import { GetVariedadByNombre } from "../../domain/usecases/variedad/get-varieda-by-nombre";


export class VariedadController {

  constructor(
    private readonly variedadRepository: VariedadRepository
  ) { }

  public createVariedad = async (req: Request, res: Response) => {
    const [error, createVariedadDto] = CreateVariedadDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    new CreateVariedad(this.variedadRepository)
      .execute(createVariedadDto!)
      .then(variedad => res.json(variedad))
      .catch(error => res.status(400).json({ error }));
  }

  public updateVariedad = async (req: Request, res: Response) => {
    const [error, updateVariedadDto] = UpdateVariedadDto.update(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    new UpdateVariedad(this.variedadRepository)
      .execute(req.params.id, updateVariedadDto!)
      .then(variedad => res.json(variedad))
      .catch(error => res.status(400).json({ error }));
  }
  public deleteVariedad = async (req: Request, res: Response) => {
    new DeleteVariedad(this.variedadRepository)
      .execute(req.params.id)
      .then(variedad => res.json(variedad))
      .catch(error => res.status(400).json({ error }));
  }
  public getAllVariedades = async (req: Request, res: Response) => {
    new GetAllVariedad(this.variedadRepository)
      .execute()
      .then(variedades => res.json(variedades))
      .catch(error => res.status(400).json({ error }));
  }
  public getVariedadByNombre = async (req: Request, res: Response) => {
    new GetVariedadByNombre(this.variedadRepository)
      .execute(req.params.nombre)
      .then(variedad => {
        if (!variedad) {
          return res.status(404).json({ error: "Variedad not found" });
        }
        res.json(variedad);
      })
      .catch(error => res.status(400).json({ error }));
  }
}