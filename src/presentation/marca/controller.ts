import { Request, Response } from 'express';

import { MarcaRepository } from '../../domain/repository/marca.repository';
import { GetAllMarca } from '../../domain/usecases/marca/get-all';
import { GetMarcaById } from '../../domain/usecases/marca/get-by-id';
import { CreateMarcaDto } from '../../domain/dtos/marca/create';
import { CreateMarca } from '../../domain/usecases/marca/create';
import { UpdateMarcaDto } from '../../domain/dtos/marca/update';
import { UpdateMarca } from '../../domain/usecases/marca/update';
import { DeleteMarca } from '../../domain/usecases/marca/delete';

export class MarcaController {
  constructor(private readonly marcaRepository: MarcaRepository) {}

  getAll = async (_req: Request, res: Response) => {
    try {
      const usecase = new GetAllMarca(this.marcaRepository);
      const marcas = await usecase.execute();
      return res.json(marcas);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id_marca } = req.params;

      const usecase = new GetMarcaById(this.marcaRepository);
      const marca = await usecase.execute(id_marca);

      if (!marca) return res.status(404).json({ message: 'Marca no encontrada' });

      return res.json(marca);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const [error, dto] = CreateMarcaDto.create(req.body);
      if (error) return res.status(400).json({ message: error });

      const usecase = new CreateMarca(this.marcaRepository);
      const created = await usecase.execute(dto!);

      return res.status(201).json(created);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id_marca } = req.params;

      const [error, dto] = UpdateMarcaDto.update(req.body);
      if (error) return res.status(400).json({ message: error });

      const usecase = new UpdateMarca(this.marcaRepository);
      const updated = await usecase.execute(id_marca, dto!);

      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id_marca } = req.params;

      const usecase = new DeleteMarca(this.marcaRepository);
      const deleted = await usecase.execute(id_marca);

      return res.json(deleted);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
}