import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto) private produtoRepo: Repository<Produto>,
  ) {}

  create(createProdutoDto: CreateProdutoDto) {
    const produto = new Produto(createProdutoDto);
    return this.produtoRepo.save(produto);
  }

  findAll() {
    return this.produtoRepo.find();
  }

  findById(id: string) {
    return this.produtoRepo.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.produtoRepo.findOneOrFail({ where: { id } });
    updateProdutoDto.nome && (produto.nome = updateProdutoDto.nome);
    updateProdutoDto.descricao &&
      (produto.descricao = updateProdutoDto.descricao);
    updateProdutoDto.valor && (produto.valor = updateProdutoDto.valor);
    updateProdutoDto.idCategoria &&
      (produto.idCategoria = updateProdutoDto.idCategoria);
    this.produtoRepo.save(produto);
  }

  remove(id: string) {
    return `This action removes a #${id} produto`;
  }
}
