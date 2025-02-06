export interface Lote {
    id_lote: string;
    productor: string;
    finca: string;
    region: string;
    departamento: string;
    variedad: string;
    fecha_compra: Date;
    peso: number;
    id_usuario?: string;
    estado: string;
}