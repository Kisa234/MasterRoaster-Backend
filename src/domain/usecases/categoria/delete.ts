import { CategoriaEntity } from "../../entities/categoria.entity";
import { CategoriaRepository } from "../../repository/categoria.repository";

export interface DeleteCategoriaUseCase {
  execute(id: string): Promise<CategoriaEntity>;
}

export class DeleteCategoria implements DeleteCategoriaUseCase {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async execute(id: string): Promise<CategoriaEntity> {
    return this.categoriaRepository.deleteCategoria(id);
  }
}
