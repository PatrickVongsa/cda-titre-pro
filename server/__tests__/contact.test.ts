import { prismaMock } from '../singleton';
import request from 'supertest';
import app from '../src/app';

const id = 16;

const expectectedResponse = {
  id,
  firstname: 'test',
  lastname: 'test',
  occupation: 'test',
  phone: '0601010101',
  email: 'testn@email.com',
  is_prefered_contact: true,
  piste_id: 0,
  is_archived: false,
};
const expectectedResponseupdated = {
  id,
  firstname: 'test',
  lastname: 'test',
  occupation: 'test modifié',
  phone: '0601010101',
  email: 'testn@email.com',
  is_prefered_contact: true,
  piste_id: 0,
  is_archived: false,
};
const expectectedResponsearchived = {
  id,
  firstname: 'test',
  lastname: 'test',
  occupation: 'test modifié',
  phone: '0601010101',
  email: 'testn@email.com',
  is_prefered_contact: true,
  piste_id: 0,
  is_archived: true,
};

test('doit créer une nouvelle activité', async () => {
  prismaMock.contact.create.mockResolvedValue(expectectedResponse);

  const res = await request(app)
    .post('/api/activities')
    .send({
      firstname: expectectedResponse.firstname,
      lastname: expectectedResponse.lastname,
      occupation: expectectedResponse.occupation,
      phone: expectectedResponse.phone,
      email: expectectedResponse.email,
      is_prefered_contact: expectectedResponse.is_prefered_contact,
      piste_id: expectectedResponse.piste_id,
    });

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
  prismaMock.contact.update.mockResolvedValue(expectectedResponseupdated);

  const updateSource = {
    name: 'test modifié',
  };

  const res = await request(app).put(`/api/activities/${expectectedResponse.id}`).send(updateSource);

  expect(res.body).toEqual(expectectedResponseupdated);
});
test('doit archiver une activité', async () => {
  prismaMock.contact.update.mockResolvedValue(expectectedResponseupdated);

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
