import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ProdutoUseCaseController (e2e)', () => {
  let idProduto = '';
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /produtos', async () => {
    const requestData = {
      nome: 'roda',
      descricao: 'roda de carro',
      valor: 150,
      idCategoria: 'ac5d405e-afe0-4e5b-838d-6d6cecb0ebf3',
    };
    const response = await request(app.getHttpServer())
      .post('/produtos')
      .send(requestData)
      .expect(HttpStatus.CREATED);
    idProduto = response.body.id;
  });

  it('POST /produtos/calcular-parcelas', async () => {
    const produtoCalculoParcela = {
      nome: 'roda',
      parcelas: 2,
    };
    await request(app.getHttpServer())
      .post(`/produtos/calcular-parcelas`)
      .send(produtoCalculoParcela)
      .expect(201);
  });

  it('GET /produtos', async () => {
    const response = await request(app.getHttpServer())
      .get('/produtos')
      .expect(HttpStatus.OK);

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('descricao');
    expect(response.body[0]).toHaveProperty('nome');
    expect(response.body[0]).toHaveProperty('valor');
    expect(response.body[0]).toHaveProperty('idCategoria');
  });

  it('GET /produtos/idProduto', async () => {
    const response = await request(app.getHttpServer())
      .get(`/produtos/${idProduto}`)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('descricao');
    expect(response.body).toHaveProperty('nome');
    expect(response.body).toHaveProperty('valor');
    expect(response.body).toHaveProperty('idCategoria');
  });

  it('PATCH /produtos/idProduto', async () => {
    const response = await request(app.getHttpServer()).get(
      '/produtos/' + idProduto,
    );
    response.body.descricao = 'roda de bicicleta';
    const updateReponse = await request(app.getHttpServer())
      .patch(`/produtos/${idProduto}`)
      .send(response.body);
    expect(HttpStatus.OK);
    expect(updateReponse.body).toEqual(response.body);
  });

  it('DELETE /produtos', async () => {
    await request(app.getHttpServer())
      .delete('/produtos/' + idProduto)
      .expect(HttpStatus.OK);
  });
});
