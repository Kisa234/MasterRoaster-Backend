import { prisma } from '../../data/postgres';

import { BalonGasDatasource } from '../../domain/datasources/balon-gas.datasource';
import { CreateBalonGasDto } from '../../domain/dtos/balon-gas/create-balon-gas';
import { FinalizeBalonGasDto } from '../../domain/dtos/balon-gas/finalize-balon-gas';
import { StartBalonGasDto } from '../../domain/dtos/balon-gas/start-balon-gas';
import { BalonGasEntity, EstadisticasBalonGas } from '../../domain/entities/balon-gas.entity';


export class BalonGasDatasourceImpl implements BalonGasDatasource {

  async create(dto: CreateBalonGasDto): Promise<BalonGasEntity> {
    const balon = await prisma.balonGas.create({
      data: {
        ...dto,
        estado: 'DISPONIBLE',
        fecha_ingreso: new Date(),
      },
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

  async getEstadisticas(): Promise<EstadisticasBalonGas> {

    // 1. Precio del último balón comprado (por fecha_ingreso)
    const ultimo = await prisma.balonGas.findFirst({
      orderBy: { fecha_ingreso: 'desc' },
      select: { precio: true },
    });

    // 2. Balones finalizados con sus tuestes de inicio y fin
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

    let totalTuestes = 0;
    let balonesConDatos = 0;

    for (const balon of balonesFinalizados) {
      if (!balon.tueste_inicio?.fecha_tueste || !balon.tueste_fin?.fecha_tueste) continue;

      const fechaInicio = balon.tueste_inicio.fecha_tueste;
      const fechaFin    = balon.tueste_fin.fecha_tueste;

      // Contar batches (filas de Tueste) entre fecha inicio y fecha fin inclusive
      const count = await prisma.tueste.count({
        where: {
          eliminado: false,
          fecha_tueste: {
            gte: fechaInicio,
            lte: fechaFin,
          },
        },
      });

      totalTuestes += count;
      balonesConDatos++;
    }

    const promedioTuestesPorBalon = balonesConDatos > 0
      ? Math.round((totalTuestes / balonesConDatos) * 10) / 10
      : null;

    return {
      ultimoPrecio:           ultimo?.precio ?? null,
      promedioTuestesPorBalon,
      totalBalonesFinalizados: balonesFinalizados.length,
    };
  }
}