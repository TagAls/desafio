import { IProdutoRepository } from '../produto.repository';
import { Inject } from '@nestjs/common';

export class FindAllProdutoUseCase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepo: IProdutoRepository,
  ) {}
  execute() {
    return this.produtoRepo.findAll();
  }
}
