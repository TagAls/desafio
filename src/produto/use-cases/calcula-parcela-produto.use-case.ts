import { InjectRepository } from '@nestjs/typeorm';
import { CalculoParcelaProdutoDTO } from '../dto/calculo-parcela-produto.dto';
import { Produto } from '../entities/produto.entity';
import { Repository } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

export class CalculoParcelaUseCase {
  constructor(
    @InjectRepository(Produto) private produtoRepo: Repository<Produto>,
    @InjectRepository(Categoria) private categoriaRepo: Repository<Categoria>,
  ) {}
  async execute(input: CalculoParcelaProdutoDTO) {
    let valorParcela = 0;
    if (input.parcelas > 0) {
      const nome = input.nome;
      const produto = this.produtoRepo.findOne({ where: { nome } });
      await produto.then(async (p) => {
        const id = p.idCategoria;
        const categoria = this.categoriaRepo.findOne({ where: { id } });
        await categoria.then(async (c) => {
          const porcentagem = c.juros / 100;
          valorParcela =
            (p.valor * c.juros) /
            (1 - Math.pow(1 * porcentagem, input.parcelas));
        });
      });
      return valorParcela.toFixed(2);
    } else {
      return 'Não foi possivel realizar o calculo pois o número de parcelas deve ser maior que 0';
    }
  }
}
