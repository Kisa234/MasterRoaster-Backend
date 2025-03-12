import { MuestraEntity } from "../entities/muestra.entity";

export abstract class MuestraRepository {
    abstract createMuestra(muestra: MuestraEntity): Promise<MuestraEntity>;
    abstract getMuestraById(id: string): Promise<MuestraEntity | null>;
    abstract updateMuestra(id: string, data: Partial<MuestraEntity>): Promise<MuestraEntity>;
    abstract deleteMuestra(id: string): Promise<void>;
}