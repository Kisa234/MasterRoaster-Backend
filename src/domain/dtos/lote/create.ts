

export class CreateLoteDto {
    private constructor(
        public readonly id_lote        : string,
        public readonly productor      : string,
        public readonly finca          : string,
        public readonly region         : string,
        public readonly departamento   : string,
        public readonly peso           : number,
        public readonly variedades     : string,
        public readonly proceso        : string,

        
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateLoteDto?] {
        const { productor, finca, region, departamento, fecha_compra, peso, variedades,proceso } = props;

        if (!productor) return ['El productor es requerido', undefined];
        if (!finca) return ['La finca es requerida', undefined];
        if (!region) return ['La región es requerida', undefined];
        if (!departamento) return ['El departamento es requerido', undefined];
        if (!peso || peso <= 0) return ['El peso debe ser mayor a 0', undefined];
        if (!variedades) return ['Las variedades son requeridas', undefined];
        if (!proceso) return ['El proceso es requerido', undefined];
 
        const generarIdLote = (productor: string, variedades: string, proceso: string): string  => {

            // 1 LETRA PRIMER NOMBRE PRODUCTOR
            // 1 LETRA PRIMER APELLIDO PRODUCTOR
            // 2 LETRAS DE LA VARIERDAD
            // SI ES NATURAL "NA" y HONEY "HO" , SI ES LAVADO NADA
            // NUMERO DE LOTE INGRESADO "1,2,3,4,5,6,7,8,9"
    
    
            const nombres = productor.trim().split(' ');
            const inicialNombre = nombres[0]?.charAt(0).toUpperCase() || '';
            const inicialApellido = nombres[1]?.charAt(0).toUpperCase() || '';
                
            let inicialVariedad = '';
            const variedadesArray = variedades.trim().split(' ');
                
            if (variedadesArray.length === 2) {
                inicialVariedad = variedadesArray[0].slice(0, 2).toUpperCase() + variedadesArray[1].slice(0, 2).toUpperCase();
            } else if (variedadesArray.length > 2) {
                inicialVariedad = 'BL'; 
            } else {
                inicialVariedad = variedades.slice(0, 2).toUpperCase(); 
            }
            
            let inicialProceso = '';
            if (proceso.toLowerCase() === 'natural') {
              inicialProceso = 'NA';
            } else if (proceso.toLowerCase() === 'honey') {
              inicialProceso = 'HO';
            }
          
            const formattedDate = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // Format as YYYYMMDD
            const idLote = `${inicialNombre}${inicialApellido}${inicialVariedad}${inicialProceso}${formattedDate}`;
          
            return idLote;
        }

        const id_lote = generarIdLote(productor, variedades, proceso);

        return [undefined, new CreateLoteDto(
            id_lote,productor, finca, region, departamento,
            peso, variedades, proceso
        )];
    }
   

    
}
