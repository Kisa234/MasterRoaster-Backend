import { prisma } from "../../data/postgres";
import { AnalisisSensorialDataSource } from "../../domain/datasources/analisisSensorial.datasource";
import { CreateAnalisisSensorialDTO } from "../../domain/dtos/analisis/sensorial/create";
import { UpdateAnalisisSensorialDTO } from "../../domain/dtos/analisis/sensorial/update";
import { AnalisisSensorialEntity } from "../../domain/entities/analisisSensorial.entity";


export abstract class AnalisisSensorialDataSourceImpl implements AnalisisSensorialDataSource {
  
  async createAnalisisSensorial(createAnalisisSensorialDTO: CreateAnalisisSensorialDTO): Promise<AnalisisSensorialEntity> {
    const newAnalisisSensorial = await prisma.analisisSensorial.create({
      data: createAnalisisSensorialDTO!
    });
    return AnalisisSensorialEntity.fromObject(newAnalisisSensorial);
  }
  async getAnalisisSensorialById(id: string): Promise<AnalisisSensorialEntity | null> {
    const analisisSensorial = await prisma.analisisSensorial.findUnique({
      where: 
      {
        id_analisis_sensorial: id
      }
    });
    if(!analisisSensorial) return null;
    return AnalisisSensorialEntity.fromObject(analisisSensorial);
  }
  async updateAnalisisSensorial(id: string, updateAnalisisSensorialDTO: UpdateAnalisisSensorialDTO): Promise<AnalisisSensorialEntity> {
    const analisis = this.getAnalisisSensorialById(id);
    const updateAnalisisSensorial = await prisma.analisisSensorial.update({
      where: {
        id_analisis_sensorial: id
      },
      data: updateAnalisisSensorialDTO!
    });
    return AnalisisSensorialEntity.fromObject(updateAnalisisSensorial);
  }
  
    
}