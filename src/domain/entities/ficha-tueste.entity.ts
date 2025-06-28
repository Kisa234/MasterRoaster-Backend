export class FichaTueste {
    constructor(
        public id_lote: string,
        public humedad: number,
        public densidad: number,
        public caramelizacion: number,
        public desarrollo: number,
        public temp_desarrollo: number,
        public agtrom: number,
        public tiempo: number,
        public tueste: string,
        public id_lote_tostado: string,
        public peso_total: number,
       
    ) {}
  
    static fromObject(obj: { [key: string]: any }): FichaTueste {
        const {
            id_lote,
            humedad,
            densidad,
            caramelizacion,
            desarrollo,
            temp_desarrollo,
            agtrom,
            tiempo,
            tueste,
            id_lote_tostado,
            peso_total
        } = obj;

        if (!id_lote) throw new Error('id_lote property is required');
        if (!humedad) throw new Error('humedad property is required');
        if (!densidad) throw new Error('densidad property is required');
        if (!caramelizacion) throw new Error('caramelizacion property is required');
        if (!desarrollo) throw new Error('desarrollo property is required');
        if (!temp_desarrollo) throw new Error('temp_desarrollo property is required');
        if (!agtrom) throw new Error('agtrom property is required');
        if (!tiempo) throw new Error('tiempo property is required');
        if (!tueste) throw new Error('tueste property is required');
        if (!id_lote_tostado) throw new Error('id_lote_tostado property is required');
        if (!peso_total) throw new Error('peso_total property is required');
        

        return new FichaTueste(
            id_lote,
            humedad,
            densidad,
            caramelizacion,
            desarrollo,
            temp_desarrollo,
            agtrom,
            tiempo,
            tueste,
            id_lote_tostado,
            peso_total
        );
    }
  }
  