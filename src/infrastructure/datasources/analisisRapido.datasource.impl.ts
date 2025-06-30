import { prisma } from "../../data/postgres";
import { AnalisisRapidoDataSource } from "../../domain/datasources/analisisRapido.datasource";
import { CreateAnalisisRapidoDto } from "../../domain/dtos/analisis/rapido/create";
import { UpdateAnalisisRapidoDto } from "../../domain/dtos/analisis/rapido/update";
import { AnalisisRapidoEntity } from "../../domain/entities/analisisRapido.entity";


export  class AnalisisRapidoDataSourceImpl implements AnalisisRapidoDataSource {
  async createAnalisisRapido(createAnalisisRapidoDto: CreateAnalisisRapidoDto): Promise<AnalisisRapidoEntity> {
    const newAnalisisRapido = await prisma.analisisRapido.create({
      data: createAnalisisRapidoDto!
    });
    return AnalisisRapidoEntity.fromObject(newAnalisisRapido);
  }
  async getAnalisisRapidoById(id: string): Promise<AnalisisRapidoEntity | null> {
    const analisisRapido = await prisma.analisisRapido.findUnique({
      where: 
      {
        id_analisis_rapido: id
      }
    });
    if(!analisisRapido) return null;
    return AnalisisRapidoEntity.fromObject(analisisRapido);
  }
  async updateAnalisisRapido(id: string,updateAnalisisRapidoDto:UpdateAnalisisRapidoDto): Promise<AnalisisRapidoEntity> {
    const analisis = this.getAnalisisRapidoById(id);
    const updateAnalisisRapido = await prisma.analisisRapido.update({
      where: {
        id_analisis_rapido: id
      },
      data: updateAnalisisRapidoDto.values!
    });
    return AnalisisRapidoEntity.fromObject(updateAnalisisRapido);
  }

  async deleteAnalisisRapido(id: string): Promise<AnalisisRapidoEntity> {
    const analisis = this.getAnalisisRapidoById(id);
    const deleteAnalisisRapido = await prisma.analisisRapido.update({
      where: {
        id_analisis_rapido: id,

      },
      data: {
        eliminado: true
      }
    });
    return AnalisisRapidoEntity.fromObject(deleteAnalisisRapido);
  }

  async getAllAnalisisRapido(): Promise<AnalisisRapidoEntity[]> {
    const analisisRapido = await prisma.analisisRapido.findMany(
      {
        where: {
          eliminado: false
        }
      }
    );
    return analisisRapido.map((analisis) => AnalisisRapidoEntity.fromObject(analisis));
  }
  
  
    
}
  