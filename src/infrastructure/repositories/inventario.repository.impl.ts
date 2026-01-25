import { InventarioDataSource } from "../../domain/datasources/inventario.datasource";
import { CreateInventarioDto } from "../../domain/dtos/inventarios/inventario/create";
import { UpdateInventarioDto } from "../../domain/dtos/inventarios/inventario/update";
import { InventarioEntity } from "../../domain/entities/inventario.entity";
import { InventarioRepository } from "../../domain/repository/inventario.repository";

export class InventarioRepositoryImpl implements InventarioRepository {

    constructor(private dataSource: InventarioDataSource) {}
    createInventario(createInventarioDto: CreateInventarioDto): Promise<InventarioEntity> {
        return this.dataSource.createInventario(createInventarioDto);
    }
    updateInventario(id: string, updateInventarioDto: UpdateInventarioDto): Promise<InventarioEntity> {
        return this.dataSource.updateInventario(id, updateInventarioDto);
    }
    getInventarioById(id: string): Promise<InventarioEntity | null> {
        return this.dataSource.getInventarioById(id);
    }
    getInventariosByProducto(id_producto: string): Promise<InventarioEntity[]> {
        return this.dataSource.getInventariosByProducto(id_producto);
    }
    getAllInventarios(): Promise<InventarioEntity[]> {
        return this.dataSource.getAllInventarios();
    }
    deleteInventario(id: string): Promise<InventarioEntity> {
        return this.dataSource.deleteInventario(id);
    }

    
}