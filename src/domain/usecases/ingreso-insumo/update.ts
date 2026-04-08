import { UpdateIngresoInsumoDto } from '../../dtos/ingreso-insumo/update';
import { IngresoInsumoRepository } from '../../repository/ingreso-insumo.repository';

export class UpdateIngresoInsumo {
  constructor(
    private readonly ingresoRepository: IngresoInsumoRepository,
  ) {}

  execute(id_ingreso: string, dto: UpdateIngresoInsumoDto) {
    return this.ingresoRepository.updateIngreso(id_ingreso, dto);
  }
}