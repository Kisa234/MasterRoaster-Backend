import { prisma } from "../../data/postgres";
import { CreateIngresoInsumoDto } from "../../domain/dtos/ingreso-insumo/create";
import { UpdateIngresoInsumoDto } from "../../domain/dtos/ingreso-insumo/update";
import { IngresoInsumoEntity } from "../../domain/entities/ingreso-insumo.entity";
import { IngresoInsumoDatasource } from "../../domain/datasources/ingreso-insumo.datasource";

export class IngresoInsumoDataSourceImpl implements IngresoInsumoDatasource {

  async createIngreso(dto: CreateIngresoInsumoDto): Promise<IngresoInsumoEntity> {
    const ingreso = await prisma.ingresoInsumo.create({
      data: dto
    });

    return IngresoInsumoEntity.fromObject(ingreso);
  }

  async getByAlmacen(id_almacen: string): Promise<IngresoInsumoEntity[]> {
    const ingresos = await prisma.ingresoInsumo.findMany({
      where: { id_almacen },
      orderBy: { fecha_ingreso: 'desc' }
    });

    return ingresos.map(ingreso => IngresoInsumoEntity.fromObject(ingreso));
  }

  async getByInsumo(id_insumo: string): Promise<IngresoInsumoEntity[]> {
    const ingresos = await prisma.ingresoInsumo.findMany({
      where: { id_insumo },
      orderBy: { fecha_ingreso: 'desc' }
    });

    return ingresos.map(ingreso => IngresoInsumoEntity.fromObject(ingreso));
  }

  async updateIngreso(id_ingreso: string, updateIngresoDto: UpdateIngresoInsumoDto): Promise<IngresoInsumoEntity> {
    const ingreso = await prisma.ingresoInsumo.update({
      where: { id_ingreso },
      data: updateIngresoDto.values
    });

    return IngresoInsumoEntity.fromObject(ingreso);
  }
}