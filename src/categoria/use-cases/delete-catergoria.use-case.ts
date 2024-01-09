import { ICategoriaRepository } from '../categoria.repository';
import { Inject } from '@nestjs/common';

export class DeleteCategoriaUseCase {
  constructor(
    @Inject('ICategoriaRepository')
    private readonly categoriaRepo: ICategoriaRepository,
  ) {}
  async execute(id: string) {
    this.categoriaRepo.delete(id);
  }
}
