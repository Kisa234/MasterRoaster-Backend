import { CreateCategoriaDto } from "../../dtos/categoria/create";
import { CategoriaEntity } from "../../entities/categoria.entity";
import { CategoriaRepository } from "../../repository/categoria.repository";

export interface CreateCategoriaUseCase {
  execute(data: CreateCategoriaDto): Promise<CategoriaEntity>;
}

export class CreateCategoria implements CreateCategoriaUseCase {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async execute(data: CreateCategoriaDto): Promise<CategoriaEntity> {

    // 1️⃣ Obtenemos todas las categorías (incluidas las eliminadas lógicamente)
    const allCategorias = await this.categoriaRepository.getAllCategorias();

    // 2️⃣ Generamos el nuevo ID secuencial
    const nextNumber = allCategorias.length + 1;
    const newId = `CAT${nextNumber.toString().padStart(3, "0")}`;

    // 3️⃣ Creamos la categoría con ese ID
    const [e,dto] = CreateCategoriaDto.create({
      id_categoria: newId,
      nombre: data.nombre,
      descripcion: data.descripcion,
    });


    return this.categoriaRepository.createCategoria(dto!);
  }
}
