import { CreateLoteDto } from '../../dtos/lotes/lote/create';
import { UpdateLoteDto } from "../../dtos/lotes/lote/update";
import { CreatePedidoDto } from "../../dtos/pedido/create";
import { CreateTuesteDto } from "../../dtos/tueste/create";
import { LoteEntity } from "../../entities/lote.entity";
import { PedidoEntity } from "../../entities/pedido.entity";
import { LoteRepository } from "../../repository/lote.repository";
import { PedidoRepository } from "../../repository/pedido.repository";
import { TuesteRepository } from "../../repository/tueste.repository";
import { UserRepository } from "../../repository/user.repository";
import { CreateLoteUseCase } from '../lote/lote/create-lote';
import { AnalisisRepository } from '../../repository/analisis.repository';
import { AnalisisFisicoRepository } from '../../repository/analisisFisico.repository';
import { AnalisisFisicoEntity } from '../../entities/analisisFisico.entity';
import { AnalisisSensorialRepository } from '../../repository/analisisSensorial.repository';
import { AnalisisDefectosRespository } from '../../repository/analisisDefectos.repository';
import { CreateAnalisisFisicoDto } from '../../dtos/analisis/fisico/create';
import { CreateAnalisisSensorialDTO } from '../../dtos/analisis/sensorial/create';
import { CreateAnalisisDto } from '../../dtos/analisis/analisis/create';
import { CreateLoteAnalisisDto } from '../../dtos/lote-analisis/create';
import { LoteAnalisisRepository } from '../../repository/lote-analisis.repository';
import { CreateAnalisisDefectosDto } from '../../dtos/analisis/defectos/create';



export interface CreatePedidoUseCase {
    execute(createPedidoDto: CreatePedidoDto): Promise<PedidoEntity>;
}

export class CreatePedido implements CreatePedidoUseCase {
    constructor(
        private readonly pedidoRepository: PedidoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly userRepository: UserRepository,
        private readonly createLoteUseCase: CreateLoteUseCase,
        private readonly tuesteRepository: TuesteRepository,
        private readonly analisisRepository: AnalisisRepository,
        private readonly analisisFisicoRepository: AnalisisFisicoRepository,
        private readonly analisisSensorialRepository: AnalisisSensorialRepository,
        private readonly analisisDefectosRepository: AnalisisDefectosRespository,
        private readonly loteAnalisisRepository: LoteAnalisisRepository

    ) { }

    async execute(dto: CreatePedidoDto): Promise<PedidoEntity> {
        //validar lote 
        const lote = await this.loteRepository.getLoteById(dto.id_lote);
        if (!lote || lote.eliminado) throw new Error('El lote no existe');
        const loteEntity = LoteEntity.fromObject(lote);
        //dependiendo del tipo de pedido 
        if (dto.tipo_pedido === 'Venta Verde') {
            return this.ventaVerde(loteEntity, dto);
        }

        if (dto.tipo_pedido === 'Tostado Verde') {
            return this.tostadoVerde(loteEntity, dto);
        }

        if (dto.tipo_pedido === 'Orden Tueste') {
            return this.ordenTueste(loteEntity, dto);
        }

        throw new Error('Tipo de pedido inválido');

    }

