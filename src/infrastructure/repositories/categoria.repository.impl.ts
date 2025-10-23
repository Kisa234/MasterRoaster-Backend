import { CategoriaRepository } from "../../domain/repository/categoria.repository";
import { CategoriaDataSource } from "../../domain/datasources/categoria.datasource";
import { CreateCategoriaDto } from "../../domain/dtos/categoria/create";
import { UpdateCategoriaDto } from "../../domain/dtos/categoria/update";
import { CategoriaEntity } from "../../domain/entities/categoria.entity";

export class CategoriaRepositoryImpl implements CategoriaRepository {
  constructor(private readonly dataSource: CategoriaDataSource) {}

  async createCategoria(dto: CreateCategoriaDto): Promise<CategoriaEntity> {
    return this.dataSource.createCategoria(dto);
  }

  async getCategoriaById(id_categoria: string): Promise<CategoriaEntity | null> {
    return this.dataSource.getCategoriaById(id_categoria);
  }

  async updateCategoria(id_categoria: string, dto: UpdateCategoriaDto): Promise<CategoriaEntity> {
    return this.dataSource.updateCategoria(id_categoria, dto);
  }

  async deleteCategoria(id_categoria: string): Promise<CategoriaEntity> {
    return this.dataSource.deleteCategoria(id_categoria);
  }

  async getAllCategorias(): Promise<CategoriaEntity[]> {
    return this.dataSource.getAllCategorias();
  }
}
