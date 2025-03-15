import { AnalisisRapidoEntity } from "../entities/analisisRapido.entity";
import { CreateAnalisisRapidoDto } from '../dtos/analisis/rapido/create';
import { UpdateAnalisisDto } from '../dtos/analisis/analisis/update';
import { UpdateAnalisisRapidoDto } from "../dtos/analisis/rapido/update";

export abstract class AnalisisRapidoDataSource {
    abstract createAnalisisRapido(createAnalisisRapidoDto:CreateAnalisisRapidoDto): Promise<AnalisisRapidoEntity>;
    abstract getAnalisisRapidoById(id: string): Promise<AnalisisRapidoEntity | null>;
    abstract updateAnalisisRapido(id: string, updateAnalisisRapidoDto:UpdateAnalisisRapidoDto): Promise<AnalisisRapidoEntity>;
  }
  