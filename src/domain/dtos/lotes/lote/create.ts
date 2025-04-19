

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
        public readonly id_user        : string,
        public readonly id_analisis?    : string,
        
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateLoteDto?] {
        const { id_lote, productor, finca, region, departamento, peso, variedades,proceso,id_user,id_analisis } = props;

        if (!productor) return ['El productor es requerido', undefined];
        if (!finca) return ['La finca es requerida', undefined];
        if (!region) return ['La región es requerida', undefined];
        if (!departamento) return ['El departamento es requerido', undefined];
        if (!peso || peso <= 0) return ['El peso debe ser mayor a 0', undefined];
        if (!variedades) return ['Las variedades son requeridas', undefined];
        if (!proceso) return ['El proceso es requerido', undefined];
        if (!id_user) return ['El id_user es requerido', undefined];
        if (id_analisis) return ['El id_analisis no es requerido', undefined];

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
          
            const now = new Date();
            const date = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
            const idLote = `${inicialNombre}${inicialApellido}${inicialVariedad}${inicialProceso}${date}`;
          
            return idLote;
        }

        if (id_lote) {
            return [undefined, new CreateLoteDto(
                id_lote,productor, finca, region, departamento,
                peso, variedades, proceso, id_user, id_analisis
            )];    
        }

        const id = generarIdLote(productor, variedades, proceso);

        return [undefined, new CreateLoteDto(
            id,productor, finca, region, departamento,
            peso, variedades, proceso, id_user, id_analisis
        )];
    }
   
}
