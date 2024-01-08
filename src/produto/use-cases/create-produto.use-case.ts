import { Produto } from '../entities/produto.entity';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { IProdutoRepository } from '../produto.repository';
import { Inject } from '@nestjs/common';

export class CreateProdutoUseCase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepo: IProdutoRepository,
  ) {}
  async execute(input: CreateProdutoDto) {
    const produto = new Produto(input);
    await this.produtoRepo.create(produto);
    return produto;
  }
}
