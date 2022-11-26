import { prismaMock } from './../singleton';
import request from 'supertest';
import app from '../src/app';

const id = 7;

const expectectedResponse = {
  id,
  name: 'prospect status jest test',
  color: '#811500',
  order_number: 10,
  is_archived: false,
};
const expectectedResponseupdated = {
  id,
  name: 'prospect status jest test updated',
  color: '#811500',
  order_number: 10,
  is_archived: false,
};
const expectectedResponsearchived = {
  id,
  name: 'prospect status jest test updated',
  color: '#811500',
  order_number: 10,
  is_archived: true,
};

test('doit créer un nouveau prospect status', async () => {
  prismaMock.prospect_status.create.mockResolvedValue(expectectedResponse);

  const res = await request(app).post('/api/prospect-status').send({
    name: expectectedResponse.name,
    color: expectectedResponse.color,
    order_number: expectectedResponse.order_number,
  });

  await expect(res.body).toEqual(expectectedResponse);
});

test('doit retourner un tableau de prospect status', async () => {
  const res = await request(app).get('/api/prospect-status');

  expect(res.body).toEqual([expectectedResponse]);
});

test('doit retourner un prospect status', async () => {
  const res = await request(app).get(`/api/prospect-status/${expectectedResponse.id}`);

  expect(res.body).toEqual(expectectedResponse);
});

test('doit modifier une prospect status', async () => {
  prismaMock.prospect_status.update.mockResolvedValue(expectectedResponseupdated);

  const updateProspectSource = {
    name: 'prospect status jest test updated',
    color: '#811500',
    order_number: 10,
  };

  const res = await request(app).put(`/api/prospect-status/${expectectedResponse.id}`).send(updateProspectSource);

  expect(res.body).toEqual(expectectedResponseupdated);
});

test('doit archiver une prospect status', async () => {
  prismaMock.activity.update.mockResolvedValue(expectectedResponseupdated);

  const archiveProspectSource = {
    is_archived: 'true',
  };

  const res = await request(app)
    .put(`/api/prospect-status/archive/${expectectedResponse.id}`)
    .send(archiveProspectSource);

  expect(res.body).toEqual(expectectedResponsearchived);
});

test('doit supprimer une prospect status', async () => {
  const res = await request(app).delete(`/api/prospect-status/${expectectedResponse.id}`);

  expect(res.body).toEqual(expectectedResponsearchived);
});
