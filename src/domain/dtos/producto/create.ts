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
  ) { }

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

    console.log("Validating CreateProductoDto with props:", props);

    if (!nombre || typeof nombre !== 'string') return ['nombre es requerido'];
    if (!id_categoria || typeof id_categoria !== 'string') return ['id_categoria es requerido'];

    if (typeof es_combo !== 'boolean') return ['es_combo debe ser boolean'];
    if (typeof activo !== 'boolean') return ['activo debe ser boolean'];


    try {



      return [
        undefined,
        new CreateProductoDto(
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
          activo
        ),
      ];
    } catch (e: any) {
      return [e?.message ?? 'Error validando CreateProductoDto'];
    }
  }
}