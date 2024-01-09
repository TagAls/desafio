import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoUseCaseController } from './produto-use-case.controller';
import { CreateProdutoUseCase } from './use-cases/create-produto.use-case';
import { FindAllProdutoUseCase } from './use-cases/find-all-produto.use-case';
import { FindByIdProdutoUseCase } from './use-cases/find-by-id-produto.use-case';
import { ProdutoTypeOrmRepository } from './produto.repository';
import { CalculoParcelaUseCase } from './use-cases/calcula-parcela-produto.use-case';
import { Categoria } from '../categoria/entities/categoria.entity';
import { CategoriaTypeOrmRepository } from '../categoria/categoria.repository';
import { UpdateProdutoUseCase } from './use-cases/update-produto.use-case';
import { DeleteProdutoUseCase } from './use-cases/delete-produto.use-case';

@Module({
  controllers: [ProdutoUseCaseController],
  providers: [
    CreateProdutoUseCase,
    FindAllProdutoUseCase,
    FindByIdProdutoUseCase,
    CalculoParcelaUseCase,
    UpdateProdutoUseCase,
    DeleteProdutoUseCase,
    ProdutoTypeOrmRepository,
    {
      provide: 'IProdutoRepository',
      useExisting: ProdutoTypeOrmRepository,
    },
    CategoriaTypeOrmRepository,
    {
      provide: 'ICategoriaRepository',
      useExisting: CategoriaTypeOrmRepository,
    },
  ],
  imports: [TypeOrmModule.forFeature([Produto, Categoria])],
})
export class ProdutoModule {}
