import { TuesteDataSource } from "../../domain/datasources/tueste.datasource";
import { TuesteEntity } from "../../domain/entities/tueste.entity";
import { CreateTuesteDto } from '../../domain/dtos/tueste/create';
import { prisma } from "../../data/postgres";
import { UpdateTuesteDto } from '../../domain/dtos/tueste/update';

export class TuesteDataSourceImpl implements TuesteDataSource {
  
  async createTueste(createTuesteDto:CreateTuesteDto): Promise<TuesteEntity> {
    const newTueste =  await prisma.tueste.create({
      data: createTuesteDto!
    });
    return TuesteEntity.fromObject(newTueste);
  }
  async getTuesteById(id: string): Promise<TuesteEntity | null> {
    const tueste = await prisma.tueste.findFirst({
      where: {
        id_tueste: id,
        eliminado: false
      }
    });
    if (!tueste) return null;
    return TuesteEntity.fromObject(tueste);
  }
  async updateTueste(id: string, updateTuesteDto:UpdateTuesteDto): Promise<TuesteEntity> {
    const tueste = this.getTuesteById(id);
    const updatedTueste = await prisma.tueste.update({
      where: { id_tueste: id },
      data: updateTuesteDto.values
    });
    return TuesteEntity.fromObject(updatedTueste);
  }
  async deleteTueste(id: string): Promise<TuesteEntity> {
    const tueste = this.getTuesteById(id);
    const tuesteEliminado = await prisma.tueste.update({
      where: { id_tueste: id },
      data: { eliminado: true }
    });
    return TuesteEntity.fromObject(tuesteEliminado);
  }
  async getTostadosByFecha(fecha: Date): Promise<TuesteEntity[]> {
    const tuestes = await prisma.tueste.findMany({
      where: {
        fecha_tueste: fecha,
        eliminado: false
      }
    });
    return tuestes.map(TuesteEntity.fromObject);
  }
  async getAllTuestes(): Promise<TuesteEntity[]> {
    const tuestes = await prisma.tueste.findMany({
      where: {
        eliminado: false
      }
    });
    return tuestes.map(TuesteEntity.fromObject);
  }
   
}