import { CreateCategoriaDto } from "../dtos/categoria/create";
import { UpdateCategoriaDto } from "../dtos/categoria/update";
import { CategoriaEntity } from "../entities/categoria.entity";

export abstract class CategoriaDataSource {
  abstract createCategoria(dto: CreateCategoriaDto): Promise<CategoriaEntity>;
  abstract getCategoriaById(id_categoria: string): Promise<CategoriaEntity | null>;
  abstract updateCategoria(id_categoria: string, dto: UpdateCategoriaDto): Promise<CategoriaEntity>;
  abstract deleteCategoria(id_categoria: string): Promise<CategoriaEntity>;
  abstract getAllCategorias(): Promise<CategoriaEntity[]>;
}