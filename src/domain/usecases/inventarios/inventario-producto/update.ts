import { UpdateInventarioProductoDto } from "../../../dtos/inventarios/inventario-producto/update";
import { InventarioProductoEntity } from "../../../entities/inventario-producto.entity";
import { InventarioProductoRepository } from "../../../repository/inventario-producto.repository";


export interface UpdateInventarioProductoUseCase {
    execute(id: string, data: UpdateInventarioProductoDto): Promise<InventarioProductoEntity | null>;
}

export class UpdateInventarioProducto implements UpdateInventarioProductoUseCase {
    constructor(private readonly inventarioRepository: InventarioProductoRepository) {}

    async execute(id: string, data: UpdateInventarioProductoDto): Promise<InventarioProductoEntity | null> {
        return this.inventarioRepository.updateInventario(id, data);
    }
}