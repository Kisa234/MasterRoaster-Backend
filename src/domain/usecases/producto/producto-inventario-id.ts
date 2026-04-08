import { ProductoConInventariosEntity, ProductoEntity } from "../../entities/producto.entity";
import { ProductoRepository } from "../../repository/producto.repository";

export interface GetProductoConInventariosByIdUseCase {
  execute(id: string): Promise<ProductoConInventariosEntity | null>;
}

export class GetProductoConInventariosById implements GetProductoConInventariosByIdUseCase {
  constructor(
    private readonly productoRepository: ProductoRepository,
  ) {}

  async execute(id: string): Promise<ProductoConInventariosEntity | null> {
    return await this.productoRepository.getProductoConInventariosById(id);
  }
}