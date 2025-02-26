import { Lote } from "../interfaces/lote.interface";

export interface ILoteRepository {
    getById(id: string): Promise<Lote | null>;
    getAll(): Promise<Lote[]>;
    create(lote: Lote): Promise<Lote>;
    update(id: string, lote: Partial<Lote>): Promise<Lote | null>;
    delete(id: string): Promise<boolean>;
}
