import { CreateInventarioProductoDto } from "../../../dtos/inventarios/inventario-producto/create";
import { InventarioProductoEntity } from "../../../entities/inventario-producto.entity";
import { InventarioProductoRepository } from "../../../repository/inventario-producto.repository";


export interface CreateInventarioProductoUseCase {
    execute(data: CreateInventarioProductoDto): Promise<InventarioProductoEntity>;
}

export class CreateInventarioProducto implements CreateInventarioProductoUseCase {
    constructor(private readonly inventarioRepository: InventarioProductoRepository) {}
    
    async execute(data: CreateInventarioProductoDto): Promise<InventarioProductoEntity> {
        return this.inventarioRepository.createInventario(data);
    }
}