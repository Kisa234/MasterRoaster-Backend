import { CreateInventarioProductoDto } from "../dtos/inventarios/inventario-producto/create";
import { UpdateInventarioProductoDto } from "../dtos/inventarios/inventario-producto/update";
import { InventarioProductoEntity } from "../entities/inventario-producto.entity";

export abstract class InventarioProductoDataSource {
    abstract createInventario(createInventarioDto: CreateInventarioProductoDto): Promise<InventarioProductoEntity>;
    abstract updateInventario(id: string, updateInventarioDto: UpdateInventarioProductoDto): Promise<InventarioProductoEntity>;
    abstract getInventarioById(id: string): Promise<InventarioProductoEntity | null>;
    abstract getInventariosByProducto(id_producto: string): Promise<InventarioProductoEntity[]>;
    abstract getAllInventarios(): Promise<InventarioProductoEntity[]>;
    abstract deleteInventario(id: string): Promise<InventarioProductoEntity>;
}
