import { CreateInventarioDto } from "../dtos/inventarios/inventario/create";
import { UpdateInventarioDto } from "../dtos/inventarios/inventario/update";
import { InventarioEntity } from "../entities/inventario.entity";

export abstract class InventarioDataSource {
    abstract createInventario(createInventarioDto: CreateInventarioDto): Promise<InventarioEntity>;
    abstract updateInventario(id: string, updateInventarioDto: UpdateInventarioDto): Promise<InventarioEntity>;
    abstract getInventarioById(id: string): Promise<InventarioEntity | null>;
    abstract getInventariosByProducto(id_producto: string): Promise<InventarioEntity[]>;
    abstract getAllInventarios(): Promise<InventarioEntity[]>;
    abstract deleteInventario(id: string): Promise<InventarioEntity>;
}
