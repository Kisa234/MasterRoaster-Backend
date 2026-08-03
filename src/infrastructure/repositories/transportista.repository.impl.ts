import { TransportistaDataSource } from "../../domain/datasources/transportista.datasource";
import { CreateTransportistaDto } from "../../domain/dtos/transportista/create";
import { UpdateTransportistaDto } from "../../domain/dtos/transportista/update";
import { TransportistaEntity } from "../../domain/entities/transportista.entity";
import { TransportistaRepository } from "../../domain/repository/transportista.repository";

export class TransportistaRepositoryImpl implements TransportistaRepository {
    constructor(private readonly datasource: TransportistaDataSource) { }

    create(dto: CreateTransportistaDto): Promise<TransportistaEntity> {
        return this.datasource.create(dto);
    }
    getById(id: string): Promise<TransportistaEntity | null> {
        return this.datasource.getById(id);
    }
    update(id: string, dto: UpdateTransportistaDto): Promise<TransportistaEntity> {
        return this.datasource.update(id, dto);
    }
    delete(id: string): Promise<TransportistaEntity> {
        return this.datasource.delete(id);
    }
    getAll(soloActivos?: boolean): Promise<TransportistaEntity[]> {
        return this.datasource.getAll(soloActivos);
    }
}
