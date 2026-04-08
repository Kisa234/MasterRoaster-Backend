import { PrismaClient } from '@prisma/client';
import { prisma } from '../../data/postgres';
import { CreateMarcaDto } from '../../domain/dtos/marca/create';
import { MarcaEntity } from '../../domain/entities/marca.entity';
import { MarcaDatasource } from '../../domain/datasources/marca.datasource';
import { UpdateMarcaDto } from '../../domain/dtos/marca/update';

export class MarcaDatasourceImpl implements MarcaDatasource {

  async create(dto: CreateMarcaDto): Promise<MarcaEntity> {
    const marca = await prisma.marca.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
      },
    });

    return MarcaEntity.fromObject(marca);
  }

  async getAll(): Promise<MarcaEntity[]> {
    const marcas = await prisma.marca.findMany({
      orderBy: { nombre: 'asc' },
    });

    return marcas.map(MarcaEntity.fromObject);
  }

  async getById(id_marca: string): Promise<MarcaEntity | null> {
    const marca = await prisma.marca.findUnique({
      where: { id_marca },
    });

    return marca ? MarcaEntity.fromObject(marca) : null;
  }

  async update(id_marca: string, dto: UpdateMarcaDto): Promise<MarcaEntity> {
    const marca = await prisma.marca.update({
      where: { id_marca },
      data: dto.values, 
    });

    return MarcaEntity.fromObject(marca);
  }

  async delete(id_marca: string): Promise<MarcaEntity> {
    // Soft delete (recomendado)
    const marca = await prisma.marca.update({
      where: { id_marca },
      data: {
        activo: false,
        fecha_editado: new Date(),
      },
    });

    return MarcaEntity.fromObject(marca);
  }
}