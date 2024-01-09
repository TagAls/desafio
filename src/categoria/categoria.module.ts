import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaUseCase } from './use-cases/create-categoria.use-case';
import { FindAllCategoriaUseCase } from './use-cases/find-all-categoria.use-case';
import { FindByIdCategoriaUseCase } from './use-cases/find-by-id-categoria.use-case';
import { CategoriaTypeOrmRepository } from './categoria.repository';
import { CategoriaUseCaseController } from './categoria-use-case.controller';
import { UpdateCategoriaUseCase } from './use-cases/update-categoria.use-case';

@Module({
  controllers: [CategoriaUseCaseController],
  providers: [
    CreateCategoriaUseCase,
    FindAllCategoriaUseCase,
    FindByIdCategoriaUseCase,
    CategoriaTypeOrmRepository,
    UpdateCategoriaUseCase,
    {
      provide: 'ICategoriaRepository',
      useExisting: CategoriaTypeOrmRepository,
    },
  ],
  imports: [TypeOrmModule.forFeature([Categoria])],
})
export class CategoriaModule {}
