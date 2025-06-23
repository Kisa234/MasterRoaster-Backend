import { CreateMuestraAnalisisDto } from '../dtos/muestra-analisis/create';
import { MuestraAnalisisEntity } from '../entities/muestra-analisis';


export abstract class MuestraAnalisisRepository  {

  abstract create(data: CreateMuestraAnalisisDto): Promise<MuestraAnalisisEntity> 
  abstract findByMuestra(id_muestra: string): Promise<MuestraAnalisisEntity[]> 
  abstract findByAnalisis(id_analisis: string): Promise<MuestraAnalisisEntity[]> 

}
