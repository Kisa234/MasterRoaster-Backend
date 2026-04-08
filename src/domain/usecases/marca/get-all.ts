import { MarcaEntity } from '../../entities/marca.entity';
import { MarcaRepository } from '../../repository/marca.repository';

export class GetAllMarca {
  constructor(private readonly marcaRepository: MarcaRepository) {}

  execute(): Promise<MarcaEntity[]> {
    return this.marcaRepository.getAll();
  }
}