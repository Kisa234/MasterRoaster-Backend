import { CreateEnvioDto } from "../../dtos/envio/create";
import { UpdateLoteTostadoDto } from "../../dtos/lotes/lote-tostado/update";
import { EnvioEntity } from "../../entities/envio.entity";
import { EnvioRepository } from "../../repository/envio.repository";
import { LoteTostadoRepository } from '../../repository/loteTostado.repository';

export interface CreateEnvioUseCase {
  execute(createEnvioDto: CreateEnvioDto): Promise<EnvioEntity>;
}

export class CreateEnvio implements CreateEnvioUseCase {

  constructor(
    private readonly envioRepository: EnvioRepository,
    private readonly loteTostadoRepository:LoteTostadoRepository
  ) {}

  async execute(createEnvioDto: CreateEnvioDto): Promise<EnvioEntity> {
    // 1) Cargar lote tostado y validar dueño
    const lote = await this.loteTostadoRepository.getLoteTostadoById(createEnvioDto.id_lote_tostado);
    if (!lote) throw new Error('Lote tostado no existe');
    // Garantiza la exclusividad cliente–lote
    if (createEnvioDto.id_cliente !== lote.id_user) {
      throw new Error('El cliente del envío no coincide con el dueño del lote');
    }
    
    // 2) Stock actual en gramos
    const stockActual = lote.peso;
    
    // 3) Validaciones de cantidad
    if (createEnvioDto.cantidad <= 0) {
      throw new Error('Cantidad debe ser un entero positivo en gramos');
    }
    if (createEnvioDto.cantidad > stockActual) {
      throw new Error('Stock insuficiente en el lote');
    }
    
    // 4) Recalcular clasificacion
    const clasificacion = (createEnvioDto.cantidad === stockActual) ? 'TOTAL' : 'PARCIAL';
    
    // 5) Reconstruir DTO
    const [, dto] = CreateEnvioDto.create({
      origen: 'LOTE_TOSTADO',
      clasificacion,
      id_lote_tostado: createEnvioDto.id_lote_tostado,
      id_cliente: createEnvioDto.id_cliente,
      cantidad: createEnvioDto.cantidad,
      comentario: createEnvioDto.comentario,
    });
    if (!dto) throw new Error('Error al crear el DTO de Envío');

    // 6) Descontar stock del lote
    const nuevoStock = stockActual - dto.cantidad
    const [error,dtoUpdate] = UpdateLoteTostadoDto.update({
        peso:nuevoStock,
    })
    if (error){
        throw new Error(error);
    }
    this.loteTostadoRepository.updateLoteTostado(createEnvioDto.id_lote_tostado,dtoUpdate!);


    // 7) Crear el envío
    const envio = await this.envioRepository.createEnvio(dto);
    return envio;
  }
}
