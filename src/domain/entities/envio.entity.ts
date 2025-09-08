export type OrigenEnvio = 'LOTE_TOSTADO' | 'CAFE_EMBOLSADO' | 'BOX_CAFE';
export type ClasificacionEnvio = 'PARCIAL' | 'TOTAL';

const ORIGEN_ENVIO_VALUES = ['LOTE_TOSTADO', 'CAFE_EMBOLSADO', 'BOX_CAFE'] as const;
const CLASIFICACION_ENVIO_VALUES = ['PARCIAL', 'TOTAL'] as const;

export class EnvioEntity {
  constructor(
    public id_envio: string,
    public origen: OrigenEnvio,
    public clasificacion: ClasificacionEnvio,
    public id_lote_tostado: string,
    public id_cliente: string,
    public cantidad: number,          
    public eliminado: boolean,
    public fecha: Date,
    public comentario?: string,
  ) {}

  public static fromObject(obj: { [key: string]: any }): EnvioEntity {
    const {
      id_envio,
      origen,
      clasificacion,
      id_lote_tostado,
      id_cliente,
      cantidad,
      comentario,
      fecha,
      eliminado,
    } = obj;

    // Requeridos
    if (!id_envio) throw new Error('id_envio property is required');
    if (origen === undefined || origen === null) throw new Error('origen property is required');
    if (clasificacion === undefined || clasificacion === null) throw new Error('clasificacion property is required');
    if (!id_lote_tostado) throw new Error('id_lote_tostado property is required');
    if (!id_cliente) throw new Error('id_cliente property is required');
    if (cantidad === undefined || cantidad === null) throw new Error('cantidad property is required');
    if (eliminado === undefined || eliminado === null) throw new Error('eliminado property is required');
    if (!fecha) throw new Error('fecha property is required');

    // Enums válidos
    if (!ORIGEN_ENVIO_VALUES.includes(origen)) {
      throw new Error(`origen must be one of: ${ORIGEN_ENVIO_VALUES.join(', ')}`);
    }
    if (!CLASIFICACION_ENVIO_VALUES.includes(clasificacion)) {
      throw new Error(`clasificacion must be one of: ${CLASIFICACION_ENVIO_VALUES.join(', ')}`);
    }

    // cantidad (gramos, entero > 0)
    if (typeof cantidad !== 'number' || !Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error('cantidad must be a positive integer (grams)');
    }

    // fecha válida
    const newFecha = new Date(fecha);
    if (isNaN(newFecha.getTime())) {
      throw new Error('fecha is not a valid date');
    }


    return new EnvioEntity(
      id_envio,
      origen as OrigenEnvio,
      clasificacion as ClasificacionEnvio,
      id_lote_tostado,
      id_cliente,
      cantidad,
      eliminado,
      newFecha,
      comentario,
    );
  }
}
