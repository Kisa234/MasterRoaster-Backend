import { AnalisisFisico } from "./analisisFisico.interface";
import { AnalisisSensorial } from "./analisisSensorial.interface";
import { Lote } from "./lote.interface";
import { Muestra } from "./muestra.interface";

export interface Analisis {
    id_analisis: string;
    lote?: Lote;
    analisis_fisico: AnalisisFisico;
    analisis_sensorial: AnalisisSensorial;
    muestra?: Muestra;
}