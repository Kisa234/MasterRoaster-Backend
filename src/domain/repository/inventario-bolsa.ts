import { CreateInventarioBolsaDto } from "../dtos/inventarios/inventario-bolsa/create";
import { UpdateInventarioBolsaDto } from "../dtos/inventarios/inventario-bolsa/update";
import { InventarioBolsaEntity } from "../entities/inventarioBolsa.entity";

export abstract class InventarioBolsaRepository {
    abstract createInventario(dto: CreateInventarioBolsaDto): Promise<InventarioBolsaEntity>;
    abstract updateInventario(id_inventario: string, dto: UpdateInventarioBolsaDto): Promise<InventarioBolsaEntity>;
    abstract getByBolsaAndAlmacen(id_bolsa: string, id_almacen: string): Promise<InventarioBolsaEntity | null>;
    abstract getByAlmacen(id_almacen: string): Promise<InventarioBolsaEntity[]>;
    abstract getByBolsa(id_bolsa: string): Promise<InventarioBolsaEntity[]>;
    abstract getAllInventarios(): Promise<InventarioBolsaEntity[]>;
}