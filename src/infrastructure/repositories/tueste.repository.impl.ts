import { TuesteDataSource } from '../../domain/datasources/tueste.datasource';
import { CompleteTuesteDto } from '../../domain/dtos/tueste/complete';
import { CreateTuesteDto } from '../../domain/dtos/tueste/create';
import { UpdateTuesteDto } from '../../domain/dtos/tueste/update';
import { TuesteEntity } from '../../domain/entities/tueste.entity';
import { TuesteRepository } from '../../domain/repository/tueste.repository';


export class TuesteRepositoryImpl implements TuesteRepository{

    constructor(
        private readonly tuesteDataSource: TuesteDataSource
    ) { }
    
    createTueste(createTuesteDto: CreateTuesteDto): Promise<TuesteEntity> {
        return this.tuesteDataSource.createTueste(createTuesteDto);
    }
    getTuesteById(id: string): Promise<TuesteEntity | null> {
        return this.tuesteDataSource.getTuesteById(id); 
    }
    updateTueste(id: string, updateTuesteDto: UpdateTuesteDto): Promise<TuesteEntity> {
        return this.tuesteDataSource.updateTueste(id, updateTuesteDto);
    }
    deleteTueste(id: string): Promise<TuesteEntity> {
        return this.tuesteDataSource.deleteTueste(id);
    }
    getTostadosByFecha(fecha: Date): Promise<TuesteEntity[]> {
        return this.tuesteDataSource.getTostadosByFecha(fecha);
    }
    getAllTuestes(): Promise<TuesteEntity[]> {
        return this.tuesteDataSource.getAllTuestes();
    }
    getTostadosByPedido(id_pedido: string): Promise<TuesteEntity[]> {
        return this.tuesteDataSource.getTostadosByPedido(id_pedido);
    }
    completarTueste(id: string,completeTuesteDto:CompleteTuesteDto): Promise<TuesteEntity> {
        return this.tuesteDataSource.completarTueste(id,completeTuesteDto);
    }
    getTostadosByLoteTostado(id_lote_tostado: string): Promise<TuesteEntity[]> {
        return this.tuesteDataSource.getTostadosByLoteTostado(id_lote_tostado);
    }
    
    
    
}