    private async ventaVerde(lote: LoteEntity, dto: CreatePedidoDto): Promise<PedidoEntity> {
        // 1. Verificar que hay suficiente peso en el lote original
        if (lote.peso < dto.cantidad) {
            throw new Error('No hay suficiente cantidad en el lote');
        }

        // 2. Validar que el cliente existe y no está eliminado
        const user = await this.userRepository.getUserById(dto.id_user);
        if (!user || user.eliminado) {
            throw new Error('El cliente no existe o está eliminado');
        }

        // 3. Actualizar peso del lote original
        const nuevoPesoLote = lote.peso - dto.cantidad;
        const [, updateLoteDto] = UpdateLoteDto.update({ peso: nuevoPesoLote });
        await this.loteRepository.updateLote(lote.id_lote, updateLoteDto!);
        //eliminar lote si el nuevo peso es  0 
        if (nuevoPesoLote == 0) {
            await this.loteRepository.deleteLote(lote.id_lote);
        }


        // 4. Verificar si el cliente ya tiene un lote nuevo creado desde este mismo lote original y del mismo tipo de pedido
        const pedidos = await this.pedidoRepository.getPedidosByCliente(user.id_user);
        const pedidoRelacionado = pedidos.find(p => p.id_lote === lote.id_lote && p.tipo_pedido === dto.tipo_pedido);;
        let nuevoLoteDestino: LoteEntity;

        if (pedidoRelacionado) {
            // Ya tiene un lote generado previamente desde este lote original

            if (!pedidoRelacionado.id_nuevoLote) {
                throw new Error('El pedido relacionado no tiene un lote nuevo asociado');
            }
            const loteDestino = await this.loteRepository.getLoteById(pedidoRelacionado.id_nuevoLote);
            if (!loteDestino) {
                throw new Error('No se pudo encontrar el lote destino relacionado al pedido anterior');
            }
            nuevoLoteDestino = loteDestino;

            // Sumar la nueva cantidad al lote destino y actualizar
            const nuevoPesoDestino = nuevoLoteDestino.peso + dto.cantidad;
            const [, updateDestinoDto] = UpdateLoteDto.update({ peso: nuevoPesoDestino });
            await this.loteRepository.updateLote(nuevoLoteDestino.id_lote, updateDestinoDto!);
        } else {
            // No tiene lote nuevo generado → se crea uno desde este lote origen
            const [error, createLoteDto] = CreateLoteDto.create({
                productor: lote.productor,
                finca: lote.finca,
                region: lote.region,
                departamento: lote.departamento,
                peso: dto.cantidad,
                variedades: lote.variedades,
                proceso: lote.proceso,
                tipo_lote: 'Lote Verde',
                id_user: user.id_user,
            });

            nuevoLoteDestino = await this.createLoteUseCase.execute(createLoteDto!, false, true, lote.id_lote);

            // 3) Si el lote original tiene un análisis asociado, clonarlo y asociarlo al nuevo lote
            if (lote.id_analisis) {
                let nuevoFis, nuevoSen, nuevoDef;
                const analisis = await this.analisisRepository.getAnalisisById(lote.id_analisis);
                if (!analisis) throw new Error('Análisis no encontrado');
                if (analisis.analisisFisico_id) {
                    // 3a) Recrear el análisis físico si existe
                    let af = await this.analisisFisicoRepository.getAnalisisFisicoById(analisis.analisisFisico_id!);
                    const [, dtoFis] = CreateAnalisisFisicoDto.create({ ...af! });
                    nuevoFis = await this.analisisFisicoRepository.createAnalisisFisico(dtoFis!);
                }
                if (analisis.analisisSensorial_id) {
                    // 3b)  Recrear el análisis sensorial si existe
                    let as = await this.analisisSensorialRepository.getAnalisisSensorialById(analisis.analisisSensorial_id!);
                    const [, dtoSen] = CreateAnalisisSensorialDTO.create({ ...as! });
                    nuevoSen = await this.analisisSensorialRepository.createAnalisisSensorial(dtoSen!);
                }
                if (analisis.analisisDefectos_id) {
                    // 3c) Si hay análisis de defectos, recrearlo
                    let ad = await this.analisisDefectosRepository.getAnalisisDefectosById(analisis.analisisDefectos_id!);
                    const [, dtoDef] = CreateAnalisisDefectosDto.create({ ...ad! });
                    nuevoDef = await this.analisisDefectosRepository.createAnalisisDefectos(dtoDef!);
                }
                // 3c) Crear la nueva entidad de análisis
                // 3c) Relacionarlos en un nuevo “análisis”
                const [, dtoAnalisis] = CreateAnalisisDto.create({
                    analisisFisico_id: nuevoFis?.id_analisis_fisico ? nuevoFis.id_analisis_fisico : undefined,
                    analisisSensorial_id: nuevoSen?.id_analisis_sensorial ? nuevoSen.id_analisis_sensorial : undefined,
                    analisisDefectos_id: nuevoDef?.id_analisis_defecto ? nuevoDef.id_analisis_defecto : undefined,
                });
                const nuevoAnalisis = await this.analisisRepository.createAnalisis(dtoAnalisis!);

                // 3d) Crear la relación entre el lote y el análisis
                const [, dtoLoteAnalisis] = CreateLoteAnalisisDto.create({
                    id_lote: nuevoLoteDestino.id_lote,
                    id_analisis: nuevoAnalisis.id_analisis,
                });
                await this.loteAnalisisRepository.create(dtoLoteAnalisis!);

                // 3e) Actualizar el lote destino con el nuevo análisis
                const [, dtoUpdateLote] = UpdateLoteDto.update({
                    id_analisis: nuevoAnalisis.id_analisis,
                });
                console.log('dtoUpdateLote', dtoUpdateLote);
                await this.loteRepository.updateLote(nuevoLoteDestino.id_lote, dtoUpdateLote!);
            }

        }

        // 5. Crear el nuevo pedido con referencia al lote original y al nuevo lote
        const [, createPedidoDto] = CreatePedidoDto.create({
            tipo_pedido: dto.tipo_pedido,
            cantidad: dto.cantidad,
            comentario: dto.comentario,
            id_user: dto.id_user,
            id_lote: lote.id_lote,
            id_nuevoLote: nuevoLoteDestino.id_lote,
        });

        const pedido = await this.pedidoRepository.createPedido(createPedidoDto!);
        return PedidoEntity.fromObject(pedido);
    }

