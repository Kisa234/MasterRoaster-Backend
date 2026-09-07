import { MuestraConInventarioEntity } from "../../entities/muestra.entity";
import { MuestraRepository } from "../../repository/muestra.repository";

interface GetMuestrasConInventarioUseCase {
  execute(incluirEliminados?: boolean): Promise<MuestraConInventarioEntity[]>;
}

export class GetMuestrasConInventario implements GetMuestrasConInventarioUseCase {
  constructor(private readonly repository: MuestraRepository) {}

  execute(incluirEliminados: boolean = false) {
    return this.repository.getMuestrasConInventario(incluirEliminados);
  }
}