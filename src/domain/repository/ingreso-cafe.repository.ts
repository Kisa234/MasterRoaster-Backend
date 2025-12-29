import { CreateIngresoCafeDto } from "../dtos/lotes/ingreso-cafe/create";
import { IngresoCafeEntity } from "../entities/ingreso-cafe.entity";

export abstract class IngresoCafeRepository {

    abstract createIngresoCafe(createIngresoCafeDto: CreateIngresoCafeDto): Promise<IngresoCafeEntity>;

    abstract getIngresoCafeById(id: string): Promise<IngresoCafeEntity | null>;

    abstract deleteIngresoCafe(id: string): Promise<IngresoCafeEntity>;

    abstract getIngresosByLote(id_lote: string): Promise<IngresoCafeEntity[]>;
}
