import { CreatePaqueteDto } from "../dtos/paquete/create";
import { PaqueteEntity, PaqueteConItemsEntity } from "../entities/paquete.entity";
import { Prisma } from "@prisma/client";

export abstract class PaqueteRepository {
    abstract create(dto: CreatePaqueteDto, numero_correlativo: string): Promise<PaqueteEntity>;
    abstract countTotal(): Promise<number>;
    abstract getById(id_paquete: string): Promise<PaqueteEntity | null>;
    abstract getByIdConItems(id_paquete: string): Promise<PaqueteConItemsEntity | null>;
    abstract getAll(incluirEliminados?: boolean): Promise<PaqueteEntity[]>;
    abstract actualizarEstado(
        id_paquete: string,
        estado: string,
        extra?: { [key: string]: any },
        tx?: Prisma.TransactionClient
    ): Promise<PaqueteEntity>;
    abstract getByPedidoOrigen(id_pedido: string): Promise<PaqueteEntity | null>;
}