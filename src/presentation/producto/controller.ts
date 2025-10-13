import { Request, Response } from "express";
import { ProductoRepository } from "../../domain/repository/producto.repository";
import { CreateProductoDto } from "../../domain/dtos/producto/create";
import { UpdateProductoDto } from "../../domain/dtos/producto/update";

export class ProductoController {
  constructor(private readonly productoRepository: ProductoRepository) {}

  public createProducto = async (req: Request, res: Response) => {
    const [error, createProductoDto] = CreateProductoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.productoRepository.createProducto(createProductoDto!)
      .then(producto => res.status(201).json(producto))
      .catch(error => res.status(400).json({ error }));
  };

  public getProductoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    this.productoRepository.getProductoById(id)
      .then(producto => {
        if (!producto) return res.status(404).json({ error: "No encontrado" });
        res.json(producto);
      })
      .catch(error => res.status(400).json({ error }));
  };

  public getAllProductos = async (_req: Request, res: Response) => {
    this.productoRepository.getAllProductos()
      .then(productos => res.json(productos))
      .catch(error => res.status(400).json({ error }));
  };

  public updateProducto = async (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateProductoDto] = UpdateProductoDto.update(req.body);
    if (error) return res.status(400).json({ error });

    this.productoRepository.updateProducto(id, updateProductoDto!)
      .then(producto => res.json(producto))
      .catch(error => res.status(400).json({ error }));
  };

  public deleteProducto = async (req: Request, res: Response) => {
    const id = req.params.id;
    this.productoRepository.deleteProducto(id)
      .then(producto => res.json(producto))
      .catch(error => res.status(400).json({ error }));
  };
}
