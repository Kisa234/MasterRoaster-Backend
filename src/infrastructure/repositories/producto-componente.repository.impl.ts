import { ProductoComponenteDataSource } from "../../domain/datasources/productoComponente.datasource";
import { CreateProductoComponenteDto } from "../../domain/dtos/producto-componente/create";
import { UpdateProductoComponenteDto } from "../../domain/dtos/producto-componente/update";
import { ProductoComponenteEntity } from "../../domain/entities/productoComponente.entity";
import { ProductoComponenteRepository } from "../../domain/repository/producto-componente.repository";

export class ProductoComponenteRepositoryImpl implements ProductoComponenteRepository {
    constructor(private dataSource: ProductoComponenteDataSource) {}
    createComponente(createDto: CreateProductoComponenteDto): Promise<ProductoComponenteEntity> {
        return this.dataSource.createComponente(createDto);
    }
    updateComponente(id_combo: string, id_producto: string, updateDto: UpdateProductoComponenteDto): Promise<ProductoComponenteEntity> {
        return this.dataSource.updateComponente(id_combo, id_producto, updateDto);
    }
    getComponentesByCombo(id_combo: string): Promise<ProductoComponenteEntity[]> {
        return this.dataSource.getComponentesByCombo(id_combo);
    }
    getComponente(id_combo: string, id_producto: string): Promise<ProductoComponenteEntity | null> {
        return this.dataSource.getComponente(id_combo, id_producto);
    }
    deleteComponente(id_combo: string, id_producto: string): Promise<ProductoComponenteEntity> {
        return this.dataSource.deleteComponente(id_combo, id_producto);
    }
}