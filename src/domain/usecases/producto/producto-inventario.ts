import { ProductoConInventariosEntity, ProductoEntity } from "../../entities/producto.entity";
import { ProductoRepository } from "../../repository/producto.repository";

export interface GetProductosConInventariosUseCase {
  execute(): Promise<ProductoConInventariosEntity[]>;
}

export class GetProductosConInventarios implements GetProductosConInventariosUseCase {
  constructor(
    private readonly productoRepository: ProductoRepository,
  ) {}

  async execute(): Promise<ProductoConInventariosEntity[]> {
    return await this.productoRepository.getProductosConInventarios();
  }
}