import { CreateProductoComponenteDto } from "../dtos/producto-componente/create";
import { UpdateProductoComponenteDto } from "../dtos/producto-componente/update";
import { ProductoComponenteEntity } from "../entities/productoComponente.entity";

export abstract class ProductoComponenteRepository {
    abstract createComponente(createDto: CreateProductoComponenteDto): Promise<ProductoComponenteEntity>;
    abstract updateComponente(id_combo: string, id_producto: string, updateDto: UpdateProductoComponenteDto): Promise<ProductoComponenteEntity>;
    abstract getComponentesByCombo(id_combo: string): Promise<ProductoComponenteEntity[]>;
    abstract getComponente(id_combo: string, id_producto: string): Promise<ProductoComponenteEntity | null>;
    abstract deleteComponente(id_combo: string, id_producto: string): Promise<ProductoComponenteEntity>;
}
