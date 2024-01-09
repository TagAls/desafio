import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CategoriaUseCaseController (e2e)', () => {
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
      nome: 'automotivo',
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
      .send(response.body);
    expect(HttpStatus.OK);
    expect(updateReponse.body).toEqual(response.body);
  });

  it('DELETE /categorias', async () => {
    await request(app.getHttpServer())
      .delete('/categorias/' + idCategoria)
      .expect(HttpStatus.OK);
  });
});
