import { MuestraAnalisisDatasource } from "../../domain/datasources/muestra-analisis.datasource";
import { CreateMuestraAnalisisDto } from "../../domain/dtos/muestra-analisis/create";
import { MuestraAnalisisEntity } from "../../domain/entities/muestra-analisis";
import { MuestraAnalisisRepository } from "../../domain/repository/muestra-analisis.repository";


export  class MuestraAnalisisRespositoryImpl implements MuestraAnalisisRepository {
  constructor(
    private readonly muestraAnalisisDatasource: MuestraAnalisisDatasource
  ){}

  create(data: CreateMuestraAnalisisDto): Promise<MuestraAnalisisEntity> {
    return this.muestraAnalisisDatasource.create(data);
  }
  findByMuestra(id_muestra: string): Promise<MuestraAnalisisEntity[]> {
    return this.muestraAnalisisDatasource.findByMuestra(id_muestra);
  }
  findByAnalisis(id_analisis: string): Promise<MuestraAnalisisEntity[]> {
    return this.muestraAnalisisDatasource.findByAnalisis(id_analisis);
  }

}
