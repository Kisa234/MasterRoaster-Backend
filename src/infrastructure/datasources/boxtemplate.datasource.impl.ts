import { prisma } from "../../data/postgres";
import { BoxTemplateDataSource } from "../../domain/datasources/boxtemplate.datasource";
import { CreateBoxTemplateDto } from "../../domain/dtos/boxes/box-template/create";
import { UpdateBoxTemplateDto } from "../../domain/dtos/boxes/box-template/update";
import { BoxTemplateEntity } from "../../domain/entities/boxtemplate.entity";

export class BoxTemplateDataSourceImpl implements BoxTemplateDataSource {

    async createBoxTemplate(dto: CreateBoxTemplateDto): Promise<BoxTemplateEntity> {
        const newBox = await prisma.boxTemplate.create({
            data: dto
        });
        return BoxTemplateEntity.fromObject(newBox);
    }

    async getBoxTemplateById(id_box_template: string): Promise<BoxTemplateEntity | null> {
        const box = await prisma.boxTemplate.findFirst({
            where: { id_box_template }
        });
        return box ? BoxTemplateEntity.fromObject(box) : null;
    }

    async updateBoxTemplate(id_box_template: string, dto: UpdateBoxTemplateDto): Promise<BoxTemplateEntity> {
        const updated = await prisma.boxTemplate.update({
            where: { id_box_template },
            data: dto.values
        });
        return BoxTemplateEntity.fromObject(updated);
    }

    async deleteBoxTemplate(id_box_template: string): Promise<BoxTemplateEntity> {
        const deleted = await prisma.boxTemplate.update({
            where: { id_box_template },
            data: { eliminado: true, activo: false }
        });
        return BoxTemplateEntity.fromObject(deleted);
    }

    async getAllBoxTemplates(): Promise<BoxTemplateEntity[]> {
        const boxes = await prisma.boxTemplate.findMany({
            orderBy: { fecha_creado: "desc" },
            where: { eliminado: false }
        });
        return boxes.map(BoxTemplateEntity.fromObject);
    }

    async setActiveTemplateUseCase(id_box_template: string): Promise<void> {
        await  this.getBoxTemplateById(id_box_template);
        
        await prisma.boxTemplate.updateMany({
            data: { activo: false }
        });
        await prisma.boxTemplate.update({
            where: { id_box_template },
            data: { activo: true }
        });
    }

    async getActiveBoxTemplate(): Promise<BoxTemplateEntity | null> {
        const box =  await prisma.boxTemplate.findFirst({
            where: { activo: true, eliminado: false }
        });
        return box ? BoxTemplateEntity.fromObject(box) : null;
    }
}
