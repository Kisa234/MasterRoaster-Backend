import { NotasEntity } from "../entities/notas.entity";
import { CreateNotasDto } from "../dtos/notas/create";
import { UpdateNotasDto } from "../dtos/notas/update";

export abstract class NotasDataSource {
  abstract createNotas(createNotasDto: CreateNotasDto): Promise<NotasEntity>;
  abstract getNotasById(id: string): Promise<NotasEntity | null>;
  abstract updateNotas(id: string, updateNotasDto: UpdateNotasDto): Promise<NotasEntity>;
  abstract deleteNotas(id: string): Promise<NotasEntity>;
  abstract getAllNotas(): Promise<NotasEntity[]>;
}
