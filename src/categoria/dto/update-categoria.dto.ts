import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class _UpdateProdutoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  juros: number;
}
export class UpdateCategoriaDto extends PartialType(_UpdateProdutoDto) {}
