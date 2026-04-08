import { prisma } from "../../data/postgres";
import { CategoriaInsumoEntity } from '../../domain/entities/categoria-insumo.entity';
import { CreateCategoriaInsumoDto } from '../../domain/dtos/categoria-insumo/create';
import { UpdateCategoriaInsumoDto } from '../../domain/dtos/categoria-insumo/update';
import { CategoriaInsumoDatasource } from '../../domain/datasources/categoria-insumo.datasource';


export class CategoriaInsumoDatasourceImpl implements CategoriaInsumoDatasource {

  async create(dto: CreateCategoriaInsumoDto): Promise<CategoriaInsumoEntity> {
    const created = await prisma.categoriaInsumo.create({
      data: { nombre: dto.nombre },
    });
    return CategoriaInsumoEntity.fromObject(created);
  }

  async getAll(): Promise<CategoriaInsumoEntity[]> {
    const items = await prisma.categoriaInsumo.findMany({
      orderBy: { nombre: 'asc' },
    });
    return items.map(CategoriaInsumoEntity.fromObject);
  }

  async getById(id_categoria: string): Promise<CategoriaInsumoEntity | null> {
    const item = await prisma.categoriaInsumo.findUnique({
      where: { id_categoria },
    });
    return item ? CategoriaInsumoEntity.fromObject(item) : null;
  }

  async update(id_categoria: string, dto: UpdateCategoriaInsumoDto): Promise<CategoriaInsumoEntity> {
    const updated = await prisma.categoriaInsumo.update({
      where: { id_categoria },
      data: {
        ...(dto.nombre !== undefined ? { nombre: dto.nombre } : {}),
        ...(dto.activo !== undefined ? { activo: dto.activo } : {}),
      },
    });
    return CategoriaInsumoEntity.fromObject(updated);
  }

  async delete(id_categoria: string): Promise<CategoriaInsumoEntity> {
    const deleted = await prisma.categoriaInsumo.update({
      where: { id_categoria },
      data: { activo: false },
    });
    return CategoriaInsumoEntity.fromObject(deleted);
  }
}