import { CreateVariedadDto } from "../dtos/variedades/create";
import { UpdateVariedadDto } from "../dtos/variedades/update";
import { VariedadEntity } from "../entities/variedad.entity";

export abstract class VariedadRepository {
    abstract createVariedad(createVariedadDto: CreateVariedadDto): Promise<VariedadEntity>;
    abstract updateVariedad(id: string, updateVariedadDto: UpdateVariedadDto): Promise<VariedadEntity>;
    abstract deleteVariedad(id: string): Promise<VariedadEntity>;
    abstract getAllVariedades(): Promise<VariedadEntity[]>;
    abstract findByNombre(nombre: string): Promise<VariedadEntity | null>;
}