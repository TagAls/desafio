import { Produto } from '../entities/produto.entity';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { IProdutoRepository } from '../produto.repository';
import { Inject } from '@nestjs/common';
import { ICategoriaRepository } from 'src/categoria/categoria.repository';

export class CreateProdutoUseCase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepo: IProdutoRepository,
    @Inject('ICategoriaRepository')
    private readonly categoriaRepo: ICategoriaRepository,
  ) {}
  async execute(input: CreateProdutoDto) {
    const produto = new Produto(input);
    const categoria = await this.categoriaRepo.findById(produto.idCategoria);
    if (categoria) {
      await this.produtoRepo.create(produto);
      return produto;
    } else {
      throw new Error();
    }
  }
}
