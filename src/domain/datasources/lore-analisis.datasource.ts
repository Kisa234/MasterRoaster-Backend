import { CreateLoteAnalisisDto } from '../dtos/lote-analisis/create';
import { LoteAnalisisEntity } from '../entities/lote-analisis';


export abstract class LoteAnalisisDatasource  {

  abstract create(data: CreateLoteAnalisisDto): Promise<LoteAnalisisEntity> 
  abstract findByLote(id_lote: string): Promise<LoteAnalisisEntity[]> 
  abstract findByAnalisis(id_analisis: string): Promise<LoteAnalisisEntity[]> 

}
