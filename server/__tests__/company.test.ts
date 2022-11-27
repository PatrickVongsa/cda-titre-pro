import { prismaMock } from './../singleton';
import request from 'supertest';
import app from '../src/app';

const id = 1;

const companyExpectectedResponse = {
  id,
  address: '65, Rue des sept troubadours',
  postal_code: '31000',
  city: 'Toulouse',
  country: 'France',
  phone: '0512345678',
  email: 'contact@webgo-agency.com',
  siret: '12345678912345',
  tva_number: 'TVA13456789NUm',
};
const companyExpectectedResponseupdated = {
  id,
  address: '63, Rue des sept troubadours',
  postal_code: '31000',
  city: 'Toulouse',
  country: 'France',
  phone: '0512345678',
  email: 'contact@webgo-agency.com',
  siret: '12345678912345',
  tva_number: 'TVA13456789NU',
};

test('doit créer un nouvelle company', async () => {
  prismaMock.company.create.mockResolvedValue(companyExpectectedResponse);

  const res = await request(app).post('/api/company').send({
    address: '65, Rue des sept troubadours',
    postal_code: '31000',
    city: 'Toulouse',
    country: 'France',
    phone: '0512345678',
    email: 'contact@webgo-agency.com',
    siret: '12345678912345',
    tva_number: 'TVA13456789NUm',
  });

  await expect(res.body).toEqual(companyExpectectedResponse);
});

test('doit retourner un tableau de company', async () => {
  const res = await request(app).get('/api/company');

  expect(res.body).toEqual([companyExpectectedResponse]);
});

test('doit retourner un company', async () => {
  const res = await request(app).get(`/api/company/${id}`);

  expect(res.body).toEqual(companyExpectectedResponse);
});

test('doit modifier une company', async () => {
  prismaMock.company.update.mockResolvedValue(companyExpectectedResponseupdated);

  const updateProjectStatus = {
    address: '63, Rue des sept troubadours',
    postal_code: '31000',
    city: 'Toulouse',
    country: 'France',
    phone: '0512345678',
    email: 'contact@webgo-agency.com',
    siret: '12345678912345',
    tva_number: 'TVA13456789NU',
  };

  const res = await request(app).put(`/api/company/${id}`).send(updateProjectStatus);

  expect(res.body).toEqual(companyExpectectedResponseupdated);
});

test('doit supprimer une company', async () => {
  const res = await request(app).delete(`/api/company/${id}`);

  expect(res.body).toEqual(companyExpectectedResponseupdated);
});
