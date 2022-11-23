import { prismaMock } from '../singleton';
import request from 'supertest';
import app from '../src/app';

const id = 4;

const expectectedResponse = {
  id,
  name: 'source jest test',
  is_archived: false,
};
const expectectedResponseupdated = {
  id,
  name: 'source jest test updated',
  is_archived: false,
};
const expectectedResponsearchived = {
  id,
  name: 'source jest test updated',
  is_archived: true,
};

test('doit créer une nouvelle source', async () => {
  prismaMock.source.create.mockResolvedValue(expectectedResponse);

  const res = await request(app).post('/api/sources').send({ name: expectectedResponse.name });

  await expect(res.body).toEqual(expectectedResponse);
});

test("doit retourner un tableau de sources", async () => {
  const res = await request(app).get('/api/sources');

  expect(res.body).toEqual([expectectedResponse]);
});

test('doit retourner une source', async () => {
  const res = await request(app).get(`/api/sources/${expectectedResponse.id}`);

  expect(res.body).toEqual(expectectedResponse);
});

test('doit modifier une source', async () => {
  prismaMock.source.update.mockResolvedValue(expectectedResponseupdated);

  const updateSource = {
    name: 'source jest test updated',
  };

  const res = await request(app).put(`/api/sources/${expectectedResponse.id}`).send(updateSource);

  expect(res.body).toEqual(expectectedResponseupdated);
});
test('doit archiver une source', async () => {
  prismaMock.source.update.mockResolvedValue(expectectedResponseupdated);

  const archiveSource = {
    is_archived: true,
  };

  const res = await request(app).put(`/api/sources/archive/${expectectedResponse.id}`).send(archiveSource);

  expect(res.body).toEqual(expectectedResponsearchived);
});

test('doit supprimer une source', async () => {
  const res = await request(app).delete(`/api/sources/${expectectedResponse.id}`);

  expect(res.body).toEqual(expectectedResponsearchived);
});
