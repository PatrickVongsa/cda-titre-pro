import { prismaMock } from './../singleton';
import request from 'supertest';
import app from '../src/app';

const id = 12;

const expectectedResponse = {
  id,
  name: 'activity jest test',
  is_archived: false,
};
const expectectedResponseupdated = {
  id,
  name: 'activity jest test updated',
  is_archived: false,
};
const expectectedResponsearchived = {
  id,
  name: 'activity jest test updated',
  is_archived: true,
};

test('doit créer une nouvelle activité', async () => {
  prismaMock.activity.create.mockResolvedValue(expectectedResponse);

  const res = await request(app).post('/api/activities').send({ name: expectectedResponse.name });

  await expect(res.body).toEqual(expectectedResponse);
});

test("doit retourner un tableau d'activités", async () => {
  const res = await request(app).get('/api/activities');

  expect(res.body).toEqual([expectectedResponse]);
});

test('doit retourner une activité', async () => {
  const res = await request(app).get(`/api/activities/${expectectedResponse.id}`);

  expect(res.body).toEqual(expectectedResponse);
});

test('doit modifier une activité', async () => {
  prismaMock.activity.update.mockResolvedValue(expectectedResponseupdated);

  const updateSource = {
    name: 'activity jest test updated',
  };

  const res = await request(app).put(`/api/activities/${expectectedResponse.id}`).send(updateSource);

  expect(res.body).toEqual(expectectedResponseupdated);
});
test('doit archiver une activité', async () => {
  prismaMock.activity.update.mockResolvedValue(expectectedResponseupdated);

  const archiveSource = {
    is_archived: true,
  };

  const res = await request(app).put(`/api/activities/archive/${expectectedResponse.id}`).send(archiveSource);

  expect(res.body).toEqual(expectectedResponsearchived);
});

test('doit supprimer une activité', async () => {
  const res = await request(app).delete(`/api/activities/${expectectedResponse.id}`);

  expect(res.body).toEqual(expectectedResponsearchived);
});
