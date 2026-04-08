import { CreateInsumoDto } from "../../dtos/insumo/create";
import { InsumoEntity } from "../../entities/insumo.entity";
import { InsumoRepository } from "../../repository/insumo.repository";

export class CreateInsumo {

  constructor(
    private readonly insumoRepository: InsumoRepository
  ) {}

  execute(createInsumoDto: CreateInsumoDto): Promise<InsumoEntity> {
    if (!createInsumoDto) throw new Error('createInsumoDto es requerido');
    return this.insumoRepository.createInsumo(createInsumoDto);
  }
}
