
export type TMolienda = 'ENTERO' | 'MOLIDO';

export class UpdateProductoSkuDto {
  private constructor(
    public readonly gramaje?         : number,
    public readonly molienda?        : TMolienda,
    public readonly cantidad?        : number,
    public readonly eliminado?       : boolean,
    public readonly sku_code?        : string,
    public readonly id_lote_tostado? : string,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.gramaje !== undefined)    returnObj.gramaje = this.gramaje;
    if (this.molienda !== undefined)   returnObj.molienda = this.molienda;
    if (this.cantidad !== undefined)   returnObj.cantidad = this.cantidad;
    if (this.sku_code !== undefined)   returnObj.sku_code = this.sku_code;
    if (this.id_lote_tostado !== undefined) returnObj.id_lote_tostado = this.id_lote_tostado;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateProductoSkuDto?] {
    let {
      gramaje,
      molienda,
      cantidad,
      eliminado,
      sku_code,
      id_lote_tostado,
    } = props;

    if (gramaje !== undefined) {
      gramaje = Number(gramaje);
      if (!Number.isFinite(gramaje) || gramaje <= 0) {
        return ['El gramaje debe ser un número mayor a 0', undefined];
      }
    }

    if (molienda !== undefined && molienda !== 'ENTERO' && molienda !== 'MOLIDO') {
      return ['La molienda debe ser ENTERO o MOLIDO', undefined];
    }

    if (cantidad !== undefined) {
      cantidad = Number(cantidad);
      if (!Number.isInteger(cantidad) || cantidad < 0) {
        return ['La cantidad debe ser un entero >= 0', undefined];
      }
    }

    if (eliminado !== undefined && typeof eliminado !== 'boolean') {
      return ['El campo eliminado debe ser boolean', undefined];
    }

    if (sku_code !== undefined && typeof sku_code !== 'string') {
      return ['El sku_code debe ser texto', undefined];
    }

    if (id_lote_tostado !== undefined) {
      id_lote_tostado = String(id_lote_tostado);
      if (!id_lote_tostado.trim()) {
        return ['id_lote_tostado no puede ser vacío', undefined];
      }
    }

    return [undefined, new UpdateProductoSkuDto(
      gramaje,
      molienda,
      cantidad,
      eliminado,
      sku_code,
      id_lote_tostado
    )];
  }
}
