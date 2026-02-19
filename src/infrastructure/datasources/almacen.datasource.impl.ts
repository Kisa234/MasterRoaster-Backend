import { prisma } from "../../data/postgres";
import { AlmacenDataSource } from "../../domain/datasources/almacen.datasource";
import { CreateAlmacenDto } from "../../domain/dtos/almacen/almacen/create";
import { UpdateAlmacenDto } from "../../domain/dtos/almacen/almacen/update";
import { AlmacenEntity } from "../../domain/entities/almacen.entity";

export class AlmacenDataSourceImpl implements AlmacenDataSource {

  async createAlmacen(createAlmacenDto: CreateAlmacenDto): Promise<AlmacenEntity> {

    const newAlmacen = await prisma.almacen.create({
      data: createAlmacenDto as any
    });

    return AlmacenEntity.fromObject(newAlmacen);
  }

  async getAlmacenById(id_almacen: string): Promise<AlmacenEntity | null> {

    const almacen = await prisma.almacen.findUnique({
      where: { id_almacen }
    });

    if (!almacen) throw new Error("Almacen not found");

    return AlmacenEntity.fromObject(almacen);
  }

  async updateAlmacen(id_almacen: string, updateAlmacenDto: UpdateAlmacenDto): Promise<AlmacenEntity> {

    const almacen = await this.getAlmacenById(id_almacen);

    const updatedAlmacen = await prisma.almacen.update({
      where: { id_almacen },
      data: updateAlmacenDto.values
    });

    return AlmacenEntity.fromObject(updatedAlmacen);
  }

  async deleteAlmacen(id_almacen: string): Promise<AlmacenEntity> {

    const almacen = await this.getAlmacenById(id_almacen);

    const deletedAlmacen = await prisma.almacen.delete({
      where: { id_almacen }
    });

    return AlmacenEntity.fromObject(deletedAlmacen);
  }

  async getAllAlmacenes(): Promise<AlmacenEntity[]> {

    const almacenes = await prisma.almacen.findMany();

    return almacenes.map((a) => AlmacenEntity.fromObject(a));
  }

  async getAlmacenesActivos(): Promise<AlmacenEntity[]> {

    const almacenes = await prisma.almacen.findMany({
      where: { activo: true }
    });

    return almacenes.map((a) => AlmacenEntity.fromObject(a));
  }
}
