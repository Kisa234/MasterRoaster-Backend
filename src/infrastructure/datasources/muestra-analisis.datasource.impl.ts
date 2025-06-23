import { Muestra } from './../../../node_modules/.prisma/client/index.d';
import { prisma } from "../../data/postgres";
import { MuestraAnalisisEntity } from '../../domain/entities/muestra-analisis';
import { CreateMuestraAnalisisDto } from '../../domain/dtos/muestra-analisis/create';
import { MuestraAnalisisDatasource } from '../../domain/datasources/muestra-analisis.datasource';


export  class MuestraAnalisisDatasourceImpl implements MuestraAnalisisDatasource {

  async create(dto: CreateMuestraAnalisisDto): Promise<MuestraAnalisisEntity> {
    const muestraAnalisis = await prisma.muestra_Analisis.create({
        data: dto,
    });
    return MuestraAnalisisEntity.fromObject(muestraAnalisis);
  }
  async findByMuestra(id_muestra: string): Promise<MuestraAnalisisEntity[]> {
    const muestras = await prisma.muestra_Analisis.findMany({
      where: {
        id_muestra: id_muestra
      }
    });
    return muestras.map(muestra => MuestraAnalisisEntity.fromObject(muestra));

  }
  async findByAnalisis(id_analisis: string): Promise<MuestraAnalisisEntity[]> {
    const muestras = await prisma.muestra_Analisis.findMany({
      where: {
        id_analisis: id_analisis
      }
    });
    return muestras.map(muestra => MuestraAnalisisEntity.fromObject(muestra));

  }

}
