import { CreateProductoDto } from "../../../dtos/producto/producto/create";
import { ProductoEntity } from "../../../entities/producto.entity";
import { LoteRepository } from "../../../repository/lote.repository";
import { ProductoRepository } from "../../../repository/producto.repository";
import { UserRepository } from "../../../repository/user.repository";

export interface CreateProductoUseCase {
  execute(dto: CreateProductoDto): Promise<ProductoEntity>;
}

export class CreateProducto implements CreateProductoUseCase {
  constructor(
    private readonly productoRepository: ProductoRepository,
    private readonly loteRepository: LoteRepository,
    private readonly userRepository: UserRepository,
  ) { }

  async execute(dto: CreateProductoDto): Promise<ProductoEntity> {
    const idLote = dto.id_lote ? dto.id_lote : null;

    if (idLote) {
      const lote = await this.loteRepository.getLoteById(idLote);

      if (!lote || (lote as any).eliminado) {
        throw new Error("El lote indicado no existe o está eliminado");
      }

      const rol = await this.userRepository.getRole(lote.id_user!);
      
      if(rol != 'admin'){
        throw new Error('El admin no le pertenece a Fortunato')
      }

    }

    const producto = await this.productoRepository.createProducto(dto);
    return producto;
  }
}
