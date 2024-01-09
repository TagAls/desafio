import { Inject } from '@nestjs/common';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { Categoria } from '../entities/categoria.entity';
import { ICategoriaRepository } from '../categoria.repository';

export class CreateCategoriaUseCase {
  constructor(
    @Inject('ICategoriaRepository')
    private readonly categoriaRepo: ICategoriaRepository,
  ) {}
  async execute(input: CreateCategoriaDto) {
    const categoriaExistente = await this.categoriaRepo.findByName(input.nome);
    if (categoriaExistente != null) {
      return 'Já existe uma categoria com esse nome cadastrado';
    }
    const categoria = new Categoria(input);
    await this.categoriaRepo.create(categoria);
    return categoria;
  }
}
