import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoUseCaseController } from './produto-use-case.controller';
import { CreateProdutoUseCase } from './use-cases/create-produto.use-case';
import { FindAllProdutoUseCase } from './use-cases/find-all-produto.use-case';
import { FindByIdProdutoUseCase } from './use-cases/find-by-id-produto.use-case';
import { ProdutoTypeOrmRepository } from './produto.repository';

@Module({
  controllers: [ProdutoUseCaseController],
  providers: [
    ProdutoService,
    CreateProdutoUseCase,
    FindAllProdutoUseCase,
    FindByIdProdutoUseCase,
    ProdutoTypeOrmRepository,
    {
      provide: 'IProdutoRepository',
      useExisting: ProdutoTypeOrmRepository,
    },
  ],
  imports: [TypeOrmModule.forFeature([Produto])],
})
export class ProdutoModule {}
