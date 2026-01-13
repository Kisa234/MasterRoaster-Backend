import { Request, Response } from "express";
import { RolPermisoRepository } from "../../../domain/repository/rol-permiso.repository";
import { RolRepository } from "../../../domain/repository/rol.repository";
import { PermisoRepository } from "../../../domain/repository/permiso.repository";
import { CreateRolPermisoDto } from "../../../domain/dtos/rol/rol-permiso/create";
import { AssignPermisoToRol } from "../../../domain/usecases/roles-permisos/rol-permiso/assign-rol-permiso";
import { RemovePermisoFromRol } from "../../../domain/usecases/roles-permisos/rol-permiso/remove-rol-permiso";
import { GetPermisosByRol } from "../../../domain/usecases/roles-permisos/rol-permiso/get-rol-permiso";

export class RolPermisoController {

    constructor(
        private readonly rolPermisoRepository: RolPermisoRepository,
        private readonly rolRepository: RolRepository,
        private readonly permisoRepository: PermisoRepository
    ) {}

    public assignPermiso = async (req: Request, res: Response) => {
        const [error, dto] = CreateRolPermisoDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new AssignPermisoToRol(
            this.rolPermisoRepository,
            this.rolRepository,
            this.permisoRepository
        )
            .execute(dto!)
            .then(result => res.json(result))
            .catch(error => res.status(400).json({ error }));
    };

    public removePermiso = async (req: Request, res: Response) => {
        const { id_rol, id_permiso } = req.params;

        new RemovePermisoFromRol(this.rolPermisoRepository)
            .execute(id_rol, id_permiso)
            .then(result => res.json(result))
            .catch(error => res.status(400).json({ error }));
    };

    public getPermisosByRol = async (req: Request, res: Response) => {
        const { id_rol } = req.params;

        new GetPermisosByRol(this.rolPermisoRepository)
            .execute(id_rol)
            .then(permisos => res.json(permisos))
            .catch(error => res.status(400).json({ error }));
    };
}
