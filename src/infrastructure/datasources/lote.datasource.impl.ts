import { prisma } from "../../data/postgres";
import { LoteDataSource } from "../../domain/datasources/lote.datasource";
import { CreateLoteDto } from "../../domain/dtos/lote/create";
import { UpdateLoteDto } from "../../domain/dtos/lote/update";
import { LoteEntity } from "../../domain/entities/lote.entity";


export class LoteDataSourceImpl implements LoteDataSource {


  async createLote(createLoteDto: CreateLoteDto): Promise<LoteEntity> {
    const lote = await prisma.lote.create({
      data: createLoteDto!
    });
    console.log('Lote creado en la BD:', lote);
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
    const lote =  this.getLoteById(id);
    const updatedLote = await prisma.lote.update({ 
      where: { id_lote: id },
      data: updateLoteDto.values
    });
    return LoteEntity.fromObject(updatedLote);
  }

  async deleteLote(id: string): Promise<LoteEntity> {
    const lote = this.getLoteById(id);
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




}