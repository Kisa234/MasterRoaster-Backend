import { tueste } from "@prisma/client";
import { Tueste } from "./tueste.interface";

export interface AnalisisSensorialRapido {
    id_analisis_rapido: string;
    fecha: Date;
    horneado: boolean;
    humo: boolean;
    uniforme: boolean;
    verde: boolean;
    arrebatado: boolean;
    oscuro: boolean;
    comentario?: string;
    tueste:tueste;
}