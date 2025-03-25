import { Request, Response } from "express";

import { MuestraRepository } from "../../domain/repository/muestra.repository";
import { CreateMuestraDto } from "../../domain/dtos/muestra/create";
import { CreateMuestra } from "../../domain/usecases/muestra/create-muestra";
import { GetMuestra } from "../../domain/usecases/muestra/get-muestra";
import { UpdateMuestraDto } from '../../domain/dtos/muestra/update';
import { UpdateMuestra } from "../../domain/usecases/muestra/update-muestra";
import { DeleteMuestra } from "../../domain/usecases/muestra/detele-muestra";

export class MuestraController {
    
    constructor(private readonly muestraRepository: MuestraRepository) {}

    async createMuestra(req: Request, res: Response) {
        const [error, createMuestraDto] = CreateMuestraDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new CreateMuestra(this.muestraRepository)
            .execute(createMuestraDto!)
            .then( muestra => res.json(muestra))
            .catch( error => res.status(400).json({ error }));
            
    }

    async getMuestraById(req: Request, res: Response) {
        new GetMuestra(this.muestraRepository)
            .execute(req.params.id)
            .then( muestra => res.json(muestra))
            .catch( error => res.status(400).json({ error }));

    }

    async updateMuestra(req: Request, res: Response) {
        const id_muestra = req.params.id;
        const [error, updateMuestraDto ] = UpdateMuestraDto.update({...req.body,'id_muestra': id_muestra});
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdateMuestra(this.muestraRepository)
            .execute(id_muestra,updateMuestraDto!)
            .then( muestra => res.json(muestra))
            .catch( error => res.status(400).json({ error }));


    }

    async deleteMuestra(req: Request, res: Response) {
        const id_muestra = req.params.id;
        new DeleteMuestra(this.muestraRepository)
            .execute(id_muestra)
            .then( muestra => res.json(muestra))
            .catch( error => res.status(400).json({ error }));
    }
}