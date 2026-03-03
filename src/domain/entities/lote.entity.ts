export class LoteEntity {
    constructor(
        public id_lote: string,
        public proveedor: string,
        public productor: string,
        public finca: string,
        public distrito: string,
        public departamento: string,
        public peso: number,
        public variedades: string[],
        public proceso: string,
        public tipo_lote: string,
        public fecha_registro: Date,
        public eliminado: boolean,
        public clasificacion?: string,
        public costo?: number,
        public altura?: number,
        public id_user?: string,
        public id_analisis?: string,
        public peso_tostado?: number,

    ) { }

    public static fromObject(obj: { [key: string]: any }): LoteEntity {
        const {
            id_lote,
            proveedor,
            productor,
            finca,
            distrito,
            departamento,
            peso,
            variedades,
            proceso,
            tipo_lote,
            eliminado,
            clasificacion,
            costo,
            altura,
            id_user,
            id_analisis,
            peso_tostado,
            fecha_registro
        } = obj;
        if (!id_lote) throw new Error('id_lote property is required');
        // if (!productor) throw new Error('productor property is required');
        // if (!finca) throw new Error('finca property is required');
        // if (!provincia) throw new Error('provincia property is required');
        // if (!departamento) throw new Error('departamento property is required');
        if (!variedades) throw new Error('variedades property is required');
        if (!proceso) throw new Error('proceso property is required');

        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro no es válida');
        }

        return new LoteEntity(
            id_lote,
            proveedor,
            productor,
            finca,
            distrito,
            departamento,
            peso,
            variedades,
            proceso,
            tipo_lote,
            newFechaRegistro,
            eliminado,
            clasificacion,
            costo,
            altura,
            id_user,
            id_analisis,
            peso_tostado,
        );
    }
}

//Entity con inventario incluido para casos específicos

export interface InventarioLoteMini {
  id_inventario: string;
  id_lote: string;
  id_almacen: string;
  cantidad_kg: number;
  fecha_registro: Date;
  fecha_editado?: Date | null;
  almacen?: {
    id_almacen: string;
    nombre: string;
  } | null;
}

export class LoteConInventarioEntity {
  constructor(
    public id_lote: string,
    public proveedor: string,
    public productor: string,
    public finca: string,
    public distrito: string,
    public departamento: string,
    public peso: number,
    public variedades: string[],
    public proceso: string,
    public tipo_lote: string,
    public fecha_registro: Date,
    public eliminado: boolean,

    // ✅ extra solo para estos casos
    public inventarioLotes: InventarioLoteMini[] = [],

    public clasificacion?: string,
    public costo?: number,
    public altura?: number,
    public id_user?: string,
    public id_analisis?: string,
    public peso_tostado?: number
  ) {}

  static fromObject(obj: { [key: string]: any }): LoteConInventarioEntity {
    const {
      id_lote,
      proveedor,
      productor,
      finca,
      distrito,
      departamento,
      peso,
      variedades,
      proceso,
      tipo_lote,
      eliminado,
      clasificacion,
      costo,
      altura,
      id_user,
      id_analisis,
      peso_tostado,
      fecha_registro,
      inventarioLotes,
    } = obj;

    if (!id_lote) throw new Error('id_lote property is required');
    if (!variedades) throw new Error('variedades property is required');
    if (!proceso) throw new Error('proceso property is required');

    const newFechaRegistro = new Date(fecha_registro);
    if (isNaN(newFechaRegistro.getTime())) throw new Error('fecha_registro no es válida');

    const invMapped: InventarioLoteMini[] = Array.isArray(inventarioLotes)
      ? inventarioLotes.map((i: any) => ({
          id_inventario: i.id_inventario,
          id_lote: i.id_lote,
          id_almacen: i.id_almacen,
          cantidad_kg: Number(i.cantidad_kg ?? 0),
          fecha_registro: new Date(i.fecha_registro),
          fecha_editado: i.fecha_editado ? new Date(i.fecha_editado) : null,
          almacen: i.almacen
            ? { id_almacen: i.almacen.id_almacen, nombre: i.almacen.nombre }
            : null,
        }))
      : [];

    return new LoteConInventarioEntity(
      id_lote,
      proveedor,
      productor,
      finca,
      distrito,
      departamento,
      peso,
      variedades,
      proceso,
      tipo_lote,
      newFechaRegistro,
      eliminado,
      invMapped,
      clasificacion,
      costo,
      altura,
      id_user,
      id_analisis,
      peso_tostado
    );
  }
}