    private async tostadoVerde(lote: LoteEntity, dto: CreatePedidoDto): Promise<PedidoEntity> {
        const cantidadRequerida = Math.ceil(Math.round(dto.cantidad * 1.15 * 100) / 100);

        // 1. Validar cantidad disponible en el lote original
        if (lote.peso < cantidadRequerida) {
            throw new Error('No hay suficiente cantidad en el lote');
        }
        // 2. Validar cliente
        const user = await this.userRepository.getUserById(dto.id_user);
        if (!user || user.eliminado) {
            throw new Error('El cliente no existe o está eliminado');
        }

        // 3. Buscar si ya existe un pedido "Tostado Verde" del mismo lote origen
        const pedidos = await this.pedidoRepository.getPedidosByCliente(user.id_user);
        const pedidoExistente = pedidos.find(
            (p) => p.id_lote === lote.id_lote && p.tipo_pedido === 'Tostado Verde'
        );

        let nuevoLoteDestino: LoteEntity;
        if (pedidoExistente) {
            // 4A. Ya existe lote tostado → reutilizar y actualizar peso
            const lote = await this.loteRepository.getLoteById(pedidoExistente.id_nuevoLote!);
            if (!lote) {
                throw new Error('El lote tostado relacionado no existe o fue eliminado');
            }
            nuevoLoteDestino = lote;
            // Actualizar peso en verde y tostado del lote tostado
            const nuevoPesoVerde = nuevoLoteDestino.peso + cantidadRequerida;
            const nuevoPesoTostado = nuevoLoteDestino.peso_tostado! + dto.cantidad;
            const [, updateTostadoDto] = UpdateLoteDto.update({ peso: nuevoPesoVerde, peso_tostado: nuevoPesoTostado });
            await this.loteRepository.updateLote(nuevoLoteDestino.id_lote, updateTostadoDto!);
        } else {
            // 4B. No existe lote tostado → crear uno nuevo
            const [, createLoteDto] = CreateLoteDto.create({
                productor: lote.productor,
                finca: lote.finca,
                region: lote.region,
                departamento: lote.departamento,
                peso: cantidadRequerida,
                variedades: lote.variedades,
                proceso: lote.proceso,
                tipo_lote: 'Tostado Verde',
                peso_tostado: dto.cantidad,
                id_user: dto.id_user,
            });

            nuevoLoteDestino = await this.createLoteUseCase.execute(createLoteDto!, true, true, lote.id_lote);

            // 3) Si el lote original tiene un análisis asociado, clonarlo y asociarlo al nuevo lote
            if (lote.id_analisis) {
                let nuevoFis, nuevoSen, nuevoDef;
                const analisis = await this.analisisRepository.getAnalisisById(lote.id_analisis);
                if (!analisis) throw new Error('Análisis no encontrado');
                if (analisis.analisisFisico_id) {
                    // 3a) Recrear el análisis físico si existe
                    let af = await this.analisisFisicoRepository.getAnalisisFisicoById(analisis.analisisFisico_id!);
                    const [, dtoFis] = CreateAnalisisFisicoDto.create({ ...af! });
                    nuevoFis = await this.analisisFisicoRepository.createAnalisisFisico(dtoFis!);
                }
                if (analisis.analisisSensorial_id) {
                    // 3b)  Recrear el análisis sensorial si existe
                    let as = await this.analisisSensorialRepository.getAnalisisSensorialById(analisis.analisisSensorial_id!);
                    const [, dtoSen] = CreateAnalisisSensorialDTO.create({ ...as! });
                    nuevoSen = await this.analisisSensorialRepository.createAnalisisSensorial(dtoSen!);
                }
                if (analisis.analisisDefectos_id) {
                    // 3c) Si hay análisis de defectos, recrearlo
                    let ad = await this.analisisDefectosRepository.getAnalisisDefectosById(analisis.analisisDefectos_id!);
                    const [, dtoDef] = CreateAnalisisDefectosDto.create({ ...ad! });
                    nuevoDef = await this.analisisDefectosRepository.createAnalisisDefectos(dtoDef!);
                }
                // 3c) Crear la nueva entidad de análisis
                // 3c) Relacionarlos en un nuevo “análisis”
                const [, dtoAnalisis] = CreateAnalisisDto.create({
                    analisisFisico_id: nuevoFis?.id_analisis_fisico ? nuevoFis.id_analisis_fisico : undefined,
                    analisisSensorial_id: nuevoSen?.id_analisis_sensorial ? nuevoSen.id_analisis_sensorial : undefined,
                    analisisDefectos_id: nuevoDef?.id_analisis_defecto ? nuevoDef.id_analisis_defecto : undefined,
                });
                const nuevoAnalisis = await this.analisisRepository.createAnalisis(dtoAnalisis!);

                // 3d) Crear la relación entre el lote y el análisis
                const [, dtoLoteAnalisis] = CreateLoteAnalisisDto.create({
                    id_lote: nuevoLoteDestino.id_lote,
                    id_analisis: nuevoAnalisis.id_analisis,
                });
                await this.loteAnalisisRepository.create(dtoLoteAnalisis!);

                // 3e) Actualizar el lote destino con el nuevo análisis
                const [, dtoUpdateLote] = UpdateLoteDto.update({
                    id_analisis: nuevoAnalisis.id_analisis,
                });
                console.log('dtoUpdateLote', dtoUpdateLote);
                await this.loteRepository.updateLote(nuevoLoteDestino.id_lote, dtoUpdateLote!);
            }            
        }

        // 5. Actualizar lote original (restar lo tostado)
        const nuevoPesoLote = lote.peso - cantidadRequerida;
        const [, updateOriginalDto] = UpdateLoteDto.update({ peso: nuevoPesoLote });
        await this.loteRepository.updateLote(lote.id_lote, updateOriginalDto!);
        //eliminar lote si el nuevo peso es  0 
        if (nuevoPesoLote == 0) {
            await this.loteRepository.deleteLote(lote.id_lote);
        }


        // 6. Crear nuevo pedido
        const [, newPedidoDto] = CreatePedidoDto.create({
            tipo_pedido: dto.tipo_pedido,
            cantidad: dto.cantidad,
            comentario: dto.comentario,
            id_user: dto.id_user,
            id_lote: lote.id_lote,
            id_nuevoLote: nuevoLoteDestino.id_lote,
        });

        const pedido = await this.pedidoRepository.createPedido(newPedidoDto!);

        return PedidoEntity.fromObject(pedido);
    }

