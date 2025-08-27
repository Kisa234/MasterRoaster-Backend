import { prisma } from "../../data/postgres";
import { FichaEnvioEntity } from '../../domain/entities/fichaEnvio.entity';
import { CreateFichaEnvioDto } from '../../domain/dtos/envio/fichaEnvio/create';
import { UpdateFichaEnvioDto } from '../../domain/dtos/envio/fichaEnvio/update';
import { FichaEnvioDataSource } from '../../domain/datasources/fichaEnvio.datasource';


export class FichaEnvioDataSourceImpl implements FichaEnvioDataSource {

  async create(dto: CreateFichaEnvioDto): Promise<FichaEnvioEntity> {
    const row = await prisma.fichaEnvio.create({
      data: dto
    });
    return FichaEnvioEntity.fromObject(row);
  }

  async getByEnvio(id_envio: string): Promise<FichaEnvioEntity | null> {
    const row = await prisma.fichaEnvio.findUnique({
      where: { id_envio }, // id_envio es @unique en Prisma
    });
    return row ? FichaEnvioEntity.fromObject(row) : null;
  }

  async updateByEnvio(id_envio: string, dto: UpdateFichaEnvioDto): Promise<FichaEnvioEntity> {
    const row = await prisma.fichaEnvio.update({
      where: { id_envio },
      data: {
        ...dto.values,
        fecha_editado: new Date(),
      },
    });
    return FichaEnvioEntity.fromObject(row);
  }

  async deleteByEnvio(id_envio: string): Promise<void> {
    await prisma.fichaEnvio.delete({ where: { id_envio } });
  }

  async getById(id_ficha: string): Promise<FichaEnvioEntity | null> {
    const row = await prisma.fichaEnvio.findUnique({ where: { id_ficha } });
    return row ? FichaEnvioEntity.fromObject(row) : null;
  }

  async deleteById(id_ficha: string): Promise<void> {
    await prisma.fichaEnvio.delete({ where: { id_ficha } });
  }
}
