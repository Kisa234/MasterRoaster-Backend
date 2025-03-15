import { CreateMuestraDto } from "../dtos/muestra/create";
import { UpdateMuestraDto } from "../dtos/muestra/update";
import { MuestraEntity } from "../entities/muestra.entity";

export abstract class MuestraRepository {
    abstract createMuestra(createMuestraDto:CreateMuestraDto): Promise<MuestraEntity>;
    abstract getMuestraById(id: string): Promise<MuestraEntity | null>;
    abstract updateMuestra(id: string, updateMuestraDto:UpdateMuestraDto): Promise<MuestraEntity>;
    abstract deleteMuestra(id: string): Promise<MuestraEntity>;
}