import { InventarioBolsaDataSource } from "../../domain/datasources/inventario-bolsa";
import { CreateInventarioBolsaDto } from "../../domain/dtos/inventarios/inventario-bolsa/create";
import { UpdateInventarioBolsaDto } from "../../domain/dtos/inventarios/inventario-bolsa/update";
import { InventarioBolsaEntity } from "../../domain/entities/inventarioBolsa.entity";
import { InventarioBolsaRepository } from "../../domain/repository/inventario-bolsa.repository";

export class InventarioBolsaRepositoryImpl implements InventarioBolsaRepository {

    constructor(
        private readonly datasource: InventarioBolsaDataSource
    ) { }

    createInventario(dto: CreateInventarioBolsaDto): Promise<InventarioBolsaEntity> {
        return this.datasource.createInventario(dto);
    }

    updateInventario(id_inventario: string, dto: UpdateInventarioBolsaDto): Promise<InventarioBolsaEntity> {
        return this.datasource.updateInventario(id_inventario, dto);
    }

    getByBolsaAndAlmacen(id_bolsa: string, id_almacen: string): Promise<InventarioBolsaEntity | null> {
        return this.datasource.getByBolsaAndAlmacen(id_bolsa, id_almacen);
    }

    getByAlmacen(id_almacen: string): Promise<InventarioBolsaEntity[]> {
        return this.datasource.getByAlmacen(id_almacen);
    }

    getByBolsa(id_bolsa: string): Promise<InventarioBolsaEntity[]> {
        return this.datasource.getByBolsa(id_bolsa);
    }

    getAllInventarios(): Promise<InventarioBolsaEntity[]> {
        return this.datasource.getAllInventarios();
    }
}
