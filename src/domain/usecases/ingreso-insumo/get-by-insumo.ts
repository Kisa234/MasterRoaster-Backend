import { IngresoInsumoRepository } from '../../repository/ingreso-insumo.repository';

export class GetIngresoInsumoByInsumo {
  constructor(
    private readonly ingresoRepository: IngresoInsumoRepository,
  ) {}

  execute(id_insumo: string) {
    return this.ingresoRepository.getByInsumo(id_insumo);
  }
}