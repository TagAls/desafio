import { Inject } from '@nestjs/common';
import { ICategoriaRepository } from '../categoria.repository';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';

export class UpdateCategoriaUseCase {
  constructor(
    @Inject('ICategoriaRepository')
    private readonly categoriaRepo: ICategoriaRepository,
  ) {}
  async execute(id: string, input: UpdateCategoriaDto) {
    const categoria = await this.categoriaRepo.findById(id);
    input.nome && (categoria.nome = input.nome);
    input.juros && (categoria.juros = input.juros);
    return this.categoriaRepo.update(categoria);
  }
}
