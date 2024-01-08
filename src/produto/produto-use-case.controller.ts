import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateProdutoUseCase } from './use-cases/create-produto.use-case';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { FindAllProdutoUseCase } from './use-cases/find-all-produto.use-case';
import { FindByIdProdutoUseCase } from './use-cases/find-by-id-produto.use-case';

@Controller('produtos')
export class ProdutoUseCaseController {
  @Inject(CreateProdutoUseCase)
  private readonly criaProdutoUseCase: CreateProdutoUseCase;

  @Inject(FindAllProdutoUseCase)
  private readonly findAllProdutoUseCase: FindAllProdutoUseCase;

  @Inject(FindByIdProdutoUseCase)
  private readonly findByIdProdutoUseCase: FindByIdProdutoUseCase;

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.criaProdutoUseCase.execute(createProdutoDto);
  }

  @Get()
  findAll() {
    return this.findAllProdutoUseCase.execute();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.findByIdProdutoUseCase.execute(id);
  }
}
