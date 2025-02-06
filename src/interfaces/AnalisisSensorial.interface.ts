export interface AnalisisSensorial {
    id_analisis_sensorial: string;
    id_muestra?: string;
    id_lote?: string;
    id_analisis?: string;
    fecha_analisis: Date;
    fragancia_aroma: number;
    sabor: number;
    sabor_residual: number;
    acidez: number;
    cuerpo: number;
    uniformidad: number;
    balance: number;
    taza_limpia: number;
    dulzor: number;
    puntaje_catador: number;
    tazas_defecto_ligero: number;
    tazas_defecto_rechazo: number;
    notas: string;
}