import { CreateLoteDto } from "../../../dtos/lotes/lote/create";
import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";
import { UserRepository } from "../../../repository/user.repository";
import { CreateLoteRapidoDto } from "../../../dtos/lotes/lote/create-rapido";
import { PedidoRepository } from "../../../repository/pedido.repository";


export interface CreateLoteRapidoUseCase {
    execute(createLoteDto: CreateLoteDto): Promise<LoteEntity>;
}

export class CreateLoteRapido implements CreateLoteRapidoUseCase {

    constructor(
        private readonly loteRepository: LoteRepository,
        private readonly userRepository: UserRepository,
        private readonly pedidoRepository: PedidoRepository
    ) { }

    async execute(createLoteRapidoDto: CreateLoteRapidoDto): Promise<LoteEntity> {

        const id = await this.generarId(createLoteRapidoDto);
        console.log('ID generado:', id);
        const [, dto] = CreateLoteRapidoDto.create({
            id_lote: id,
            productor: createLoteRapidoDto.productor,
            finca: createLoteRapidoDto.finca,
            region: createLoteRapidoDto.region,
            departamento: createLoteRapidoDto.departamento,
            peso: createLoteRapidoDto.peso,
            variedades: createLoteRapidoDto.variedades,
            proceso: createLoteRapidoDto.proceso,
            tipo_lote: createLoteRapidoDto.tipo_lote,
            id_user: createLoteRapidoDto.id_user,
            peso_tostado: createLoteRapidoDto.peso_tostado,
            id_analisis: createLoteRapidoDto.id_analisis,
        });
        if (!dto) {
            throw new Error('Error al crear el DTO de Lote');
        }
        const lote = this.loteRepository.createLote(dto);
        return lote;
    }

    generarId = async (dto: CreateLoteDto, tueste?: Boolean, usuario?: boolean, id_c?: string): Promise<string> => {
        // Iniciales del cliente (si existe y no es admin)
        let clientInitials = '';
        let user: any = null;
        if (dto.id_user) {
            user = await this.userRepository.getUserById(dto.id_user);
            if (user?.nombre && user?.rol === 'cliente') {
                const partesCliente = user.nombre.trim().split(' ');
                clientInitials =
                    (partesCliente[0]?.charAt(0).toUpperCase() || '') +
                    (partesCliente[1]?.charAt(0).toUpperCase() || '') + '-';
            }
        }
        const isAdmin = user?.rol === 'admin';

        // Iniciales del productor (si existe)
        let prodInitials = '';
        if (dto.productor) {
            const nombresProd = dto.productor.trim().split(' ');
            prodInitials =
                (nombresProd[0]?.charAt(0).toUpperCase() || '') +
                (nombresProd[1]?.charAt(0).toUpperCase() || '') + '-';
        }

        // Determinar parte inicial del ID según reglas:
        // - Si no hay nombre de productor, usar solo iniciales del cliente
        // - Si hay productor y cliente no es admin, usar iniciales del cliente + iniciales del productor
        // - Si cliente es admin, usar solo iniciales del productor
        let initialPart = '';
        if (!dto.productor) {
            initialPart = clientInitials;
        } else {
            initialPart = isAdmin ? prodInitials : clientInitials + prodInitials;
        }

        // Iniciales de variedad
        let inicialVariedad = '';
        if (dto.variedades.length >= 3) {
            inicialVariedad = 'BL';
        } else {
            for (const variedad of dto.variedades) {
                const palabras = variedad.trim().split(' ');
                if (palabras.length > 0) {
                    inicialVariedad += palabras[0].slice(0, 2).toUpperCase();
                    for (let i = 1; i < palabras.length; i++) {
                        inicialVariedad += palabras[i].charAt(0).toUpperCase();
                    }
                }
            }
        }

        // Iniciales de proceso
        let inicialProceso = '';
        if (dto.proceso.toLowerCase() === 'natural') {
            inicialProceso = 'NA';
        } else if (dto.proceso.toLowerCase() === 'honey') {
            inicialProceso = 'HO';
        }

        // Construir ID base
        let idGenerado = `${initialPart}${inicialVariedad}${inicialProceso}`;

        // NUMERO FINAL
        const lotes = await this.loteRepository.getLotes();               // Todos los lotes existentes
        const lotesPedidos = await this.pedidoRepository.getLotesCreados(); // Todos los id_nuevoLote de pedidos
        const uniquePedidos = new Set(lotesPedidos);                      // Elimina duplicados

        // Calcular: total lotes menos lotes ya “usados” por pedidos, +1 para el siguiente
        const numeroLoteFinal = lotes.length - uniquePedidos.size + 1;
        idGenerado = `${idGenerado}-${numeroLoteFinal}`;

        // LOTE PARA CLIENTE: conserva lógica previa
        if (usuario) {
            if (dto.id_user) {
                user = user || (await this.userRepository.getUserById(dto.id_user));
            }
            if (user?.rol === 'cliente') {
                const partesNombre = user.nombre.trim().split(' ');
                const inicialNombreUser = partesNombre[0]?.charAt(0).toUpperCase() || '';
                const inicialApellidoUser = partesNombre[1]?.charAt(0).toUpperCase() || '';
                idGenerado = `${inicialNombreUser}${inicialApellidoUser}-${id_c}`;
                if (tueste) {
                    idGenerado = `${idGenerado}-T`;
                }
            } else if (user?.rol !== 'cliente') {
                throw new Error('No se puede generar un Lote para un usuario que no es cliente');
            }
        }

        return idGenerado;
    }
}

