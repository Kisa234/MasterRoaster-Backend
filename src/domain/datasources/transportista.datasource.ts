import { CreateTransportistaDto } from "../dtos/transportista/create";
import { UpdateTransportistaDto } from "../dtos/transportista/update";
import { TransportistaEntity } from "../entities/transportista.entity";

export abstract class TransportistaDataSource {
    abstract create(dto: CreateTransportistaDto): Promise<TransportistaEntity>;
    abstract getById(id: string): Promise<TransportistaEntity | null>;
    abstract update(id: string, dto: UpdateTransportistaDto): Promise<TransportistaEntity>;
    abstract delete(id: string): Promise<TransportistaEntity>; // soft delete: activo = false
    abstract getAll(soloActivos?: boolean): Promise<TransportistaEntity[]>;
}
