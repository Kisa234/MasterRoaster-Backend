import { Request, Response } from "express";
import { ProductoRepository } from "../../domain/repository/producto.repository";
import { CreateProductoDto } from "../../domain/dtos/producto/create";
import { UpdateProductoDto } from "../../domain/dtos/producto/update";
import { CreateProducto } from "../../domain/usecases/producto/creates";
import { GetProductoById } from "../../domain/usecases/producto/get-by-id";
import { GetAllProductos } from "../../domain/usecases/producto/get-all";
import { UpdateProducto } from "../../domain/usecases/producto/update";
import { DeleteProducto } from "../../domain/usecases/producto/delete";

export class ProductoController {
    constructor(private readonly productoRepository: ProductoRepository) {}

    public createProducto = async (req: Request, res: Response) => {
        const [error, dto] = CreateProductoDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateProducto(this.productoRepository)
            .execute(dto!)
            .then(producto => res.json(producto))
            .catch(error => res.status(400).json({ error }));
    };

    public getProductoById = async (req: Request, res: Response) => {
        const { id } = req.params;
        new GetProductoById(this.productoRepository)
            .execute(id)
            .then(producto => res.json(producto))
            .catch(error => res.status(400).json({ error }));
    };

    public getAllProductos = async (_req: Request, res: Response) => {
        new GetAllProductos(this.productoRepository)
            .execute()
            .then(productos => res.json(productos))
            .catch(error => res.status(400).json({ error }));
    };

    public updateProducto = async (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, dto] = UpdateProductoDto.update(req.body);
        if (error) return res.status(400).json({ error });

        new UpdateProducto(this.productoRepository)
            .execute(id, dto!)
            .then(producto => res.json(producto))
            .catch(error => res.status(400).json({ error }));
    };

    public deleteProducto = async (req: Request, res: Response) => {
        const { id } = req.params;
        new DeleteProducto(this.productoRepository)
            .execute(id)
            .then(producto => res.json(producto))
            .catch(error => res.status(400).json({ error }));
    };
}
