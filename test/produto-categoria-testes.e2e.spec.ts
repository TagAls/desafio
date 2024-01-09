import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ProdutoUseCaseController e CategoriaUseCaseController (e2e)', () => {
  let idProduto = '';
  let idCategoria = '';
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /categorias', async () => {
    const requestData = {
      nome: 'teste',
      juros: 5,
    };
    const response = await request(app.getHttpServer())
      .post('/categorias')
      .send(requestData)
      .expect(HttpStatus.CREATED);
    idCategoria = response.body.id;
  });

  it('GET /categorias', async () => {
    const response = await request(app.getHttpServer())
      .get('/categorias')
      .expect(HttpStatus.OK);

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('nome');
    expect(response.body[0]).toHaveProperty('juros');
  });

  it('GET /categorias/idCategoria', async () => {
    const response = await request(app.getHttpServer())
      .get(`/categorias/${idCategoria}`)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nome');
    expect(response.body).toHaveProperty('juros');
  });

  it('PATCH /categorias/idCategoria', async () => {
    const response = await request(app.getHttpServer()).get(
      '/categorias/' + idCategoria,
    );
    response.body.juros = 2.5;
    const updateReponse = await request(app.getHttpServer())
      .patch(`/categorias/${idCategoria}`)
      .send(response.body)
      .expect(HttpStatus.OK);
    expect(updateReponse.body).toEqual(response.body);
  });

  it('POST /produtos', async () => {
    const requestData = {
      nome: 'roda',
      descricao: 'roda de carro',
      valor: 150,
      idCategoria: idCategoria,
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
      .send(response.body)
      .expect(HttpStatus.OK);
    expect(updateReponse.body).toEqual(response.body);
  });

  it('DELETE /produtos', async () => {
    await request(app.getHttpServer())
      .delete('/produtos/' + idProduto)
      .expect(HttpStatus.OK);
  });

  it('DELETE /categorias', async () => {
    await request(app.getHttpServer())
      .delete('/categorias/' + idCategoria)
      .expect(HttpStatus.OK);
  });
});
