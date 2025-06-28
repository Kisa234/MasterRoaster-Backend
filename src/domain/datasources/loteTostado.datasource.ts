import { LoteTostadoEntity } from "../entities/loteTostado.entity";
import { CreateLoteTostadoDto } from '../dtos/lotes/lote-tostado/create';
import { UpdateLoteTostadoDto } from "../dtos/lotes/lote-tostado/update";
import { FichaTueste } from "../entities/ficha-tueste.entity";

export abstract class LoteTostadoDataSource {
    abstract createLoteTostado(createLoteTostadoDto:CreateLoteTostadoDto): Promise<LoteTostadoEntity>;
    abstract getLoteTostadoById(id: string): Promise<LoteTostadoEntity| null>;
    abstract updateLoteTostado(id: string, updateLoteTostadoDto:UpdateLoteTostadoDto): Promise<LoteTostadoEntity>;
    abstract deleteLoteTostado(id: string): Promise<LoteTostadoEntity>;
    abstract getLoteTostados(): Promise<LoteTostadoEntity[]>;
    abstract getLotesTostadoByLoteId(id: string): Promise<LoteTostadoEntity[]>;
}