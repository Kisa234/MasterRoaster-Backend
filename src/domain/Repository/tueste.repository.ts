import { CompleteTuesteDto } from "../dtos/tueste/complete";
import { CreateTuesteDto } from "../dtos/tueste/create";
import { UpdateTuesteDto } from "../dtos/tueste/update";
import { TuesteEntity } from "../entities/tueste.entity";

export abstract class TuesteRepository {
    abstract createTueste(createTuesteDto:CreateTuesteDto): Promise<TuesteEntity>;
    abstract getTuesteById(id: string): Promise<TuesteEntity|null>;
    abstract updateTueste(id: string, updateTuesteDto:UpdateTuesteDto): Promise<TuesteEntity>;
    abstract deleteTueste(id: string): Promise<TuesteEntity>;
    abstract getTostadosByFecha(fecha: Date): Promise<TuesteEntity[]>;
    abstract getAllTuestes(): Promise<TuesteEntity[]>;
    abstract getTostadosByPedido(id_pedido: string): Promise<TuesteEntity[]>;
    abstract completarTueste(id: string,completeTuesteDto:CompleteTuesteDto): Promise<TuesteEntity>;            
}