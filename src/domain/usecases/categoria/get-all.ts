import { CategoriaEntity } from "../../entities/categoria.entity";
import { CategoriaRepository } from "../../repository/categoria.repository";

export interface GetAllCategoriasUseCase {
  execute(): Promise<CategoriaEntity[]>;
}

export class GetAllCategorias implements GetAllCategoriasUseCase {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async execute(): Promise<CategoriaEntity[]> {
    return this.categoriaRepository.getAllCategorias();
  }
}
