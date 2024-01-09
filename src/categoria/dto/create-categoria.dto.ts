import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nome da categoria de protudos.',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Porcentagem de juros que sera usado para calculo de parcelas',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  juros: number;
}
