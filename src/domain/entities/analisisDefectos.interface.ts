import { AnalisisFisico } from "./analisisFisico.interface";
import { DefectosPrimarios } from "./defectosPrimarios.interface";
import { DefectosSecundarios } from "./defectosSecundarios.interface";

export interface AnalisisDefectos {
    id_analisis_defectos: string;
    cantidad: number;
    defectos_primarios?: DefectosPrimarios[];
    defectos_secundarios?: DefectosSecundarios[];
}