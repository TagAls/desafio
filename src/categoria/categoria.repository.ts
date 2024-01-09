import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

export interface ICategoriaRepository {
  create(categoria: Categoria): Promise<void>;
  update(categoria: Categoria): Promise<void>;
  findAll(): Promise<Categoria[]>;
  findById(id: string): Promise<Categoria>;
  findByName(nome: string): Promise<Categoria>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class CategoriaTypeOrmRepository implements ICategoriaRepository {
  constructor(
    @InjectRepository(Categoria)
    private typeOrmRepo: Repository<Categoria>,
  ) {}
  async create(categoria: Categoria): Promise<void> {
    await this.typeOrmRepo.save(categoria);
  }
  async update(categoria: Categoria): Promise<void> {
    await this.typeOrmRepo.update(categoria.id, categoria);
  }
  findAll(): Promise<Categoria[]> {
    return this.typeOrmRepo.find();
  }
  findById(id: string): Promise<Categoria> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }
  async findByName(nome: string): Promise<Categoria> {
    return await this.typeOrmRepo.findOne({ where: { nome } });
  }
  async delete(id: string): Promise<void> {
    this.typeOrmRepo.delete(id);
  }
}
