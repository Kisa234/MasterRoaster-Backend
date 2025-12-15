import { BoxTemplateDataSource } from "../../domain/datasources/boxtemplate.datasource";
import { CreateBoxTemplateDto } from "../../domain/dtos/boxes/box-template/create";
import { UpdateBoxTemplateDto } from "../../domain/dtos/boxes/box-template/update";
import { BoxTemplateEntity } from "../../domain/entities/boxtemplate.entity";
import { BoxTemplateRepository } from "../../domain/repository/boxtemplate.repository";

export class BoxTemplateRepositoryImpl implements BoxTemplateRepository {

    constructor(
        private readonly datasource: BoxTemplateDataSource
    ) {}

    createBoxTemplate(dto: CreateBoxTemplateDto): Promise<BoxTemplateEntity> {
        return this.datasource.createBoxTemplate(dto);
    }

    getBoxTemplateById(id_box_template: string): Promise<BoxTemplateEntity | null> {
        return this.datasource.getBoxTemplateById(id_box_template);
    }

    updateBoxTemplate(id_box_template: string, dto: UpdateBoxTemplateDto): Promise<BoxTemplateEntity> {
        return this.datasource.updateBoxTemplate(id_box_template, dto);
    }

    deleteBoxTemplate(id_box_template: string): Promise<BoxTemplateEntity> {
        return this.datasource.deleteBoxTemplate(id_box_template);
    }

    getAllBoxTemplates(): Promise<BoxTemplateEntity[]> {
        return this.datasource.getAllBoxTemplates();
    }

    setActiveTemplateUseCase(id_box_template: string): Promise<void> {
        return this.datasource.setActiveTemplateUseCase(id_box_template);
    }

    getActiveBoxTemplate(): Promise<BoxTemplateEntity | null> {
        return this.datasource.getActiveBoxTemplate();
    }
}
