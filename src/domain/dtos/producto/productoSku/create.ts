export type TMolienda = 'ENTERO' | 'MOLIDO';

export class CreateProductoSkuDto {
  private constructor(
    public readonly id_producto     : string,
    public readonly id_lote_tostado : string,
    public readonly gramaje         : number,
    public readonly molienda        : TMolienda,
    public readonly cantidad?       : number,
    public readonly sku_code?       : string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductoSkuDto?] {
    let {
      id_producto,
      id_lote_tostado,
      gramaje,
      molienda,
      cantidad,
      sku_code,
    } = props;

    if (!id_producto)     return ['El id_producto es requerido', undefined];
    if (!id_lote_tostado) return ['El id_lote_tostado es requerido', undefined];

    gramaje = Number(gramaje);
    if (!Number.isFinite(gramaje) || gramaje <= 0) {
      return ['El gramaje debe ser un número mayor a 0', undefined];
    }

    if (molienda !== 'ENTERO' && molienda !== 'MOLIDO') {
      return ['La molienda debe ser ENTERO o MOLIDO', undefined];
    }

    if (cantidad !== undefined) {
      cantidad = Number(cantidad);
      if (!Number.isInteger(cantidad) || cantidad < 0) {
        return ['La cantidad debe ser un entero >= 0', undefined];
      }
    }

    if (sku_code !== undefined && typeof sku_code !== 'string') {
      return ['El sku_code debe ser texto', undefined];
    }

    return [undefined, new CreateProductoSkuDto(
      id_producto,
      id_lote_tostado,
      gramaje,
      molienda,
      cantidad,
      sku_code
    )];
  }
}
