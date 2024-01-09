import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCategoriaUseCase } from './use-cases/create-categoria.use-case';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { FindAllCategoriaUseCase } from './use-cases/find-all-categoria.use-case';
import { FindByIdCategoriaUseCase } from './use-cases/find-by-id-categoria.use-case';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { UpdateCategoriaUseCase } from './use-cases/update-categoria.use-case';
import { DeleteCategoriaUseCase } from './use-cases/delete-catergoria.use-case';

@Controller('categorias')
export class CategoriaUseCaseController {
  @Inject(CreateCategoriaUseCase)
  private readonly criaCategoriaUseCase: CreateCategoriaUseCase;

  @Inject(FindAllCategoriaUseCase)
  private readonly findAllCategoriaUseCase: FindAllCategoriaUseCase;

  @Inject(FindByIdCategoriaUseCase)
  private readonly findByIdCategoriaUseCase: FindByIdCategoriaUseCase;

  @Inject(UpdateCategoriaUseCase)
  private readonly updateCategoriaUseCase: UpdateCategoriaUseCase;

  @Inject(DeleteCategoriaUseCase)
  private readonly deleteCategoriaUseCase: DeleteCategoriaUseCase;

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.criaCategoriaUseCase.execute(createCategoriaDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.updateCategoriaUseCase.execute(id, updateCategoriaDto);
  }

  @Get()
  findAll() {
    return this.findAllCategoriaUseCase.execute();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.findByIdCategoriaUseCase.execute(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.deleteCategoriaUseCase.execute(id);
  }
}
