import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateCategoriaUseCase } from './use-cases/create-categoria.use-case';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { FindAllCategoriaUseCase } from './use-cases/find-all-categoria.use-case';
import { FindByIdCategoriaUseCase } from './use-cases/find-by-id-categoria.use-case';

@Controller('categorias')
export class CategoriaUseCaseController {
  @Inject(CreateCategoriaUseCase)
  private readonly criaCategoriaUseCase: CreateCategoriaUseCase;

  @Inject(FindAllCategoriaUseCase)
  private readonly findAllCategoriaUseCase: FindAllCategoriaUseCase;

  @Inject(FindByIdCategoriaUseCase)
  private readonly findByIdCategoriaUseCase: FindByIdCategoriaUseCase;

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.criaCategoriaUseCase.execute(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.findAllCategoriaUseCase.execute();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.findByIdCategoriaUseCase.execute(id);
  }
}
