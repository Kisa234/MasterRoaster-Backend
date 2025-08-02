import { VariedadDataSource } from "../../domain/datasources/variedad.datasource";
import { CreateVariedadDto } from "../../domain/dtos/variedades/create";
import { UpdateVariedadDto } from "../../domain/dtos/variedades/update";
import { VariedadEntity } from "../../domain/entities/variedad.entity";
import { VariedadRepository } from "../../domain/repository/variedad.repository";

export class VariedadRepositoryImpl implements VariedadRepository {

    constructor(
        private readonly datasource: VariedadDataSource
    ){}

    createVariedad(createVariedadDto: CreateVariedadDto): Promise<VariedadEntity> {
        return this.datasource.createVariedad(createVariedadDto);
    }
    updateVariedad(id: string, updateVariedadDto: UpdateVariedadDto): Promise<VariedadEntity> {
        return this.datasource.updateVariedad(id, updateVariedadDto);
    }
    deleteVariedad(id: string): Promise<VariedadEntity> {
        return this.datasource.deleteVariedad(id);
    }
    getAllVariedades(): Promise<VariedadEntity[]> {
        return this.datasource.getAllVariedades();
    }
    findByNombre(nombre: string): Promise<VariedadEntity | null> {
        return this.datasource.findByNombre(nombre);
    }

  
}