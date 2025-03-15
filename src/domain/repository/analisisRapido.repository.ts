import { UpdateAnalisisDto } from "../dtos/analisis/analisis/update";
import { CreateAnalisisRapidoDto } from "../dtos/analisis/rapido/create";
import { UpdateAnalisisRapidoDto } from "../dtos/analisis/rapido/update";
import { AnalisisRapidoEntity } from "../entities/analisisRapido.entity";

export abstract class AnalisisRapidoRepository {
  
      abstract createAnalisisRapido(createAnalisisRapidoDto:CreateAnalisisRapidoDto): Promise<AnalisisRapidoEntity>;
      abstract getAnalisisRapidoById(id: string): Promise<AnalisisRapidoEntity | null>;
      abstract updateAnalisisRapido(id: string, updateAnalisisRapidoDto:UpdateAnalisisRapidoDto): Promise<AnalisisRapidoEntity>;  
}
  