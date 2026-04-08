import { Molienda } from "@prisma/client";

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

export interface InventarioProductoMini {
  id_inventario: string;
  id_producto: string;
  id_almacen: string;
  id_lote_tostado?: string | null;
  cantidad: number;
  gramaje?: number | null;
  molienda: string;
  unidad_medida?: string | null;
  fecha_registro: Date;
  fecha_editado?: Date | null;
  almacen?: {
    id_almacen: string;
    nombre: string;
  } | null;
}

export class ProductoConInventariosEntity {
  constructor(
    public id_producto: string,
    public nombre: string,
    public descripcion: string | null,

    public id_marca: string | null,
    public modelo: string | null,
    public color: string | null,

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
    public fecha_editado?: Date | null,

    // extra solo para estos casos
    public inventarios: InventarioProductoMini[] = [],
    public stock_total: number = 0,
    public cantidad_almacenes: number = 0,
    public stock_inicial_referencial: number = 0,
    public fecha_primer_registro?: Date | null,
  ) {}

  static fromObject(obj: { [key: string]: any }): ProductoConInventariosEntity {
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

      inventarios,
    } = obj;

    if (!id_producto) throw new Error('id_producto property is required');
    if (!nombre) throw new Error('nombre property is required');
    if (!id_categoria) throw new Error('id_categoria property is required');
    if (typeof es_combo !== 'boolean') throw new Error('es_combo debe ser boolean');
    if (typeof activo !== 'boolean') throw new Error('activo debe ser boolean');

    const newFechaRegistro = new Date(fecha_registro);
    if (isNaN(newFechaRegistro.getTime())) {
      throw new Error('fecha_registro no es válida');
    }

    const newFechaEditado = fecha_editado ? new Date(fecha_editado) : null;
    if (newFechaEditado && isNaN(newFechaEditado.getTime())) {
      throw new Error('fecha_editado no es válida');
    }

    const invMapped: InventarioProductoMini[] = Array.isArray(inventarios)
      ? inventarios.map((i: any) => ({
          id_inventario: i.id_inventario,
          id_producto: i.id_producto,
          id_almacen: i.id_almacen,
          id_lote_tostado: i.id_lote_tostado ?? null,
          cantidad: Number(i.cantidad ?? 0),
          gramaje: i.gramaje !== undefined && i.gramaje !== null ? Number(i.gramaje) : null,
          molienda: i.molienda,
          unidad_medida: i.unidad_medida ?? null,
          fecha_registro: new Date(i.fecha_registro),
          fecha_editado: i.fecha_editado ? new Date(i.fecha_editado) : null,
          almacen: i.almacen
            ? {
                id_almacen: i.almacen.id_almacen,
                nombre: i.almacen.nombre,
              }
            : null,
        }))
      : [];

    const stock_total = invMapped.reduce((sum, i) => sum + (i.cantidad || 0), 0);

    const cantidad_almacenes = new Set(
      invMapped.map((i) => i.id_almacen)
    ).size;

    let stock_inicial_referencial = 0;
    let fecha_primer_registro: Date | null = null;

    if (invMapped.length > 0) {
      const sorted = [...invMapped].sort(
        (a, b) => a.fecha_registro.getTime() - b.fecha_registro.getTime()
      );

      fecha_primer_registro = sorted[0].fecha_registro;
      const minTime = sorted[0].fecha_registro.getTime();

      stock_inicial_referencial = invMapped
        .filter((i) => i.fecha_registro.getTime() === minTime)
        .reduce((sum, i) => sum + (i.cantidad || 0), 0);
    }

    return new ProductoConInventariosEntity(
      id_producto,
      nombre,
      descripcion ?? null,

      id_marca ?? null,
      modelo ?? null,
      color ?? null,

      peso_kg !== undefined && peso_kg !== null ? Number(peso_kg) : null,
      largo_cm !== undefined && largo_cm !== null ? Number(largo_cm) : null,
      ancho_cm !== undefined && ancho_cm !== null ? Number(ancho_cm) : null,
      alto_cm !== undefined && alto_cm !== null ? Number(alto_cm) : null,
      volumen_cm3 !== undefined && volumen_cm3 !== null ? Number(volumen_cm3) : null,
      material ?? null,
      fragil ?? null,

      id_categoria,
      es_combo,
      activo,
      newFechaRegistro,
      newFechaEditado,

      invMapped,
      stock_total,
      cantidad_almacenes,
      stock_inicial_referencial,
      fecha_primer_registro
    );
  }
}