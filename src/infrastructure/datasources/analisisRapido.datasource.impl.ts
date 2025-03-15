import { prisma } from "../../data/postgres";
import { AnalisisRapidoDataSource } from "../../domain/datasources/analisisRapido.datasource";
import { UpdateAnalisisDto } from "../../domain/dtos/analisis/analisis/update";
import { CreateAnalisisRapidoDto } from "../../domain/dtos/analisis/rapido/create";
import { AnalisisRapidoEntity } from "../../domain/entities/analisisRapido.entity";


export abstract class AnalisisRapidoDataSourceImpl implements AnalisisRapidoDataSource {
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
  async updateAnalisisRapido(id: string, updateAnalisisDto: UpdateAnalisisDto): Promise<AnalisisRapidoEntity> {
    const analisis = this.getAnalisisRapidoById(id);
    const updateAnalisisRapido = await prisma.analisisRapido.update({
      where: {
        id_analisis_rapido: id
      },
      data: updateAnalisisDto!
    });
    return AnalisisRapidoEntity.fromObject(updateAnalisisRapido);
  }
  
    
}
  