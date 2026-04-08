import { CreateIngresoInsumoDto } from '../dtos/ingreso-insumo/create';
import { UpdateIngresoInsumoDto } from '../dtos/ingreso-insumo/update';
import { IngresoInsumoEntity } from '../entities/ingreso-insumo.entity';

export abstract class IngresoInsumoDatasource {
  abstract createIngreso(createIngresoDto: CreateIngresoInsumoDto): Promise<IngresoInsumoEntity>;
  abstract getByAlmacen(id_almacen: string): Promise<IngresoInsumoEntity[]>;
  abstract getByInsumo(id_insumo: string): Promise<IngresoInsumoEntity[]>;
  abstract updateIngreso(id_ingreso: string, updateIngresoDto: UpdateIngresoInsumoDto): Promise<IngresoInsumoEntity>;
}