    private async ordenTueste(lote: LoteEntity, dto: CreatePedidoDto): Promise<PedidoEntity> {
        // 1. Verificar que hay suficiente peso en el lote 
        if (lote.peso < dto.cantidad) {
            throw new Error('No hay suficiente cantidad en el lote');
        }
        // actualizar peso del lote original si es lote verde
        if (lote.tipo_lote === 'Lote Verde') {
            const nuevoPesoLote = lote.peso - dto.cantidad;
            const [, updateLoteDto] = UpdateLoteDto.update({ peso: nuevoPesoLote });
            await this.loteRepository.updateLote(lote.id_lote, updateLoteDto!);
            //eliminar lote si el nuevo peso es  0 
            if (nuevoPesoLote == 0) {
                await this.loteRepository.deleteLote(lote.id_lote);
            }
        }


        // 2. Validar que el cliente existe y no está eliminado
        const user = await this.userRepository.getUserById(dto.id_user);
        if (!user || user.eliminado) {
            throw new Error('El cliente no existe o está eliminado');
        }

        // 3. Validar que el lote tiene un análisis asociado
        let analisisFisico: AnalisisFisicoEntity | null = null;

        if (!lote.id_analisis) {
            console.warn('El lote no tiene un análisis asociado, usando valores por defecto');
        } else {
            const analisis = await this.analisisRepository.getAnalisisById(lote.id_analisis);
            if (!analisis) {
                console.warn(`No se encontró el análisis ${lote.id_analisis}, usando valores por defecto`);
            } else {
                analisisFisico = await this.analisisFisicoRepository
                    .getAnalisisFisicoById(analisis.analisisFisico_id!);
                if (!analisisFisico) {
                    console.warn(`No se encontró el análisis físico ${analisis.analisisFisico_id}, usando valores por defecto`);
                }
            }
        }


        // 5. Crear Pedido
        const pedido = await this.pedidoRepository.createPedido(dto);

        //6. Generar Tuestes
        if (!dto.pesos) throw new Error('Los pesos son requeridos');
        const density = analisisFisico?.densidad ?? 0;
        const humidity = analisisFisico?.humedad ?? 0;
        let cant = 1;
        for (let peso of dto.pesos) {
            const [, createTuesteDto] = CreateTuesteDto.create({
                id_lote: lote.id_lote,
                num_batch: cant,
                fecha_tueste: dto.fecha_tueste,
                tostadora: dto.tostadora,
                id_cliente: dto.id_user,
                densidad: density,
                humedad: humidity,
                peso_entrada: peso,
                id_pedido: pedido.id_pedido,
            });
            await this.tuesteRepository.createTueste(createTuesteDto!);
            cant++;
        }
        return PedidoEntity.fromObject(pedido);
    }
}

