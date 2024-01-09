import { IProdutoRepository } from '../produto.repository';
import { Inject } from '@nestjs/common';
import { UpdateProdutoDto } from '../dto/update-produto.dto';

export class UpdateProdutoUseCase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepo: IProdutoRepository,
  ) {}
  async execute(id: string, input: UpdateProdutoDto) {
    const produto = await this.produtoRepo.findById(id);
    input.nome && (produto.nome = input.nome);
    input.descricao && (produto.descricao = input.descricao);
    input.valor && (produto.valor = input.valor);
    input.idCategoria && (produto.idCategoria = input.idCategoria);
    this.produtoRepo.update(produto);
    return produto;
  }
}
