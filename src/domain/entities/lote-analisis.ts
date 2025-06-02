export class LoteAnalisisEntity {
  constructor(
    public readonly id: string,
    public readonly id_lote: string,
    public readonly id_analisis: string,
    public readonly fecha_agregado: Date
  ) {}

  public static fromObject(obj: Record<string, any>): LoteAnalisisEntity {
    const { id, id_lote, id_analisis, fecha_agregado } = obj;

    if (!id) throw new Error('id es requerido');
    if (!id_lote) throw new Error('id_lote es requerido');
    if (!id_analisis) throw new Error('id_analisis es requerido');
    if (!fecha_agregado) throw new Error('fecha_agregado es requerido');

    const fecha = new Date(fecha_agregado);
    if (isNaN(fecha.getTime())) {
      throw new Error('fecha_agregado no es una fecha válida');
    }

    return new LoteAnalisisEntity(id, id_lote, id_analisis, fecha);
  }
}
