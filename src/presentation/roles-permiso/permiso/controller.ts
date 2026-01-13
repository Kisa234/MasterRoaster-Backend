import { Request, Response } from "express";
import { CreatePermisoDto } from "../../../domain/dtos/rol/permiso/create";
import { PermisoRepository } from "../../../domain/repository/permiso.repository";
import { CreatePermiso } from "../../../domain/usecases/roles-permisos/permiso/create";
import { GetAllPermisos } from "../../../domain/usecases/roles-permisos/permiso/get-all";
import { UpdatePermisoDto } from "../../../domain/dtos/rol/permiso/update";
import { UpdatePermiso } from "../../../domain/usecases/roles-permisos/permiso/update";

export class PermisoController {

    constructor(
        private readonly permisoRepository: PermisoRepository
    ) {}

    public createPermiso = async (req: Request, res: Response) => {
        const [error, dto] = CreatePermisoDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreatePermiso(this.permisoRepository)
            .execute(dto!)
            .then(permiso => res.json(permiso))
            .catch(error => res.status(400).json({ error }));
    };

    public getAllPermisos = async (_req: Request, res: Response) => {
        new GetAllPermisos(this.permisoRepository)
            .execute()
            .then(permisos => res.json(permisos))
            .catch(error => res.status(400).json({ error }));
    };

    public updatePermiso = async (req: Request, res: Response) => {
        const { id } = req.params;

        const [error, dto] = UpdatePermisoDto.update({
            id_permiso: id,
            ...req.body
        });
        if (error) return res.status(400).json({ error });

        new UpdatePermiso(this.permisoRepository)
            .execute(id, dto!)
            .then(permiso => res.json(permiso))
            .catch(error => res.status(400).json({ error }));
    };
}
