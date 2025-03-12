

export interface IAnalisisFisicoRepository {
    getById(id: string): Promise<AnalisisFisico | null>;
    getAll(): Promise<AnalisisFisico[]>;
    create(analisis: AnalisisFisico): Promise<AnalisisFisico>;
    update(id: string, analisis: Partial<AnalisisFisico>): Promise<AnalisisFisico | null>;
    delete(id: string): Promise<boolean>;
}