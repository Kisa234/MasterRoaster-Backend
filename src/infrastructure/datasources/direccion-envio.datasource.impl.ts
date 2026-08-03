import { prisma } from "../../data/postgres";
import { DireccionEnvioDataSource } from "../../domain/datasources/direccion-envio.datasource";
import { CreateDireccionEnvioDto } from "../../domain/dtos/direccion-envio/create";
import { DireccionEnvioEntity } from "../../domain/entities/direccion-envio.entity";

export class DireccionEnvioDataSourceImpl implements DireccionEnvioDataSource {

    async create(dto: CreateDireccionEnvioDto): Promise<DireccionEnvioEntity> {
        const direccion = await prisma.direccionEnvio.create({
            data: {
                id_envio: dto.id_envio,
                nombre_destinatario: dto.nombre_destinatario,
                telefono: dto.telefono,
                direccion: dto.direccion,
                distrito: dto.distrito,
                provincia: dto.provincia,
                departamento: dto.departamento,
                pais: dto.pais,
                codigo_postal: dto.codigo_postal,
                referencia: dto.referencia,
                observaciones: dto.observaciones,
            },
        });
        return DireccionEnvioEntity.fromObject(direccion);
    }

    async getByEnvio(id_envio: string): Promise<DireccionEnvioEntity | null> {
        const direccion = await prisma.direccionEnvio.findUnique({ where: { id_envio } });
        if (!direccion) return null;
        return DireccionEnvioEntity.fromObject(direccion);
    }
}
