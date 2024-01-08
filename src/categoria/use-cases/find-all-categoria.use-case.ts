import { ICategoriaRepository } from '../categoria.repository';
import { Inject } from '@nestjs/common';

export class FindAllCategoriaUseCase {
  constructor(
    @Inject('ICategoriaRepository')
    private readonly categoriaRepo: ICategoriaRepository,
  ) {}
  execute() {
    return this.categoriaRepo.findAll();
  }
}
