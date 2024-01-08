import { Inject } from '@nestjs/common';
import { IProdutoRepository } from '../produto.repository';

export class FindByIdProdutoUseCase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepo: IProdutoRepository,
  ) {}
  execute(id: string) {
    return this.produtoRepo.findById(id);
  }
}
