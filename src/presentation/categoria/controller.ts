import { Request, Response } from "express";
import { CategoriaRepository } from "../../domain/repository/categoria.repository";
import { CreateCategoriaDto } from "../../domain/dtos/categoria/create";
import { UpdateCategoriaDto } from "../../domain/dtos/categoria/update";
import { CreateCategoria } from "../../domain/usecases/categoria/create";
import { GetCategoriaById } from "../../domain/usecases/categoria/get-by-id";
import { UpdateCategoria } from "../../domain/usecases/categoria/update";
import { DeleteCategoria } from "../../domain/usecases/categoria/delete";
import { GetAllCategorias } from "../../domain/usecases/categoria/get-all";

export class CategoriaController {
    constructor(
        private readonly categoriaRepository: CategoriaRepository
    ) { }

    public createCategoria = async (req: Request, res: Response) => {
        const [error, dto] = CreateCategoriaDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateCategoria(this.categoriaRepository)
            .execute(dto!)
            .then(categoria => res.json(categoria))
            .catch(error => res.status(400).json({ error }));
    };

    public getCategoriaById = async (req: Request, res: Response) => {
        const { id } = req.params;
        new GetCategoriaById(this.categoriaRepository)
            .execute(id)
            .then(categoria => res.json(categoria))
            .catch(error => res.status(400).json({ error }));
    };

    public getCategorias = async (_req: Request, res: Response) => {
        new GetAllCategorias(this.categoriaRepository)
            .execute()
            .then(categorias => res.json(categorias))
            .catch(error => res.status(400).json({ error }));
    };

    public updateCategoria = async (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, dto] = UpdateCategoriaDto.update(req.body);
        if (error) return res.status(400).json({ error });

        new UpdateCategoria(this.categoriaRepository)
            .execute(id, dto!)
            .then(categoria => res.json(categoria))
            .catch(error => res.status(400).json({ error }));
    };

    public deleteCategoria = async (req: Request, res: Response) => {
        const { id } = req.params;
        new DeleteCategoria(this.categoriaRepository)
            .execute(id)
            .then(categoria => res.json(categoria))
            .catch(error => res.status(400).json({ error }));
    };
}