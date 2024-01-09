import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProdutoUseCase } from './use-cases/create-produto.use-case';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { FindAllProdutoUseCase } from './use-cases/find-all-produto.use-case';
import { FindByIdProdutoUseCase } from './use-cases/find-by-id-produto.use-case';
import { CalculoParcelaProdutoDTO } from './dto/calculo-parcela-produto.dto';
import { CalculoParcelaUseCase } from './use-cases/calcula-parcela-produto.use-case';
import { UpdateProdutoUseCase } from './use-cases/update-produto.use-case';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutoUseCaseController {
  @Inject(CreateProdutoUseCase)
  private readonly criaProdutoUseCase: CreateProdutoUseCase;

  @Inject(FindAllProdutoUseCase)
  private readonly findAllProdutoUseCase: FindAllProdutoUseCase;

  @Inject(FindByIdProdutoUseCase)
  private readonly findByIdProdutoUseCase: FindByIdProdutoUseCase;

  @Inject(CalculoParcelaUseCase)
  private readonly calculoParcelaUseCase: CalculoParcelaUseCase;

  @Inject(UpdateProdutoUseCase)
  private readonly updateProdutoUseCase: UpdateProdutoUseCase;

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.criaProdutoUseCase.execute(createProdutoDto);
  }

  @Post('calcular-parcelas')
  calculoParcela(@Body() calculoParcelaProdutoDTO: CalculoParcelaProdutoDTO) {
    return this.calculoParcelaUseCase.execute(calculoParcelaProdutoDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.updateProdutoUseCase.execute(id, updateProdutoDto);
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
