import { prisma } from '../../data/postgres';

import { BalonGasDatasource } from '../../domain/datasources/balon-gas.datasource';
import { CreateBalonGasDto } from '../../domain/dtos/balon-gas/create-balon-gas';
import { FinalizeBalonGasDto } from '../../domain/dtos/balon-gas/finalize-balon-gas';
import { StartBalonGasDto } from '../../domain/dtos/balon-gas/start-balon-gas';
import { BalonGasEntity } from '../../domain/entities/balon-gas.entity';


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
      where: {
        id_balon_gas,
      },
      data: {
        ...data,
        estado: 'EN_USO',
        fecha_inicio_uso: new Date(),
      },
    });

    return BalonGasEntity.fromObject(balon);
  }

  async finalize(dto: FinalizeBalonGasDto): Promise<BalonGasEntity> {
    const { id_balon_gas, ...data } = dto;

    const balon = await prisma.balonGas.update({
      where: {
        id_balon_gas,
      },
      data: {
        ...data,
        estado: 'FINALIZADO',
        fecha_fin_uso: new Date(),
      },
    });

    return BalonGasEntity.fromObject(balon);
  }

  async getAll(): Promise<BalonGasEntity[]> {
    const balones = await prisma.balonGas.findMany({
      orderBy: {
        fecha_ingreso: 'desc',
      },
    });

    return balones.map(BalonGasEntity.fromObject);
  }

  async getById(id_balon_gas: string): Promise<BalonGasEntity> {
    const balon = await prisma.balonGas.findUnique({
      where: {
        id_balon_gas,
      },
    });

    if (!balon) throw `Balón de gas con id ${id_balon_gas} no existe`;

    return BalonGasEntity.fromObject(balon);
  }

  async getActual(): Promise<BalonGasEntity | null> {
    const balon = await prisma.balonGas.findFirst({
      where: {
        estado: 'EN_USO',
      },
    });

    if (!balon) return null;

    return BalonGasEntity.fromObject(balon);
  }

}