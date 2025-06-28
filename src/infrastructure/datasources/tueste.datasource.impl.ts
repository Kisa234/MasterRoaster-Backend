import { TuesteDataSource } from "../../domain/datasources/tueste.datasource";
import { TuesteEntity } from "../../domain/entities/tueste.entity";
import { CreateTuesteDto } from '../../domain/dtos/tueste/create';
import { prisma } from "../../data/postgres";
import { UpdateTuesteDto } from '../../domain/dtos/tueste/update';
import { CompleteTuesteDto } from '../../domain/dtos/tueste/complete';

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
  async completarTueste(id: string, completeTuesteDto:CompleteTuesteDto): Promise<TuesteEntity> {
    const tueste = await this.getTuesteById(id);

    const tuesteCompletado = await prisma.tueste.update({
      where: { id_tueste: id },
      data:  completeTuesteDto.values
    });
    return TuesteEntity.fromObject(tuesteCompletado);
  }
  async deleteTueste(id: string): Promise<TuesteEntity> {
    const tueste = this.getTuesteById(id);
    const tuesteEliminado = await prisma.tueste.delete({
      where: { id_tueste: id }
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
        eliminado: false,
        estado_tueste: { not: 'Completado' }

      }
    });
    return tuestes.map(TuesteEntity.fromObject);
  }
  async getTostadosByPedido(id_pedido: string): Promise<TuesteEntity[]> {
    const tuestes = await prisma.tueste.findMany({
      where: {
        id_pedido: id_pedido,
        eliminado: false
      }
    });
    return tuestes.map(TuesteEntity.fromObject);
  }

  async getTostadosByLoteTostado(id_lote_tostado: string): Promise<TuesteEntity[]> {
    const tuestes = await prisma.tueste.findMany({
      where: {
        id_lote_tostado: id_lote_tostado,
        eliminado: false
      }
    });
    return tuestes.map(TuesteEntity.fromObject);
  }

  
}