import { CreateLoteDto } from "../../../dtos/lotes/lote/create";
import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";
import { UserRepository } from "../../../repository/user.repository";
import { Pedido } from "@prisma/client";
import { PedidoRepository } from "../../../repository/pedido.repository";


export interface CreateLoteUseCase {
    execute(createLoteDto: CreateLoteDto, tueste?: Boolean, id_c?: string): Promise<LoteEntity>;
}

export class CreateLote implements CreateLoteUseCase {

    constructor(
        private readonly loteRepository: LoteRepository,
        private readonly userRepository: UserRepository,
        private readonly pedidoRepository: PedidoRepository
    ) { }

    async execute(createLoteDto: CreateLoteDto, tueste?: Boolean, id_c?: string): Promise<LoteEntity> {
        const id = await this.generarId(createLoteDto, tueste, id_c,);
        const [error, dto] = CreateLoteDto.create({
            ...createLoteDto,
            id_lote: id,
        });
        if (error) {
            console.log('Error DTO:', error);
        }
        const lote = this.loteRepository.createLote(dto!);
        return lote;
    }

    generarId = async (dto: CreateLoteDto, tueste?: Boolean, id_c?: string): Promise<string> => {
        //  lOTE NUEVO
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
        } else if (proceso.toLowerCase() === 'lavado') {
            inicialProceso = '';
        }

        let idGenerado = `${inicialNombre}${inicialApellido}${inicialVariedad}${inicialProceso}`;

        // NUMERO FINAL
        const lotes = await this.loteRepository.getLotes();               // Todos los lotes existentes
        const lotesPedidos = await this.pedidoRepository.getLotesCreados(); // Todos los id_nuevoLote de pedidos
        const uniquePedidos = new Set(lotesPedidos);                      // Elimina duplicados

        // Calcular: total lotes menos lotes ya “usados” por pedidos, +1 para el siguiente
        const numeroLoteFinal = lotes.length - uniquePedidos.size + 1;
        idGenerado = `${idGenerado}-${numeroLoteFinal}`;


        // LOTE PARA CLIENTE
        const user = await this.userRepository.getUserById(dto.id_user!);
        if (user) {
            if (user?.rol === 'cliente') {
                const partesNombre = user.nombre.trim().split(' ');
                const inicialNombreUser = partesNombre[0]?.charAt(0).toUpperCase() || '';
                const inicialApellidoUser = partesNombre[1]?.charAt(0).toUpperCase() || '';
                if (id_c) {
                    idGenerado = `${inicialNombreUser}${inicialApellidoUser}-${id_c}`;
                    if (tueste) {
                        idGenerado = `${idGenerado}-T`;
                    }
                    return idGenerado;
                }

                idGenerado = `${inicialNombreUser}${inicialApellidoUser}-${idGenerado}`;

                if (tueste) {
                    idGenerado = `${idGenerado}-T`;
                }

            }
            else if (user?.rol !== 'cliente') {
                return idGenerado;
            }



        }
        return idGenerado;
    }


}