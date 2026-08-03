import { PaqueteConItemsEntity } from "./paquete.entity";
import { DireccionEnvioEntity } from "./direccion-envio.entity";
import { TransportistaEntity } from "./transportista.entity";

export class EnvioEntity {
    constructor(
        public id_envio: string,
        public numero_correlativo: string,
        public id_paquete: string,
        public estado: string,   // EstadoEnvio
        public eliminado: boolean,
        public fecha_registro: Date,
        public registrado_por_id: string,
        public id_transportista?: string | null,
        public numero_tracking?: string | null,
        public costo_envio?: number | null,
        public quien_paga?: string | null,
        public peso_total_kg?: number | null,
        public alto_cm?: number | null,
        public ancho_cm?: number | null,
        public largo_cm?: number | null,
        public fecha_programada?: Date | null,
        public fecha_despacho_real?: Date | null,
        public fecha_entrega_estimada?: Date | null,
        public fecha_entrega_real?: Date | null,
        public despachado_por_id?: string | null,
        public entregado_por_id?: string | null,
        public cancelado_por_id?: string | null,
        public comentario_cancelacion?: string | null,
    ) { }

    public static fromObject(obj: { [key: string]: any }): EnvioEntity {
        const {
            id_envio, numero_correlativo, id_paquete, estado, eliminado, fecha_registro,
            registrado_por_id, id_transportista, numero_tracking, costo_envio, quien_paga,
            peso_total_kg, alto_cm, ancho_cm, largo_cm, fecha_programada, fecha_despacho_real,
            fecha_entrega_estimada, fecha_entrega_real, despachado_por_id, entregado_por_id,
            cancelado_por_id, comentario_cancelacion,
        } = obj;

        if (!id_envio) throw new Error('id_envio property is required');
        if (!numero_correlativo) throw new Error('numero_correlativo property is required');
        if (!id_paquete) throw new Error('id_paquete property is required');
        if (!registrado_por_id) throw new Error('registrado_por_id property is required');

        const newFecha = new Date(fecha_registro);
        if (isNaN(newFecha.getTime())) throw new Error('fecha_registro no es válida');

        return new EnvioEntity(
            id_envio, numero_correlativo, id_paquete,
            estado ?? 'PENDIENTE', eliminado ?? false, newFecha,
            registrado_por_id,
            id_transportista ?? null, numero_tracking ?? null, costo_envio ?? null, quien_paga ?? null,
            peso_total_kg ?? null, alto_cm ?? null, ancho_cm ?? null, largo_cm ?? null,
            fecha_programada ? new Date(fecha_programada) : null,
            fecha_despacho_real ? new Date(fecha_despacho_real) : null,
            fecha_entrega_estimada ? new Date(fecha_entrega_estimada) : null,
            fecha_entrega_real ? new Date(fecha_entrega_real) : null,
            despachado_por_id ?? null, entregado_por_id ?? null,
            cancelado_por_id ?? null, comentario_cancelacion ?? null,
        );
    }
}

// Variante "ConDetalle" — Envio + su Paquete (con items) + Dirección + Transportista.
// Pensada para el endpoint GET /envio/:id (vista completa de trazabilidad).
export class EnvioConDetalleEntity extends EnvioEntity {
    constructor(
        base: EnvioEntity,
        public paquete: PaqueteConItemsEntity,
        public direccion: DireccionEnvioEntity | null,
        public transportista: TransportistaEntity | null,
    ) {
        super(
            base.id_envio, base.numero_correlativo, base.id_paquete, base.estado, base.eliminado,
            base.fecha_registro, base.registrado_por_id, base.id_transportista, base.numero_tracking,
            base.costo_envio, base.quien_paga, base.peso_total_kg, base.alto_cm, base.ancho_cm,
            base.largo_cm, base.fecha_programada, base.fecha_despacho_real, base.fecha_entrega_estimada,
            base.fecha_entrega_real, base.despachado_por_id, base.entregado_por_id,
            base.cancelado_por_id, base.comentario_cancelacion,
        );
    }

    public static fromObject(obj: { [key: string]: any }): EnvioConDetalleEntity {
        const baseEntity = EnvioEntity.fromObject(obj);

        // ⚠️ estos 3 nombres deben coincidir EXACTO con el `include` del datasource
        const { paquete, direccion, transportista } = obj;

        if (!paquete) throw new Error('El envío no tiene paquete asociado — dato inconsistente');

        const paqueteEntity = PaqueteConItemsEntity.fromObject(paquete);
        const direccionEntity = direccion ? DireccionEnvioEntity.fromObject(direccion) : null;
        const transportistaEntity = transportista ? TransportistaEntity.fromObject(transportista) : null;

        return new EnvioConDetalleEntity(baseEntity, paqueteEntity, direccionEntity, transportistaEntity);
    }
}
