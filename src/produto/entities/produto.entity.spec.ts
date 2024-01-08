import { Produto } from './produto.entity';

describe('Produto Teste', () => {
  it('criando produto', () => {
    const produto = new Produto({
      nome: 'teste',
      descricao: 'teste',
      valor: 1,
      idCategoria: 'teste',
    });
    expect(produto.nome).toBeDefined();
    expect(produto.descricao).toBeDefined();
    expect(produto.idCategoria).toBeDefined();
    expect(produto.valor).toBeGreaterThan(0);
  });
});
