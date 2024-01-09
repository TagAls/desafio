import { IProdutoRepository } from '../produto.repository';
import { Inject } from '@nestjs/common';

export class DeleteProdutoUseCase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepo: IProdutoRepository,
  ) {}
  async execute(id: string) {
    this.produtoRepo.delete(id);
  }
}
