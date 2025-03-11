import { DefectosSecundarios } from "../entities/defectosSecundarios.interface";

export interface IDefectosSecundariosRepository {
    getById(id: string): Promise<DefectosSecundarios | null>;
    getAll(): Promise<DefectosSecundarios[]>;
    create(defecto: DefectosSecundarios): Promise<DefectosSecundarios>;
    update(id: string, defecto: Partial<DefectosSecundarios>): Promise<DefectosSecundarios | null>;
    delete(id: string): Promise<boolean>;
}
