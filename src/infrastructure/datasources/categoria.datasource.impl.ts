import { prisma } from "../../data/postgres";
import { CategoriaDataSource } from "../../domain/datasources/categoria.datasource";
import { CreateCategoriaDto } from "../../domain/dtos/categoria/create";
import { UpdateCategoriaDto } from "../../domain/dtos/categoria/update";
import { CategoriaEntity } from "../../domain/entities/categoria.entity";

export class CategoriaDataSourceImpl implements CategoriaDataSource {

  async createCategoria(dto: CreateCategoriaDto): Promise<CategoriaEntity> {
    const categoria = await prisma.categoria.create(
      { data: dto }
    );
    return CategoriaEntity.fromObject(categoria);
  }

  async getCategoriaById(id: string): Promise<CategoriaEntity | null> {
    const categoria = await prisma.categoria.findUnique({
      where: { id_categoria: id },
    });
    if (!categoria || categoria.eliminado) return null;
    return CategoriaEntity.fromObject(categoria);
  }

  async updateCategoria(id: string, dto: UpdateCategoriaDto): Promise<CategoriaEntity> {
    const categoria = await this.getCategoriaById(id);
    if (!categoria) throw new Error("No existe la categoría");

    const updated = await prisma.categoria.update({
      where: { id_categoria: id },
      data: { ...dto.values, eliminado: false },
    });

    return CategoriaEntity.fromObject(updated);
  }

  async deleteCategoria(id: string): Promise<CategoriaEntity> {
    const categoria = await this.getCategoriaById(id);
    if (!categoria) throw new Error("No existe la categoría");

    const deleted = await prisma.categoria.update({
      where: { id_categoria: id },
      data: { eliminado: true },
    });

    return CategoriaEntity.fromObject(deleted);
  }

  async getAllCategorias(): Promise<CategoriaEntity[]> {
    const categorias = await prisma.categoria.findMany();
    return categorias.map(c => CategoriaEntity.fromObject(c));
  }
}
