export abstract class TuesteDatasource {
    abstract getTuesteById(id: string): Promise<any>;
    abstract getTuestes(): Promise<any[]>;
    abstract createTueste(tueste: any): Promise<any>;
    abstract updateTueste(tueste: any): Promise<any>;
    abstract deleteTueste(id: string): Promise<any>;
    
}