import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

export interface IProdutoRepository {
  create(produto: Produto): Promise<void>;
  update(produto: Produto): Promise<void>;
  findAll(): Promise<Produto[]>;
  findById(id: string): Promise<Produto>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class ProdutoTypeOrmRepository implements IProdutoRepository {
  constructor(
    @InjectRepository(Produto)
    private typeOrmRepo: Repository<Produto>,
  ) {}
  async create(produto: Produto): Promise<void> {
    await this.typeOrmRepo.save(produto);
  }
  async update(produto: Produto): Promise<void> {
    await this.typeOrmRepo.update(produto.id, produto);
  }
  findAll(): Promise<Produto[]> {
    return this.typeOrmRepo.find();
  }
  findById(id: string): Promise<Produto> {
    return this.typeOrmRepo.findOne({ where: { id } });
  }
  async delete(id: string): Promise<void> {
    await this.typeOrmRepo.delete(id);
  }
}
