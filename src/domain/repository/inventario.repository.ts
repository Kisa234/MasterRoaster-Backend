import { CreateInventarioDto } from "../dtos/inventario/create";
import { UpdateInventarioDto } from "../dtos/inventario/update";
import { InventarioEntity } from "../entities/inventario.entity";

export abstract class InventarioRepository {
    abstract createInventario(createInventarioDto: CreateInventarioDto): Promise<InventarioEntity>;
    abstract updateInventario(id: string, updateInventarioDto: UpdateInventarioDto): Promise<InventarioEntity>;
    abstract getInventarioById(id: string): Promise<InventarioEntity | null>;
    abstract getInventariosByProducto(id_producto: string): Promise<InventarioEntity[]>;
    abstract getAllInventarios(): Promise<InventarioEntity[]>;
    abstract deleteInventario(id: string): Promise<InventarioEntity>;
}
