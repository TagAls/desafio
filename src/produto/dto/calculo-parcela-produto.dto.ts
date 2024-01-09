import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CalculoParcelaProdutoDTO {
  @ApiProperty({
    description: 'Nome do produto que deseja calcular o valor das parcelas.',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Quantidade de parcelas que serão feitas.',
    type: Number,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  parcelas: number;
}
