import { Inject } from '@nestjs/common';
import { ICategoriaRepository } from '../categoria.repository';

export class FindByIdCategoriaUseCase {
  constructor(
    @Inject('ICategoriaRepository')
    private readonly categoriaRepo: ICategoriaRepository,
  ) {}
  execute(id: string) {
    return this.categoriaRepo.findById(id);
  }
}
