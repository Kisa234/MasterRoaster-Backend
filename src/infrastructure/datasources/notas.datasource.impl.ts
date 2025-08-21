import { PrismaClient } from "@prisma/client";
import { NotasDataSource } from "../../domain/datasources/notas.datasource";
import { NotasEntity } from "../../domain/entities/notas.entity";
import { CreateNotasDto } from "../../domain/dtos/notas/create";
import { UpdateNotasDto } from "../../domain/dtos/notas/update";

const prisma = new PrismaClient();

export class NotasDataSourceImpl implements NotasDataSource {

  async createNotas(dto: CreateNotasDto): Promise<NotasEntity> {

    const newNota = await prisma.notas.create({
      data: dto
    });
    return NotasEntity.fromObject(newNota);
    
  }

  async getNotasById(id: string): Promise<NotasEntity | null> {

    const notas = await prisma.notas.findUnique({ where: { id } });
    if (!notas) return null;
    return NotasEntity.fromObject(notas);
  
  }

  async updateNotas(id: string, updateNotasDto: UpdateNotasDto): Promise<NotasEntity> {

    const updatedNota = await prisma.notas.update({
      where: { id },
      data: updateNotasDto.values,
    });
    return NotasEntity.fromObject(updatedNota);

  }

  async deleteNotas(id: string): Promise<NotasEntity> {

    const deletedNota = await prisma.notas.delete({ where: { id } });
    return NotasEntity.fromObject(deletedNota);

  }

  async getAllNotas(): Promise<NotasEntity[]> {

    const notas = await prisma.notas.findMany();
    return notas.map(NotasEntity.fromObject);

  }
}
