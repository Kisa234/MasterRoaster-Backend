import { CreateLoteDto } from "../../../dtos/lotes/lote/create";
import { UserRepository } from "../../../repository/user.repository";
import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";
import { MuestraRepository } from '../../../repository/muestra.repository';


export interface CreateLoteFromMuestraUseCase {
    execute(id: string,peso:number): Promise<LoteEntity>;
}

export class CreateLoteFromMuestra implements CreateLoteFromMuestraUseCase {
    constructor(
        private readonly loteRepository: LoteRepository,
        private readonly muestraRepository: MuestraRepository,
        private readonly userRepository: UserRepository,
    ){}

    async execute(id: string,peso:number): Promise<LoteEntity> {
        const muestra = await this.muestraRepository.getMuestraById(id);
        if (!muestra) {
            throw new Error('Muestra no encontrada');
        }
        const [ , muestraDto] = CreateLoteDto.create({
            productor    : muestra.productor,
            finca        : muestra.finca,
            region       : muestra.region,
            departamento : muestra.departamento,
            peso         : muestra.peso,
            variedades   : muestra.variedades,
            proceso      : muestra.proceso,
            id_user      : muestra.id_user,
            id_analisis  : muestra.analisis_id,
        })
        const idGenerado = await this.generarId(muestraDto!);

        const [ , dto] = CreateLoteDto.create({
            id_lote      : idGenerado,
            productor    : muestra.productor,
            finca        : muestra.finca,
            region       : muestra.region,
            departamento : muestra.departamento,
            peso         : muestra.peso,
            variedades   : muestra.variedades,
            proceso      : muestra.proceso,
            id_user      : muestra.id_user,
            id_analisis  : muestra.analisis_id,
        })

        return this.loteRepository.createLoteFromMuestra(id,peso,dto!);
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