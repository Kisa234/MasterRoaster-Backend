import { CreateMarcaDto } from '../../dtos/marca/create';
import { MarcaEntity } from '../../entities/marca.entity';
import { MarcaRepository } from '../../repository/marca.repository';

export class CreateMarca {
  constructor(private readonly marcaRepository: MarcaRepository) {}

  execute(dto: CreateMarcaDto): Promise<MarcaEntity> {
    if (!dto) throw new Error('CreateMarcaDto es requerido');
    return this.marcaRepository.create(dto);
  }
}