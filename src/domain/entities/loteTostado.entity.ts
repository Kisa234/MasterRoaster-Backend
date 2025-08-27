export class LoteTostadoEntity {
    constructor(
        public id_lote_tostado: string,
        public id_lote: string,
        public fecha_tostado: Date,
        public perfil_tostado: string,
        public peso: number,
        public fecha_registro: Date,
        public id_user:string,
        public id_analisis_rapido?: string,
        public entregado?: Date
    ) {}
  
    static fromObject(obj: { [key: string]: any }): LoteTostadoEntity {
        const {
            id_lote_tostado,
            id_lote,
            fecha_tostado,
            perfil_tostado,
            peso,
            fecha_registro,
            id_user,
            id_analisis_rapido,
            entregado
        } = obj;

        if(!id_lote_tostado) throw new Error('id_lote_tostado property is required');
        if(!id_lote) throw new Error('id_lote property is required');
        if(!perfil_tostado) throw new Error('perfil_tostado property is required');
        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro no es válida');
        }
        const newFechaTostado = new Date(fecha_tostado);
        if (isNaN(newFechaTostado.getTime())) {
            throw new Error('fecha_tostado no es válida');
        }

        return new LoteTostadoEntity(
            id_lote_tostado,
            id_lote,
            newFechaTostado,
            perfil_tostado,
            peso,
            newFechaRegistro,
            id_user,
            id_analisis_rapido,
            entregado
        );
    }
  }
  