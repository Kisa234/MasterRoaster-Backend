import { UpdateCategoriaDto } from "../../dtos/categoria/update";
import { CategoriaEntity } from "../../entities/categoria.entity";
import { CategoriaRepository } from "../../repository/categoria.repository";

export interface UpdateCategoriaUseCase {
  execute(id: string, data: UpdateCategoriaDto): Promise<CategoriaEntity | null>;
}

export class UpdateCategoria implements UpdateCategoriaUseCase {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async execute(id: string, data: UpdateCategoriaDto): Promise<CategoriaEntity | null> {
    return this.categoriaRepository.updateCategoria(id, data);
  }
}
