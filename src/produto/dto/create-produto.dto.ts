import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty({
    description: 'Nome do produto que sera cadastrado',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Descricao do produto que sera cadastrado',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @ApiProperty({
    description: 'Valor do produto que sera cadastrado',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @ApiProperty({
    description:
      'Id da categoria que sera usada para referenciar o valor de juros para o calculo de parcelas',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  idCategoria: string;
}
