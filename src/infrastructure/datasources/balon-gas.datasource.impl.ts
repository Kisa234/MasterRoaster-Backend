import { prisma } from '../../data/postgres';
import { BalonGasDatasource } from '../../domain/datasources/balon-gas.datasource';
import { CreateBalonGasDto } from '../../domain/dtos/balon-gas/create-balon-gas copy';
import { CreateBalonGasHistoricoDto } from '../../domain/dtos/balon-gas/create-balon-gas-historico';
import { FinalizeBalonGasDto } from '../../domain/dtos/balon-gas/finalize-balon-gas';
import { StartBalonGasDto } from '../../domain/dtos/balon-gas/start-balon-gas';
import { BalonGasEntity, EstadisticasBalonGas } from '../../domain/entities/balon-gas.entity';


export class BalonGasDatasourceImpl implements BalonGasDatasource {

  async create(dto: CreateBalonGasDto): Promise<BalonGasEntity> {
    const balon = await prisma.balonGas.create({
      data: { ...dto, estado: 'DISPONIBLE', fecha_ingreso: new Date() },
    });
    return BalonGasEntity.fromObject(balon);
  }

  async start(dto: StartBalonGasDto): Promise<BalonGasEntity> {
    const { id_balon_gas, ...data } = dto;
    const balon = await prisma.balonGas.update({
      where: { id_balon_gas },
      data: { ...data, estado: 'EN_USO', fecha_inicio_uso: new Date() },
    });
    return BalonGasEntity.fromObject(balon);
  }

  async finalize(dto: FinalizeBalonGasDto): Promise<BalonGasEntity> {
    const { id_balon_gas, ...data } = dto;
    const balon = await prisma.balonGas.update({
      where: { id_balon_gas },
      data: { ...data, estado: 'FINALIZADO', fecha_fin_uso: new Date() },
    });
    return BalonGasEntity.fromObject(balon);
  }

  async getAll(): Promise<BalonGasEntity[]> {
    const balones = await prisma.balonGas.findMany({
      orderBy: { fecha_ingreso: 'desc' },
    });
    return balones.map(BalonGasEntity.fromObject);
  }

  async getById(id_balon_gas: string): Promise<BalonGasEntity> {
    const balon = await prisma.balonGas.findUnique({ where: { id_balon_gas } });
    if (!balon) throw `Balón de gas con id ${id_balon_gas} no existe`;
    return BalonGasEntity.fromObject(balon);
  }

  async getActual(): Promise<BalonGasEntity | null> {
    const balon = await prisma.balonGas.findFirst({ where: { estado: 'EN_USO' } });
    if (!balon) return null;
    return BalonGasEntity.fromObject(balon);
  }

  async createHistorico(dto: CreateBalonGasHistoricoDto): Promise<BalonGasEntity> {

    // Obtener fechas de los tuestes
    const tuesteInicio = await prisma.tueste.findUnique({
      where: { id_tueste: dto.id_tueste_inicio },
      select: { fecha_tueste: true },
    });

    const tuesteFin = await prisma.tueste.findUnique({
      where: { id_tueste: dto.id_tueste_fin },
      select: { fecha_tueste: true },
    });

    if (!tuesteInicio) throw 'El tueste de inicio no existe';
    if (!tuesteFin) throw 'El tueste de fin no existe';

    const fechaInicio = tuesteInicio.fecha_tueste;
    const fechaFin    = tuesteFin.fecha_tueste;

    if (fechaInicio > fechaFin) throw 'La fecha de inicio no puede ser posterior a la fecha de fin';

    // Validar solapamiento con otros balones finalizados o en uso
    const solapamiento = await prisma.balonGas.findFirst({
      where: {
        estado: { in: ['EN_USO', 'FINALIZADO'] },
        tueste_inicio: { fecha_tueste: { lte: fechaFin } },
        OR: [
          { tueste_fin: { fecha_tueste: { gte: fechaInicio } } },
          { id_tueste_fin: null },
        ],
      },
    });

    if (solapamiento) {
      throw `Ya existe un balón de gas en ese período (id: ${solapamiento.id_balon_gas.slice(0, 8)}...)`;
    }

    // Crear balón histórico completo en un solo paso
    const balon = await prisma.balonGas.create({
      data: {
        precio:             dto.precio,
        id_user_ingreso:    dto.id_user_ingreso,
        id_tueste_inicio:   dto.id_tueste_inicio,
        id_tueste_fin:      dto.id_tueste_fin,
        id_user_inicio_uso: dto.id_user_ingreso,
        id_user_fin_uso:    dto.id_user_ingreso,
        estado:             'FINALIZADO',
        fecha_ingreso:      fechaInicio,
        fecha_inicio_uso:   fechaInicio,
        fecha_fin_uso:      fechaFin,
      },
    });

    return BalonGasEntity.fromObject(balon);
  }

  async getEstadisticas(): Promise<EstadisticasBalonGas> {
    const ultimo = await prisma.balonGas.findFirst({
      orderBy: { fecha_ingreso: 'desc' },
      select: { precio: true },
    });

    const balonesFinalizados = await prisma.balonGas.findMany({
      where: {
        estado: 'FINALIZADO',
        id_tueste_inicio: { not: null },
        id_tueste_fin:    { not: null },
      },
      select: {
        id_balon_gas:  true,
        tueste_inicio: { select: { fecha_tueste: true } },
        tueste_fin:    { select: { fecha_tueste: true } },
      },
    });

    let totalTuestes   = 0;
    let balonesConDatos = 0;

    for (const balon of balonesFinalizados) {
      if (!balon.tueste_inicio?.fecha_tueste || !balon.tueste_fin?.fecha_tueste) continue;

      const count = await prisma.tueste.count({
        where: {
          eliminado: false,
          fecha_tueste: {
            gte: balon.tueste_inicio.fecha_tueste,
            lte: balon.tueste_fin.fecha_tueste,
          },
        },
      });

      totalTuestes += count;
      balonesConDatos++;
    }

    return {
      ultimoPrecio: ultimo?.precio ?? null,
      promedioTuestesPorBalon: balonesConDatos > 0
        ? Math.round((totalTuestes / balonesConDatos) * 10) / 10
        : null,
      totalBalonesFinalizados: balonesFinalizados.length,
    };
  }
}