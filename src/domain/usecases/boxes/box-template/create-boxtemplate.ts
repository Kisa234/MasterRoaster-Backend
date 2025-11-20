import { BoxTemplateRepository } from "../../../repository/boxtemplate.repository";
import { BoxOpcionRepository } from "../../../repository/boxopcion.repository";

import { BoxTemplateEntity } from "../../../entities/boxtemplate.entity";
import { CreateBoxTemplateDto } from "../../../dtos/boxes/box-template/create";
import { CreateBoxOpcionDto } from "../../../dtos/boxes/box-opcion/create";
import { CreateFullBoxTemplateDto } from "../../../dtos/boxes/box-template/create-full";

export interface CreateBoxTemplateUseCase {
  execute(data: CreateFullBoxTemplateDto): Promise<BoxTemplateEntity>;
}

export class CreateBoxTemplate implements CreateBoxTemplateUseCase {

  constructor(
    private readonly boxTemplateRepository: BoxTemplateRepository,
    private readonly boxOpcionRepository: BoxOpcionRepository,
  ) {}

  async execute(data: CreateFullBoxTemplateDto): Promise<BoxTemplateEntity> {

    // 1️⃣ Construir el DTO SOLO del template
    const [errorTemplate, templateDto] = CreateBoxTemplateDto.create({
      nombre: data.nombre,
      descripcion: data.descripcion,
      activo: data.activo,
      cafe_fijo_1: data.cafe_fijo_1,
      tueste_fijo_1: data.tueste_fijo_1,
      cafe_fijo_2: data.cafe_fijo_2,
      tueste_fijo_2: data.tueste_fijo_2,
    });

    if (errorTemplate) throw new Error(errorTemplate);

    
    // 2️⃣ Crear el template primero
    const template = await this.boxTemplateRepository.createBoxTemplate(templateDto!);
    await this.boxTemplateRepository.setActiveTemplateUseCase(template.id_box_template);
    
    // 3️⃣ Crear cada opción usando el repositorio existente
    for (const op of data.opciones) {

      const [errorOpcion, opcionDto] = CreateBoxOpcionDto.create({
        id_box_template: template.id_box_template,
        id_cafe: op.id_cafe,
        tuestes: op.tuestes,
      });

      if (errorOpcion) throw new Error(errorOpcion);

      await this.boxOpcionRepository.createBoxOpcion(opcionDto!);
    }

    // 4️⃣ Devolver solo el template (como querías)
    return template;
  }
}
