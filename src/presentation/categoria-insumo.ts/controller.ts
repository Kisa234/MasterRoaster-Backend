import { Request, Response } from 'express';
import { CategoriaInsumoRepository } from '../../domain/repository/categoria-insumo.repository';
import { CreateCategoriaInsumoDto } from '../../domain/dtos/categoria-insumo/create';
import { UpdateCategoriaInsumoDto } from '../../domain/dtos/categoria-insumo/update';

export class CategoriaInsumoController {
  constructor(private readonly repo: CategoriaInsumoRepository) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const data = await this.repo.getAll();
      return res.json(data);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id_categoria } = req.params;
      const item = await this.repo.getById(id_categoria);
      if (!item) return res.status(404).json({ message: 'Categoría no encontrada' });
      return res.json(item);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const [error, dto] = CreateCategoriaInsumoDto.create(req.body);
      if (error) return res.status(400).json({ message: error });

      const created = await this.repo.create(dto!);
      return res.status(201).json(created);
    } catch (e: any) {
      // Prisma unique (nombre unique) típico: P2002
      return res.status(400).json({ message: e.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id_categoria } = req.params;
      const [error, dto] = UpdateCategoriaInsumoDto.update(req.body);
      if (error) return res.status(400).json({ message: error });

      const updated = await this.repo.update(id_categoria, dto!);
      return res.json(updated);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id_categoria } = req.params;
      const deleted = await this.repo.delete(id_categoria);
      return res.json(deleted);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  };
}