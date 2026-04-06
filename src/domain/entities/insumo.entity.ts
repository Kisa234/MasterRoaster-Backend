export class InsumoEntity {

  constructor(
    public id_insumo: string,
    public nombre: string,
    public id_categoria: string,
    public unidad_medida: string,
    public descripcion?: string,
    public activo?: boolean,
    public created_at?: Date,
  ) {}

  static fromObject(obj: { [key: string]: any }): InsumoEntity {
    const {
      id_insumo,
      nombre,
      id_categoria,
      descripcion,
      unidad_medida,
      activo,
      created_at
    } = obj;

    if (!id_insumo) throw new Error('id_insumo es requerido');
    if (!nombre) throw new Error('nombre es requerido');
    if (!id_categoria) throw new Error('categoria es requerida');
    if (!unidad_medida) throw new Error('unidad_medida es requerida');

    let newCreatedAt: Date | undefined = undefined;
    if (created_at) {
      newCreatedAt = new Date(created_at);
      if (isNaN(newCreatedAt.getTime())) throw new Error('created_at no es válido');
    }

    return new InsumoEntity(
      String(id_insumo),
      String(nombre).trim(),
      String(id_categoria).trim(),
      String(unidad_medida).trim(),
      descripcion !== undefined && descripcion !== null ? String(descripcion) : undefined,
      activo !== undefined ? Boolean(activo) : undefined,
      newCreatedAt
    );
  }
}

export interface InventarioInsumoMini {
  id_inventario: string;
  id_insumo: string;
  id_almacen: string;
  cantidad: number;
  fecha_registro: Date;
  fecha_editado?: Date | null;
  almacen?: {
    id_almacen: string;
    nombre: string;
  } | null;
}

export class InsumoConInventariosEntity {
  constructor(
    public id_insumo: string,
    public nombre: string,
    public id_categoria: string,
    public unidad_medida: string,
    public descripcion?: string,
    public activo?: boolean,
    public created_at?: Date,

    public inventarios: InventarioInsumoMini[] = [],
    public stock_total: number = 0,
    public cantidad_almacenes: number = 0,
    public stock_inicial_referencial: number = 0,
    public fecha_primer_registro?: Date | null,
  ) {}

  static fromObject(obj: { [key: string]: any }): InsumoConInventariosEntity {
    const {
      id_insumo,
      nombre,
      id_categoria,
      descripcion,
      unidad_medida,
      activo,
      created_at,
      inventarios,
    } = obj;

    if (!id_insumo) throw new Error('id_insumo es requerido');
    if (!nombre) throw new Error('nombre es requerido');
    if (!id_categoria) throw new Error('categoria es requerida');
    if (!unidad_medida) throw new Error('unidad_medida es requerida');

    let newCreatedAt: Date | undefined = undefined;
    if (created_at) {
      newCreatedAt = new Date(created_at);
      if (isNaN(newCreatedAt.getTime())) throw new Error('created_at no es válido');
    }

    const invMapped: InventarioInsumoMini[] = Array.isArray(inventarios)
      ? inventarios.map((i: any) => ({
          id_inventario: i.id_inventario,
          id_insumo: i.id_insumo,
          id_almacen: i.id_almacen,
          cantidad: Number(i.cantidad ?? 0),
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

    return new InsumoConInventariosEntity(
      String(id_insumo),
      String(nombre).trim(),
      String(id_categoria).trim(),
      String(unidad_medida).trim(),
      descripcion !== undefined && descripcion !== null ? String(descripcion) : undefined,
      activo !== undefined ? Boolean(activo) : undefined,
      newCreatedAt,
      invMapped,
      stock_total,
      cantidad_almacenes,
      stock_inicial_referencial,
      fecha_primer_registro
    );
  }
}