import { CreateEnvioDto } from "../../dtos/envio/envio/create";
import { UpdateInventarioLoteTostadoDto } from "../../dtos/inventarios/inventario-lote-tostado/update";
import { EnvioEntity } from "../../entities/envio.entity";
import { EnvioRepository } from "../../repository/envio.repository";
import { LoteTostadoRepository } from "../../repository/loteTostado.repository";
import { InventarioLoteTostadoRepository } from "../../repository/inventario-lote-tostado.repository";

export interface CreateEnvioUseCase {
  execute(createEnvioDto: CreateEnvioDto): Promise<EnvioEntity>;
}

export class CreateEnvio implements CreateEnvioUseCase {

  constructor(
    private readonly envioRepository: EnvioRepository,
    private readonly loteTostadoRepository: LoteTostadoRepository,
    private readonly inventarioLoteTostadoRepository: InventarioLoteTostadoRepository,
  ) {}

  async execute(createEnvioDto: CreateEnvioDto): Promise<EnvioEntity> {
    const lote = await this.loteTostadoRepository.getLoteTostadoById(
      createEnvioDto.id_lote_tostado
    );


    if (!lote) throw new Error('Lote tostado no existe');


    if (createEnvioDto.id_cliente !== lote.id_user) {
      throw new Error('El cliente del envío no coincide con el dueño del lote');
    }
    if (!createEnvioDto.id_almacen) {
      throw new Error('Debe seleccionar un almacén');
    }

    const inventario = await this.inventarioLoteTostadoRepository.getByLoteTostadoAndAlmacen(
      lote.id_lote_tostado,
      createEnvioDto.id_almacen
    );


    if (!inventario) {
      throw new Error('El lote tostado no tiene inventario en el almacén seleccionado');
    }
  

    const stockActual = inventario.cantidad_kg;
    

    if (createEnvioDto.cantidad <= 0) {
      throw new Error('Cantidad debe ser un entero positivo en gramos');
    }

    if (createEnvioDto.cantidad > stockActual) {
      throw new Error('Stock insuficiente en el almacén seleccionado');
    }


    const clasificacion =
      createEnvioDto.cantidad === stockActual ? 'TOTAL' : 'PARCIAL';


    const [, dto] = CreateEnvioDto.create({
      origen: 'LOTE_TOSTADO',
      clasificacion,
      id_lote_tostado: createEnvioDto.id_lote_tostado,
      id_cliente: createEnvioDto.id_cliente,
      cantidad: createEnvioDto.cantidad,
      comentario: createEnvioDto.comentario,
    });

    if (!dto) throw new Error('Error al crear el DTO de Envío');

    const nuevoStock = stockActual - dto.cantidad;

    const [error, dtoUpdateInventario] = UpdateInventarioLoteTostadoDto.update({
      cantidad_kg: nuevoStock,
      fecha_editado: new Date(),
    });


    if (error) throw new Error(error);

    await this.inventarioLoteTostadoRepository.updateInventario(
      inventario.id_inventario,
      dtoUpdateInventario!
    );
    
    const envio = await this.envioRepository.createEnvio(dto);


    return envio;
  }
}