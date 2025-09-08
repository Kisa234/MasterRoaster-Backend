import { MuestraRepository } from '../../domain/repository/muestra.repository';
import { MuestraDataSource } from '../../domain/datasources/muestra.datasource';
import { CreateMuestraDto } from '../../domain/dtos/muestra/create';
import { UpdateMuestraDto } from '../../domain/dtos/muestra/update';
import { MuestraEntity } from '../../domain/entities/muestra.entity';

export class MuestraRepositoryImpl implements MuestraRepository{

    constructor(
        private readonly muestraDataSource: MuestraDataSource
    ){}
    createMuestra(createMuestraDto: CreateMuestraDto): Promise<MuestraEntity> {
        return this.muestraDataSource.createMuestra(createMuestraDto);
    }
    getMuestraById(id: string): Promise<MuestraEntity | null> {
        return this.muestraDataSource.getMuestraById(id);
    }
    updateMuestra(id: string, updateMuestraDto: UpdateMuestraDto): Promise<MuestraEntity> {
        return this.muestraDataSource.updateMuestra(id, updateMuestraDto);
    }
    deleteMuestra(id: string): Promise<MuestraEntity> {
        return this.muestraDataSource.deleteMuestra(id);
    }
    getMuestras(): Promise<MuestraEntity[]> {
        return this.muestraDataSource.getMuestras();
    }
    getAllMuestras(): Promise<MuestraEntity[]> {
        return this.muestraDataSource.getAllMuestras();
    }
    completeMuestra(id: string): Promise<MuestraEntity> {
        return this.muestraDataSource.completeMuestra(id);
    }

}