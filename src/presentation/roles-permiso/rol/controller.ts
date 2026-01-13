import { Request, Response } from "express";
import { RolRepository } from "../../../domain/repository/rol.repository";
import { CreateRolDto } from "../../../domain/dtos/rol/rol/create";
import { CreateRol } from "../../../domain/usecases/roles-permisos/rol/create";
import { UpdateRol } from "../../../domain/usecases/roles-permisos/rol/update";
import { UpdateRolDto } from "../../../domain/dtos/rol/rol/update";
import { GetAllRoles } from "../../../domain/usecases/roles-permisos/rol/get-all";

export class RolController {

    constructor(
        private readonly rolRepository: RolRepository
    ) {}

    public createRol = async (req: Request, res: Response) => {
        const [error, dto] = CreateRolDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateRol(this.rolRepository)
            .execute(dto!)
            .then(rol => res.json(rol))
            .catch(error => res.status(400).json({ error }));
    };

    public getAllRoles = async (_req: Request, res: Response) => {
        new GetAllRoles(this.rolRepository)
            .execute()
            .then(roles => res.json(roles))
            .catch(error => res.status(400).json({ error }));
    };

    public updateRol = async (req: Request, res: Response) => {
        const { id } = req.params;

        const [error, dto] = UpdateRolDto.update({
            id_rol: id,
            ...req.body
        });
        if (error) return res.status(400).json({ error });

        new UpdateRol(this.rolRepository)
            .execute(id, dto!)
            .then(rol => res.json(rol))
            .catch(error => res.status(400).json({ error }));
    };
}
