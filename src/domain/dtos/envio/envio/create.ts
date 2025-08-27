import { ClasificacionEnvio, OrigenEnvio } from "@prisma/client";

const ORIGEN_ENVIO_VALUES: ReadonlyArray<OrigenEnvio> = ['LOTE_TOSTADO', 'CAFE_EMBOLSADO', 'BOX_CAFE'];
const CLASIFICACION_ENVIO_VALUES: ReadonlyArray<ClasificacionEnvio> = ['PARCIAL', 'TOTAL'];

export class CreateEnvioDto {
  private constructor(
    public readonly origen: OrigenEnvio,
    public readonly clasificacion: ClasificacionEnvio,
    public readonly id_lote_tostado: string,
    public readonly id_cliente: string,
    public readonly cantidad: number,
    public readonly comentario?: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateEnvioDto?] {
    let { origen, clasificacion, id_lote_tostado, id_cliente, cantidad, comentario } = props;

    // origen
    if (!origen) return ['Origen es requerido', undefined];
    const origenValue = String(origen).toUpperCase() as OrigenEnvio;
    if (!ORIGEN_ENVIO_VALUES.includes(origenValue)) {
      return [`Origen inválido. Valores permitidos: ${ORIGEN_ENVIO_VALUES.join(', ')}`, undefined];
    }

    // // clasificacion
    // if (!clasificacion) return ['Clasificación es requerida', undefined];
    // const clasifValue = String(clasificacion).toUpperCase() as ClasificacionEnvio;
    // if (!CLASIFICACION_ENVIO_VALUES.includes(clasifValue)) {
    //   return [`Clasificación inválida. Valores permitidos: ${CLASIFICACION_ENVIO_VALUES.join(', ')}`, undefined];
    // }

    // FKs
    if (!id_lote_tostado) return ['id_lote_tostado es requerido', undefined];
    if (!id_cliente) return ['id_cliente es requerido', undefined];

    // cantidad en gramos
    if (cantidad === undefined || cantidad === null) return ['cantidad (gramos) es requerida', undefined];
    const nCantidad = typeof cantidad === 'string' ? Number(cantidad) : cantidad;
    if (!Number.isInteger(nCantidad) || nCantidad <= 0) {
      return ['cantidad debe ser un entero positivo en gramos', undefined];
    }


    return [undefined, new CreateEnvioDto(
      origenValue,
      clasificacion,
      id_lote_tostado,
      id_cliente,
      nCantidad,
      comentario
    )];
  }
}
