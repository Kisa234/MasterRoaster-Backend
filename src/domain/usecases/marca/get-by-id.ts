import { MarcaEntity } from '../../entities/marca.entity';
import { MarcaRepository } from '../../repository/marca.repository';

export class GetMarcaById {
  constructor(private readonly marcaRepository: MarcaRepository) {}

  execute(id_marca: string): Promise<MarcaEntity | null> {
    if (!id_marca) throw new Error('id_marca es requerido');
    return this.marcaRepository.getById(id_marca);
  }
}