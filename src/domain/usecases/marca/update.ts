import { UpdateMarcaDto } from '../../dtos/marca/update';
import { MarcaEntity } from '../../entities/marca.entity';
import { MarcaRepository } from '../../repository/marca.repository';

export class UpdateMarca {
  constructor(private readonly marcaRepository: MarcaRepository) {}

  execute(id_marca: string, dto: UpdateMarcaDto): Promise<MarcaEntity> {
    if (!id_marca) throw new Error('id_marca es requerido');
    if (!dto) throw new Error('UpdateMarcaDto es requerido');
    return this.marcaRepository.update(id_marca, dto);
  }
}