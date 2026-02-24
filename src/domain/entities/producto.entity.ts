export class ProductoEntity {
  constructor(
    public id_producto: string,
    public nombre: string,
    public descripcion: string | null,

    // Identidad comercial (normalizada)
    public id_marca: string | null,

    public modelo: string | null,
    public color: string | null,

    // atributos físicos fijos
    public peso_kg: number | null,
    public largo_cm: number | null,
    public ancho_cm: number | null,
    public alto_cm: number | null,
    public volumen_cm3: number | null,
    public material: string | null,
    public fragil: boolean | null,

    public id_categoria: string,
    public es_combo: boolean,
    public activo: boolean,
    public fecha_registro: Date,
    public fecha_editado?: Date | null
  ) {}

  private static toNullableString(value: any): string | null {
    if (value === undefined || value === null || value === '') return null;
    if (typeof value !== 'string') throw new Error('Campo string inválido');
    const v = value.trim();
    return v === '' ? null : v;
  }

  private static toNullableNumber(value: any, field: string): number | null {
    if (value === undefined || value === null || value === '') return null;
    const n = Number(value);
    if (Number.isNaN(n)) throw new Error(`${field} debe ser un número`);
    return n;
  }

  private static toNullableBoolean(value: any, field: string): boolean | null {
    if (value === undefined || value === null || value === '') return null;
    if (typeof value !== 'boolean') throw new Error(`${field} debe ser boolean`);
    return value;
  }

  public static fromObject(obj: { [key: string]: any }): ProductoEntity {
    const {
      id_producto,
      nombre,
      descripcion,

      id_marca,

      modelo,
      color,

      peso_kg,
      largo_cm,
      ancho_cm,
      alto_cm,
      volumen_cm3,
      material,
      fragil,

      id_categoria,
      es_combo,
      activo,
      fecha_registro,
      fecha_editado,
    } = obj;

    if (!id_producto) throw new Error('id_producto property is required');
    if (!nombre) throw new Error('nombre property is required');
    if (!id_categoria) throw new Error('id_categoria property is required');

    if (typeof es_combo !== 'boolean') throw new Error('es_combo debe ser boolean');
    if (typeof activo !== 'boolean') throw new Error('activo debe ser boolean');

    const newFechaRegistro = new Date(fecha_registro);
    if (isNaN(newFechaRegistro.getTime())) throw new Error('fecha_registro no es válida');

    const newFechaEditado = fecha_editado ? new Date(fecha_editado) : null;
    if (newFechaEditado && isNaN(newFechaEditado.getTime())) throw new Error('fecha_editado no es válida');

    const parsedPeso = this.toNullableNumber(peso_kg, 'peso_kg');
    const parsedLargo = this.toNullableNumber(largo_cm, 'largo_cm');
    const parsedAncho = this.toNullableNumber(ancho_cm, 'ancho_cm');
    const parsedAlto = this.toNullableNumber(alto_cm, 'alto_cm');
    const parsedVolumen = this.toNullableNumber(volumen_cm3, 'volumen_cm3');

    const nonNegative = (n: number | null, field: string) => {
      if (n !== null && n < 0) throw new Error(`${field} no puede ser negativo`);
    };
    nonNegative(parsedPeso, 'peso_kg');
    nonNegative(parsedLargo, 'largo_cm');
    nonNegative(parsedAncho, 'ancho_cm');
    nonNegative(parsedAlto, 'alto_cm');
    nonNegative(parsedVolumen, 'volumen_cm3');

    const parsedIdMarca = this.toNullableString(id_marca);

    return new ProductoEntity(
      id_producto,
      String(nombre),
      this.toNullableString(descripcion),

      parsedIdMarca,

      this.toNullableString(modelo),
      this.toNullableString(color),

      parsedPeso,
      parsedLargo,
      parsedAncho,
      parsedAlto,
      parsedVolumen,
      this.toNullableString(material),
      this.toNullableBoolean(fragil, 'fragil'),

      id_categoria,
      es_combo,
      activo,
      newFechaRegistro,
      newFechaEditado
    );
  }
}