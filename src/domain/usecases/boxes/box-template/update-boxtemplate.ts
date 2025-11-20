import { UpdateFullBoxTemplateDto } from "../../../dtos/boxes/box-template/update-full";
import { BoxTemplateEntity } from "../../../entities/boxtemplate.entity";
import { BoxTemplateRepository } from "../../../repository/boxtemplate.repository";
import { BoxOpcionRepository } from "../../../repository/boxopcion.repository";
import { UpdateBoxTemplateDto } from "../../../dtos/boxes/box-template/update";

export interface UpdateBoxTemplateUseCase {
    execute(id: string, data: UpdateFullBoxTemplateDto): Promise<BoxTemplateEntity>;
}

export class UpdateBoxTemplate implements UpdateBoxTemplateUseCase {

    constructor(
        private readonly templateRepository: BoxTemplateRepository,
        private readonly opcionRepository: BoxOpcionRepository
    ) { }

    async execute(id: string, data: UpdateFullBoxTemplateDto): Promise<BoxTemplateEntity> {

        console.log('UpdateBoxTemplateUseCase.execute data:', data);

        // 1️⃣ Separar opciones
        const opciones = data.opciones ?? [];

        // 2️⃣ Crear DTO propio del template
        const [errorUpdate, templateDto] = UpdateBoxTemplateDto.update({
            nombre: data.nombre,
            descripcion: data.descripcion,
            activo: data.activo,
            cafe_fijo_1: data.cafe_fijo_1,
            tueste_fijo_1: data.tueste_fijo_1,
            cafe_fijo_2: data.cafe_fijo_2,
            tueste_fijo_2: data.tueste_fijo_2,
        });

        if (errorUpdate) throw new Error(errorUpdate);

        // 3️⃣ Actualizar Template con templateDto.values
        const updatedTemplate = await this.templateRepository.updateBoxTemplate(
            id,
            templateDto!
        );

        // 4️⃣ Eliminar opciones actuales
        const opcionesExistentes = await this.opcionRepository.getOpcionByTemplate(id);
        for (const op of opcionesExistentes) {
            await this.opcionRepository.deleteBoxOpcion(op.id_opcion);
        }

        // 5️⃣ Crear nuevas opciones
        for (const op of opciones) {
            await this.opcionRepository.createBoxOpcion({
                id_box_template: id,
                id_cafe: op.id_cafe,
                tuestes: op.tuestes
            });
        }

        return updatedTemplate;
    }
}

