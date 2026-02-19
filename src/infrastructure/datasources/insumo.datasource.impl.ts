import { prisma } from "../../data/postgres";
import { InsumoDataSource } from "../../domain/datasources/insumo.datasource";
import { CreateInsumoDto } from "../../domain/dtos/insumo/create";
import { UpdateInsumoDto } from "../../domain/dtos/insumo/update";
import { InsumoEntity } from "../../domain/entities/insumo.entity";

export class InsumoDataSourceImpl implements InsumoDataSource {

  async createInsumo(createInsumoDto: CreateInsumoDto): Promise<InsumoEntity> {
    const newInsumo = await prisma.insumo.create({
      data: createInsumoDto as any
    });

    return InsumoEntity.fromObject(newInsumo);
  }

  async getInsumoById(id_insumo: string): Promise<InsumoEntity | null> {
    const insumo = await prisma.insumo.findUnique({
      where: { id_insumo }
    });

    if (!insumo) throw new Error("Insumo not found");

    return InsumoEntity.fromObject(insumo);
  }

  async updateInsumo(id_insumo: string, updateInsumoDto: UpdateInsumoDto): Promise<InsumoEntity> {
    const insumo = await this.getInsumoById(id_insumo);

    const updated = await prisma.insumo.update({
      where: { id_insumo },
      data: updateInsumoDto.values
    });

    return InsumoEntity.fromObject(updated);
  }

  async deleteInsumo(id_insumo: string): Promise<InsumoEntity> {
    const insumo = await this.getInsumoById(id_insumo);

    const deleted = await prisma.insumo.delete({
      where: { id_insumo }
    });

    return InsumoEntity.fromObject(deleted);
  }

  async getAllInsumos(): Promise<InsumoEntity[]> {
    const insumos = await prisma.insumo.findMany();
    return insumos.map(i => InsumoEntity.fromObject(i));
  }

  async getInsumosActivos(): Promise<InsumoEntity[]> {
    const insumos = await prisma.insumo.findMany({
      where: { activo: true }
    });

    return insumos.map(i => InsumoEntity.fromObject(i));
  }
}
