export interface Muestra {
    id_muestra: string;
    id_usuario: string;
    proveedor: string;
    nombre_muestra: string;
    variedad: string;
    id_lote?: string;
    fecha_registro: Date;
    id_analisis: string;
}