import { IngresoInsumoRepository } from "../../repository/ingreso-insumo.repository";

export class GetIngresoInsumoByAlmacen {
  constructor(
    private readonly ingresoRepository: IngresoInsumoRepository,
  ) {}

  execute(id_almacen: string) {
    return this.ingresoRepository.getByAlmacen(id_almacen);
  }
}