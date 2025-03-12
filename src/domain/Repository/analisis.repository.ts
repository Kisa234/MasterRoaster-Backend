
export interface IAnalisisRepository {
    getById(id: string): Promise<Analisis | null>;
    getAll(): Promise<Analisis[]>;
    create(analisis: Analisis): Promise<Analisis>;
    update(id: string, analisis: Partial<Analisis>): Promise<Analisis | null>;
    delete(id: string): Promise<boolean>;
}
