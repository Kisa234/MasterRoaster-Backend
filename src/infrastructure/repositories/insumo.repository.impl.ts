import { InsumoDataSource } from "../../domain/datasources/insumo.datasource";
import { CreateInsumoDto } from "../../domain/dtos/insumo/create";
import { UpdateInsumoDto } from "../../domain/dtos/insumo/update";
import { InsumoConInventariosEntity, InsumoEntity } from "../../domain/entities/insumo.entity";
import { InsumoRepository } from "../../domain/repository/insumo.repository";

export class InsumoRepositoryImpl implements InsumoRepository {

  constructor(
    private readonly insumo: InsumoDataSource
  ) { }


  createInsumo(createInsumoDto: CreateInsumoDto): Promise<InsumoEntity> {
    return this.insumo.createInsumo(createInsumoDto);
  }

  getInsumoById(id_insumo: string): Promise<InsumoEntity | null> {
    return this.insumo.getInsumoById(id_insumo);
  }

  updateInsumo(id_insumo: string, updateInsumoDto: UpdateInsumoDto): Promise<InsumoEntity> {
    return this.insumo.updateInsumo(id_insumo, updateInsumoDto);
  }

  deleteInsumo(id_insumo: string): Promise<InsumoEntity> {
    return this.insumo.deleteInsumo(id_insumo);
  }

  getAllInsumos(): Promise<InsumoEntity[]> {
    return this.insumo.getAllInsumos();
  }

  getInsumosActivos(): Promise<InsumoEntity[]> {
    return this.insumo.getInsumosActivos();
  }

  getInsumosConInventarios(): Promise<InsumoConInventariosEntity[]> {
    return this.insumo.getInsumosConInventarios();
  }
  getInsumoConInventariosById(id_insumo: string): Promise<InsumoConInventariosEntity | null> {
    return this.insumo.getInsumoConInventariosById(id_insumo);
  }
}

