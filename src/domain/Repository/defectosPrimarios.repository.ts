import { DefectosPrimarios } from "../interfaces/defectosPrimarios.interface";

export interface IDefectosPrimariosRepository {
    getById(id: string): Promise<DefectosPrimarios | null>;
    getAll(): Promise<DefectosPrimarios[]>;
    create(defecto: DefectosPrimarios): Promise<DefectosPrimarios>;
    update(id: string, defecto: Partial<DefectosPrimarios>): Promise<DefectosPrimarios | null>;
    delete(id: string): Promise<boolean>;
}
