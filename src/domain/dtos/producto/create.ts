export class CreateProductoDto {
  private constructor(
    public readonly id_producto: string,
    public readonly nombre: string,
    public readonly descripcion: string | null,

    public readonly id_marca: string | null,
    public readonly modelo: string | null,
    public readonly color: string | null,

    public readonly peso_kg: number | null,
    public readonly largo_cm: number | null,
    public readonly ancho_cm: number | null,
    public readonly alto_cm: number | null,
    public readonly volumen_cm3: number | null,
    public readonly material: string | null,
    public readonly fragil: boolean | null,

    public readonly id_categoria: string,
    public readonly es_combo: boolean,
    public readonly activo: boolean
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductoDto?] {
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
      es_combo = false,
      activo = true,
    } = props;

    if (!nombre || typeof nombre !== 'string') return ['nombre es requerido'];
    if (!id_categoria || typeof id_categoria !== 'string') return ['id_categoria es requerido'];

    if (typeof es_combo !== 'boolean') return ['es_combo debe ser boolean'];
    if (typeof activo !== 'boolean') return ['activo debe ser boolean'];

    const toNullableString = (v: any): string | null =>
      v === undefined || v === null || v === '' ? null : String(v).trim() || null;

    const toNullableNumber = (v: any, field: string): number | null => {
      if (v === undefined || v === null || v === '') return null;
      const n = Number(v);
      if (Number.isNaN(n)) throw new Error(`${field} debe ser un número`);
      return n;
    };

    const toNullableBoolean = (v: any, field: string): boolean | null => {
      if (v === undefined || v === null || v === '') return null;
      if (typeof v !== 'boolean') throw new Error(`${field} debe ser boolean`);
      return v;
    };

    try {
      const parsedPeso = toNullableNumber(peso_kg, 'peso_kg');
      const parsedLargo = toNullableNumber(largo_cm, 'largo_cm');
      const parsedAncho = toNullableNumber(ancho_cm, 'ancho_cm');
      const parsedAlto = toNullableNumber(alto_cm, 'alto_cm');
      const parsedVolumen = toNullableNumber(volumen_cm3, 'volumen_cm3');

      const nonNegative = (n: number | null, field: string) => {
        if (n !== null && n < 0) throw new Error(`${field} no puede ser negativo`);
      };
      nonNegative(parsedPeso, 'peso_kg');
      nonNegative(parsedLargo, 'largo_cm');
      nonNegative(parsedAncho, 'ancho_cm');
      nonNegative(parsedAlto, 'alto_cm');
      nonNegative(parsedVolumen, 'volumen_cm3');

      return [
        undefined,
        new CreateProductoDto(
          id_producto,
          nombre,
          toNullableString(descripcion),

          toNullableString(id_marca),
          toNullableString(modelo),
          toNullableString(color),

          parsedPeso,
          parsedLargo,
          parsedAncho,
          parsedAlto,
          parsedVolumen,
          toNullableString(material),
          toNullableBoolean(fragil, 'fragil'),

          id_categoria,
          es_combo,
          activo
        ),
      ];
    } catch (e: any) {
      return [e?.message ?? 'Error validando CreateProductoDto'];
    }
  }
}