// src/presentation/notas/controller.ts
import { NotasRepository } from "../../domain/repository/notas.repository";
import { CreateNotasDto } from "../../domain/dtos/notas/create";
import { UpdateNotasDto } from "../../domain/dtos/notas/update";

export class NotasController {
  constructor(
    private readonly notasRepository: NotasRepository
  ) {}

  public createNotas = async (req: any, res: any) => {
    const [error, createNotasDto] = CreateNotasDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.notasRepository.createNotas(createNotasDto!)
      .then(nota => res.status(201).json(nota))
      .catch(error => res.status(400).json({ error }));
  }

  public getNotasById = async (req: any, res: any) => {
    const id = req.params.id;

    this.notasRepository.getNotasById(id)
      .then(nota => {
        if (!nota) return res.status(404).json({ error: 'No encontrado' });
        res.json(nota);
      })
      .catch(error => res.status(400).json({ error }));
  }

  public getAllNotas = async (_req: any, res: any) => {
    this.notasRepository.getAllNotas()
      .then(notas => res.json(notas))
      .catch(error => res.status(400).json({ error }));
  }

  public updateNotas = async (req: any, res: any) => {
    const id = req.params.id;
    const [error, updateNotasDto] = UpdateNotasDto.update(req.body);
    if (error) return res.status(400).json({ error });

    this.notasRepository.updateNotas(id, updateNotasDto!)
      .then(nota => res.json(nota))
      .catch(error => res.status(400).json({ error }));
  }

  public deleteNotas = async (req: any, res: any) => {
    const id = req.params.id;

    this.notasRepository.deleteNotas(id)
      .then(nota => res.json(nota))
      .catch(error => res.status(400).json({ error }));
  }
}
