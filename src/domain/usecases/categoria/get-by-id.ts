import { CategoriaEntity } from "../../entities/categoria.entity";
import { CategoriaRepository } from "../../repository/categoria.repository";

export interface GetCategoriaByIdUseCase {
  execute(id: string): Promise<CategoriaEntity | null>;
}

export class GetCategoriaById implements GetCategoriaByIdUseCase {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async execute(id: string): Promise<CategoriaEntity | null> {
    return this.categoriaRepository.getCategoriaById(id);
  }
}
