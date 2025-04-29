import { CreateLoteDto } from "../../../dtos/lotes/lote/create";
import { UserRepository } from "../../../repository/user.repository";
import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";


export interface CreateLoteUseCase {
    execute(createLoteDto: CreateLoteDto): Promise<LoteEntity>;
}

export class CreateLote implements CreateLoteUseCase {
    constructor(
        private readonly loteRepository: LoteRepository,
        private readonly userRepository: UserRepository,
    ){}

    async execute( createLoteDto: CreateLoteDto): Promise<LoteEntity> {

        const id= await this.generarId(createLoteDto);
        

        const [,dto] = CreateLoteDto.create({
            id_lote      : id,
            productor    : createLoteDto.productor,
            finca        : createLoteDto.finca,
            region       : createLoteDto.region,
            departamento : createLoteDto.departamento,
            peso         : createLoteDto.peso,
            variedades   : createLoteDto.variedades,
            proceso      : createLoteDto.proceso,
            id_user      : createLoteDto.id_user,
            id_analisis  : createLoteDto.id_analisis,
        });

        return this.loteRepository.createLote(dto!);
    }

    generarId = async (dto: CreateLoteDto): Promise<string> => {
        const { productor, variedades, proceso } = dto;
      
    
        const nombres = productor.trim().split(' ');
        const inicialNombre = nombres[0]?.charAt(0).toUpperCase() || '';
        const inicialApellido = nombres[1]?.charAt(0).toUpperCase() || '';
    
        let inicialVariedad = '';
    
        if (variedades.length >= 3) {
            inicialVariedad = 'BL';
        } else {
            for (const variedad of variedades) {
                const palabras = variedad.trim().split(' ');
                if (palabras.length > 0) {
                    inicialVariedad += palabras[0].slice(0, 2).toUpperCase(); // Primeras 2 letras de la primera palabra
                    for (let i = 1; i < palabras.length; i++) {
                        inicialVariedad += palabras[i].charAt(0).toUpperCase(); // 1ra letra de cada palabra adicional
                    }
                }
            }
        }
    
        let inicialProceso = '';
        if (proceso.toLowerCase() === 'natural') {
            inicialProceso = 'NA';
        } else if (proceso.toLowerCase() === 'honey') {
            inicialProceso = 'HO';
        }
    
        let idGenerado = `${inicialNombre}${inicialApellido}${inicialVariedad}${inicialProceso}`;
    
        // LOTE CLIENTE
        let user;
        if (dto.id_user) {
            user = await this.userRepository.getUserById(dto.id_user);
        } 
        if (user?.rol === 'Cliente') {
            const partesNombre = user.nombre.trim().split(' ');
            const inicialNombreUser = partesNombre[0]?.charAt(0).toUpperCase() || '';
            const inicialApellidoUser = partesNombre[1]?.charAt(0).toUpperCase() || '';
            idGenerado = `${inicialNombreUser}${inicialApellidoUser}-${idGenerado}`;
        }

        // NUMERO FINAL
        const numeroLote = await this.loteRepository.getLotes();
        const numeroLoteFinal = numeroLote.length + 1;
    
        idGenerado = `${idGenerado}-${numeroLoteFinal}`;

        return idGenerado;
    }
    

}