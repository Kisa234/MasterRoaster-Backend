import { CreateMuestraDto } from "../../dtos/muestra/create";
import { MuestraEntity } from "../../entities/muestra.entity";
import { MuestraRepository } from "../../repository/muestra.repository";
import { UserRepository } from "../../repository/user.repository";

export interface CreateMuestraUseCase {
    execute(createMuestraDto: CreateMuestraDto): Promise<MuestraEntity>;
}

export class CreateMuestra implements CreateMuestraUseCase {
    constructor(
        private readonly muestraRepository: MuestraRepository,
        private readonly userRepository: UserRepository,
    ){}

    async execute(createMuestraDto: CreateMuestraDto): Promise<MuestraEntity> {

        const id= await this.generarId(createMuestraDto);
        const [,dto] = CreateMuestraDto.create({
            ...createMuestraDto,
            id_muestra   : id,
        });
        
        return this.muestraRepository.createMuestra(dto!);
    }

    generarId = async (dto: CreateMuestraDto): Promise<string> => {
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
        
            const muestras = await this.muestraRepository.getAllMuestras();
            const numeroMuestraFinal = muestras.length + 1;
            idGenerado = `${idGenerado}-${numeroMuestraFinal}`;
            
            return idGenerado;
        }
}
