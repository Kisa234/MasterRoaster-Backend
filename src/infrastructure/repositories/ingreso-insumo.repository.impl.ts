import { CreateIngresoInsumoDto } from "../../domain/dtos/ingreso-insumo/create";
import { UpdateIngresoInsumoDto } from "../../domain/dtos/ingreso-insumo/update";
import { IngresoInsumoEntity } from "../../domain/entities/ingreso-insumo.entity";
import { IngresoInsumoRepository } from "../../domain/repository/ingreso-insumo.repository";
import { IngresoInsumoDatasource } from "../../domain/datasources/ingreso-insumo.datasource";

export class IngresoInsumoRepositoryImpl implements IngresoInsumoRepository {

  constructor(
    private readonly datasource: IngresoInsumoDatasource
  ) {}

  createIngreso(createIngresoDto: CreateIngresoInsumoDto): Promise<IngresoInsumoEntity> {
    return this.datasource.createIngreso(createIngresoDto);
  }

  getByAlmacen(id_almacen: string): Promise<IngresoInsumoEntity[]> {
    return this.datasource.getByAlmacen(id_almacen);
  }

  getByInsumo(id_insumo: string): Promise<IngresoInsumoEntity[]> {
    return this.datasource.getByInsumo(id_insumo);
  }

  updateIngreso(id_ingreso: string, updateIngresoDto: UpdateIngresoInsumoDto): Promise<IngresoInsumoEntity> {
    return this.datasource.updateIngreso(id_ingreso, updateIngresoDto);
  }
}