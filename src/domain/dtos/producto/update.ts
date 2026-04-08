export class UpdateProductoDto {
  private constructor(
    public readonly id_producto?: string,

    public readonly nombre?: string,
    public readonly descripcion?: string | null,

    // Identidad comercial
    public readonly id_marca?: string | null,
    public readonly modelo?: string | null,
    public readonly color?: string | null,

    // atributos físicos fijos
    public readonly peso_kg?: number | null,
    public readonly largo_cm?: number | null,
    public readonly ancho_cm?: number | null,
    public readonly alto_cm?: number | null,
    public readonly volumen_cm3?: number | null,
    public readonly material?: string | null,
    public readonly fragil?: boolean | null,

    public readonly id_categoria?: string,
    public readonly es_combo?: boolean,
    public readonly activo?: boolean,
  ) {}

  get values() {
    const obj: { [key: string]: any } = {};

    // OJO: usamos !== undefined para permitir setear null (limpiar) y 0 en números
    if (this.nombre !== undefined) obj.nombre = this.nombre;
    if (this.descripcion !== undefined) obj.descripcion = this.descripcion;

    if (this.id_marca !== undefined) obj.id_marca = this.id_marca;
    if (this.modelo !== undefined) obj.modelo = this.modelo;
    if (this.color !== undefined) obj.color = this.color;

    if (this.peso_kg !== undefined) obj.peso_kg = this.peso_kg;
    if (this.largo_cm !== undefined) obj.largo_cm = this.largo_cm;
    if (this.ancho_cm !== undefined) obj.ancho_cm = this.ancho_cm;
    if (this.alto_cm !== undefined) obj.alto_cm = this.alto_cm;
    if (this.volumen_cm3 !== undefined) obj.volumen_cm3 = this.volumen_cm3;
    if (this.material !== undefined) obj.material = this.material;
    if (this.fragil !== undefined) obj.fragil = this.fragil;

    if (this.id_categoria !== undefined) obj.id_categoria = this.id_categoria;
    if (this.es_combo !== undefined) obj.es_combo = this.es_combo;
    if (this.activo !== undefined) obj.activo = this.activo;

    // Recomendado: siempre que actualices, setear fecha_editado
    obj.fecha_editado = new Date();

    return obj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateProductoDto?] {
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
    } = props;

    // Validaciones mínimas (opcional pero útil)
    if (!id_producto) return ['id_producto es requerido'];

    if (es_combo !== undefined && typeof es_combo !== 'boolean') return ['es_combo debe ser boolean'];
    if (activo !== undefined && typeof activo !== 'boolean') return ['activo debe ser boolean'];
    if (fragil !== undefined && fragil !== null && typeof fragil !== 'boolean') return ['fragil debe ser boolean'];

    const checkNumber = (v: any, field: string) => {
      if (v === undefined || v === null) return undefined; // null permitido para limpiar
      if (typeof v !== 'number') return `${field} debe ser number`;
      return undefined;
    };

    const err =
      checkNumber(peso_kg, 'peso_kg') ||
      checkNumber(largo_cm, 'largo_cm') ||
      checkNumber(ancho_cm, 'ancho_cm') ||
      checkNumber(alto_cm, 'alto_cm') ||
      checkNumber(volumen_cm3, 'volumen_cm3');

    if (err) return [err];

    return [
      undefined,
      new UpdateProductoDto(
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
  }
}