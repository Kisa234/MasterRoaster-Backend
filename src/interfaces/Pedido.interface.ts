export interface Pedido {
    id_pedido: string;
    id_usuario: string;
    id_lote?: string;
    fecha_pedido: Date;
    tipo_tueste: string;
    cantidad: number;
    estado_pedido: string;
    observaciones?: string;
}