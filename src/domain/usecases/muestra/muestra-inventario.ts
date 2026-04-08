import { MuestraConInventarioEntity } from "../../entities/muestra.entity";
import { MuestraRepository } from "../../repository/muestra.repository";

interface GetMuestrasConInventarioUseCase {
  execute(): Promise<MuestraConInventarioEntity[]>;
}

export class GetMuestrasConInventario implements GetMuestrasConInventarioUseCase {

  constructor(
    private readonly repository: MuestraRepository
  ) {}

  async execute(): Promise<MuestraConInventarioEntity[]> {
    
    const muestras = await this.repository.getMuestrasConInventario();

    return muestras;

  }

}