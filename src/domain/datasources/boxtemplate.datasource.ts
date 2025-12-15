import { CreateBoxTemplateDto } from "../dtos/boxes/box-template/create";
import { UpdateBoxTemplateDto } from "../dtos/boxes/box-template/update";
import { BoxTemplateEntity } from "../entities/boxtemplate.entity";

export abstract class BoxTemplateDataSource {
  abstract createBoxTemplate(dto: CreateBoxTemplateDto): Promise<BoxTemplateEntity>;
  abstract getBoxTemplateById(id_box_template: string): Promise<BoxTemplateEntity | null>;
  abstract updateBoxTemplate(id_box_template: string, dto: UpdateBoxTemplateDto): Promise<BoxTemplateEntity>;
  abstract deleteBoxTemplate(id_box_template: string): Promise<BoxTemplateEntity>;
  abstract getAllBoxTemplates(): Promise<BoxTemplateEntity[]>;
  abstract setActiveTemplateUseCase(id_box_template: string): Promise<void>;
  abstract getActiveBoxTemplate(): Promise<BoxTemplateEntity | null>;
}
