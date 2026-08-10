import { PaqueteItemEntity } from "./paquete-item.entity";
import { EnvioEntity } from "./envio.entity";

export class PaqueteEntity {
    constructor(
        public id_paquete: string,
        public id_cliente: string,
        public estado: string,
        public eliminado: boolean,
        public fecha_registro: Date,
        public creado_por_id: string,
        public id_pedido_origen?: string | null,
        public comentario?: string | null,
        public fecha_editado?: Date | null,
        public preparado_por_id?: string | null,
        public fecha_preparado?: Date | null,
        public numero_correlativo?: string | null,
    ) { }

    public static fromObject(obj: { [key: string]: any }): PaqueteEntity {
        const {
            id_paquete, id_cliente, estado, eliminado, fecha_registro,
            creado_por_id, id_pedido_origen, comentario, fecha_editado,
            preparado_por_id, fecha_preparado, numero_correlativo,
        } = obj;

        if (!id_paquete) throw new Error('id_paquete property is required');
        if (!id_cliente) throw new Error('id_cliente property is required');
        if (!creado_por_id) throw new Error('creado_por_id property is required');

        const newFecha = new Date(fecha_registro);
        if (isNaN(newFecha.getTime())) throw new Error('fecha_registro no es válida');

        return new PaqueteEntity(
            id_paquete,
            id_cliente,
            estado ?? 'EN_PREPARACION',
            eliminado ?? false,
            newFecha,
            creado_por_id,
            id_pedido_origen ?? null,
            comentario ?? null,
            fecha_editado ? new Date(fecha_editado) : null,
            preparado_por_id ?? null,
            fecha_preparado ? new Date(fecha_preparado) : null,
            numero_correlativo ?? null,
        );
    }
}

export class PaqueteConItemsEntity extends PaqueteEntity {
    constructor(
        base: PaqueteEntity,
        public items: PaqueteItemEntity[] = [],
        public envios: EnvioEntity[] = [], // 👈 nuevo
    ) {
        super(
            base.id_paquete, base.id_cliente, base.estado, base.eliminado, base.fecha_registro,
            base.creado_por_id, base.id_pedido_origen, base.comentario, base.fecha_editado,
            base.preparado_por_id, base.fecha_preparado, base.numero_correlativo,
        );
    }

    public static fromObject(obj: { [key: string]: any }): PaqueteConItemsEntity {
        const baseEntity = PaqueteEntity.fromObject(obj);
        const { items, envios } = obj; // 👈 nuevo

        const mappedItems: PaqueteItemEntity[] = Array.isArray(items)
            ? items.map((i: any) => PaqueteItemEntity.fromObject(i))
            : [];

        const mappedEnvios: EnvioEntity[] = Array.isArray(envios) // 👈 nuevo
            ? envios.map((e: any) => EnvioEntity.fromObject(e))
            : [];

        return new PaqueteConItemsEntity(baseEntity, mappedItems, mappedEnvios);
    }
}