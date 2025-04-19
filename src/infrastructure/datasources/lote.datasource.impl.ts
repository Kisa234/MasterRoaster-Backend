import { prisma } from "../../data/postgres";
import { LoteDataSource } from "../../domain/datasources/lote.datasource";
import { CreateLoteDto } from '../../domain/dtos/lotes/lote/create';
import { UpdateLoteDto } from "../../domain/dtos/lotes/lote/update";
import { LoteEntity } from "../../domain/entities/lote.entity";


export class LoteDataSourceImpl implements LoteDataSource {


  async createLote(createLoteDto: CreateLoteDto): Promise<LoteEntity> {
    const lote = await prisma.lote.create({
      data: createLoteDto!
    });

    return LoteEntity.fromObject(lote);
  }

  async getLoteById(id: string): Promise<LoteEntity | null> {
    const lote = await prisma.lote.findUnique({
      where: {
        id_lote: id,
        eliminado: false
      }
    });
    if (!lote) return null;
    return LoteEntity.fromObject(lote);
  }

  async updateLote(id: string, updateLoteDto: UpdateLoteDto): Promise<LoteEntity> {
    const lote =  await this.getLoteById(id);
    const updatedLote = await prisma.lote.update({ 
      where: { id_lote: id },
      data: updateLoteDto.values
    });
    return LoteEntity.fromObject(updatedLote);
  }

  async deleteLote(id: string): Promise<LoteEntity> {
    const lote = await this.getLoteById(id);
    const deletedLote = await prisma.lote.update({
      where: {id_lote: id},
      data: {eliminado: true}
    });
    return LoteEntity.fromObject(deletedLote);
  }

  async getLotes(): Promise<LoteEntity[]> {
    const lotes = await prisma.lote.findMany({
      where: {
        eliminado: false,
      }
    });
    return lotes.map(lote => LoteEntity.fromObject(lote));
    
  }

  async createLoteFromMuestra(id: string,peso:number ): Promise<LoteEntity> {
    const Muestra = await prisma.muestra.findUnique({
      where: {
        id_muestra: id,
        eliminado: false
      }
    });
    if (!Muestra) throw new Error("No existe la muestra");


    const lote = await prisma.lote.create({
      data: {
        id_lote: Muestra.id_muestra,
        productor: Muestra.productor,
        finca : Muestra.finca,
        region: Muestra.region,
        departamento: Muestra.departamento,
        peso: peso,
        variedades: Muestra.variedades,
        proceso: Muestra.proceso,
        id_analisis: Muestra.id_analisis,
        id_user: Muestra.id_user,
      }
    });

    await prisma.muestra.update({
      where: { id_muestra: id },
      data: { eliminado: true }
    });

    return LoteEntity.fromObject(lote);
  }


}