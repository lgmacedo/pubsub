import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('MessagesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  const newMessage = {
    queue: 'documents',
    message: 'CPF: 123.456.789-10',
  };

  it('/messages (POST) should correctly place a new message on its designated queue', async () => {
    const postMessageReq = await request(app.getHttpServer())
      .post('/messages')
      .send(newMessage);
    expect(postMessageReq.statusCode).toBe(201);

    const getMessageReq = await request(app.getHttpServer()).get(
      `/messages/${newMessage.queue}`,
    );
    expect(getMessageReq.statusCode).toBe(200);
    expect(
      getMessageReq.body[getMessageReq.body.length - 1].split('] ')[1],
    ).toBe(newMessage.message);
  });

  it('/messages (POST) should return a Status Code 400 when the request body is incomplete', async () => {
    const postMessageReq = await request(app.getHttpServer())
      .post('/messages')
      .send({
        message: "this request body is missing its 'queue' value",
      });
    expect(postMessageReq.statusCode).toBe(400);
  });

  it('/messages/:queue (GET) should retrieve all messages from an already filled queue', async () => {
    const getMessageReq = await request(app.getHttpServer()).get(
      `/messages/${newMessage.queue}`,
    );
    expect(getMessageReq.statusCode).toBe(200);
    expect(getMessageReq.body).toEqual(
      expect.arrayContaining([expect.any(String)]),
    );
  });

  it('/messages/:queue (GET) should return a status Code 404 when the requested queue is not found', async () => {
    const getMessageReq = await request(app.getHttpServer()).get(
      `/messages/emptyqueue`,
    );
    expect(getMessageReq.statusCode).toBe(404);
  });
});
