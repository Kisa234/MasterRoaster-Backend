import { InventarioProductoDataSource } from "../../domain/datasources/inventario-producto.datasource";
import { CreateInventarioProductoDto } from "../../domain/dtos/inventarios/inventario-producto/create";
import { UpdateInventarioProductoDto } from "../../domain/dtos/inventarios/inventario-producto/update";
import { InventarioProductoEntity } from "../../domain/entities/inventario-producto.entity";
import { InventarioProductoRepository } from "../../domain/repository/inventario-producto.repository";

export class InventarioProductoRepositoryImpl implements InventarioProductoRepository {

    constructor(private dataSource: InventarioProductoDataSource) {}
    createInventario(createInventarioDto: CreateInventarioProductoDto): Promise<InventarioProductoEntity> {
        return this.dataSource.createInventario(createInventarioDto);
    }
    updateInventario(id: string, updateInventarioDto: UpdateInventarioProductoDto): Promise<InventarioProductoEntity> {
        return this.dataSource.updateInventario(id, updateInventarioDto);
    }
    getInventarioById(id: string): Promise<InventarioProductoEntity | null> {
        return this.dataSource.getInventarioById(id);
    }
    getInventariosByProducto(id_producto: string): Promise<InventarioProductoEntity[]> {
        return this.dataSource.getInventariosByProducto(id_producto);
    }
    getAllInventarios(): Promise<InventarioProductoEntity[]> {
        return this.dataSource.getAllInventarios();
    }
    deleteInventario(id: string): Promise<InventarioProductoEntity> {
        return this.dataSource.deleteInventario(id);
    }

    
}