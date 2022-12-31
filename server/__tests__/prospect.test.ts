import { prismaMock } from '../singleton';
import request from 'supertest';
import app from '../src/app';

const id = 1;

const activityExpectectedResponse = {
  id,
  name: 'activity jest test',
  is_archived: false,
};
const activityExpectectedResponseupdated = {
  id,
  name: 'activity jest test updated',
  is_archived: false,
};
const activityExpectectedResponsearchived = {
  id,
  name: 'activity jest test updated',
  is_archived: true,
};

const prospectStatusExpectectedResponse = {
  id,
  name: 'prospect status jest test',
  color: '#811500',
  order_number: 10,
  is_archived: false,
};
const prospectStatusExpectectedResponseupdated = {
  id,
  name: 'prospect status jest test updated',
  color: '#811500',
  order_number: 10,
  is_archived: false,
};
const prospectStatusExpectectedResponsearchived = {
  id,
  name: 'prospect status jest test updated',
  color: '#811500',
  order_number: 10,
  is_archived: true,
};

const prospectExpectectedResponse = {
  id,
  company_name: 'company jest test',
  address: '123, rue de là-bas',
  postal_code: '81150',
  city: 'Marssac sur Tarn',
  country: 'France',
  phone: '0563532269',
  email: 'jest@mail.com',
  company_logo: 'jest.jpg',
  website_url: 'companyjest.com',
  facebook_url: 'https://facebook.com/companyjest',
  instagram_url: 'https://instagram.com/companyjest',
  linkedin_url: 'https://linkedin.com/companyjest',
  contacted_at: new Date('2017-06-01T06:30:00.000Z'),
  estimate_budget: 3000,
  need_description: 'ceci est une description qui décrit le besoin de la company en question',
  has_website: true,
  website_year: 2020,
  other_need: 'ceci est une description qui décrit un autre besoin de la company en question',
  is_client: false,
  siret_number: '12345678901234',
  assigned_to_id: id,
  prospect_status_id: id,
  source_id: id,
  activity_id: id,
  is_archived: false,
};
const prospectExpectectedResponseupdated = {
  id,
  company_name: 'company jest test modified',
  address: '123, rue de là-bas',
  postal_code: '81150',
  city: 'Marssac sur Tarn',
  country: 'France',
  phone: '0563532269',
  email: 'jest@mail.com',
  company_logo: 'jest.jpg',
  website_url: 'companyjest.com',
  facebook_url: 'https://facebook.com/companyjest',
  instagram_url: 'https://instagram.com/companyjest',
  linkedin_url: 'https://linkedin.com/companyjest',
  contacted_at: new Date('2017-06-01T06:30:00.000Z'),
  estimate_budget: 3000,
  need_description: 'ceci est une description qui décrit le besoin de la company en question',
  has_website: true,
  website_year: 2020,
  other_need: 'ceci est une description qui décrit un autre besoin de la company en question',
  is_client: false,
  siret_number: '12345678901234',
  assigned_to_id: id,
  prospect_status_id: id,
  source_id: id,
  activity_id: id,
  is_archived: false,
};
const prospectExpectectedResponsearchived = {
  id,
  company_name: 'company jest test modified',
  address: '123, rue de là-bas',
  postal_code: '81150',
  city: 'Marssac sur Tarn',
  country: 'France',
  phone: '0563532269',
  email: 'jest@mail.com',
  company_logo: 'jest.jpg',
  website_url: 'companyjest.com',
  facebook_url: 'https://facebook.com/companyjest',
  instagram_url: 'https://instagram.com/companyjest',
  linkedin_url: 'https://linkedin.com/companyjest',
  contacted_at: new Date('2017-06-01T06:30:00.000Z'),
  estimate_budget: 3000,
  need_description: 'ceci est une description qui décrit le besoin de la company en question',
  has_website: true,
  website_year: 2020,
  other_need: 'ceci est une description qui décrit un autre besoin de la company en question',
  is_client: false,
  siret_number: '12345678901234',
  assigned_to_id: id,
  prospect_status_id: id,
  source_id: id,
  activity_id: id,
  is_archived: true,
};

const contactExpectectedResponse = {
  id,
  firstname: 'test',
  lastname: 'test',
  occupation: 'test',
  phone: '0601010101',
  email: 'testn@email.com',
  is_prefered_contact: true,
  prospect_id: id,
  is_archived: false,
};
const contactExpectectedResponseupdated = {
  id,
  firstname: 'test',
  lastname: 'test',
  occupation: 'test modifié',
  phone: '0601010101',
  email: 'testn@email.com',
  is_prefered_contact: true,
  prospect_id: id,
  is_archived: false,
};
const contactExpectectedResponsearchived = {
  id,
  firstname: 'test',
  lastname: 'test',
  occupation: 'test modifié',
  phone: '0601010101',
  email: 'testn@email.com',
  is_prefered_contact: true,
  prospect_id: id,
  is_archived: true,
};

const sourceExpectectedResponse = {
  id,
  name: 'source jest test',
  is_archived: false,
};
const sourceExpectectedResponseupdated = {
  id,
  name: 'source jest test updated',
  is_archived: false,
};
const sourceExpectectedResponsearchived = {
  id,
  name: 'source jest test updated',
  is_archived: true,
};

const userExpectectedResponse = {
  id,
  firstname: 'Prénom test',
  lastname: 'NOM TEST',
  address: '123, rue de la place',
  postal_code: '31000',
  city: 'Toulouse',
  occupation: 'Développeur web',
  contrat_type: 'Apprenti',
  is_archived: false,
  email: 'prenom.test@mail.com',
  phone: '0611111111',
};
const userExpectectedResponseupdated = {
  id,
  firstname: 'Prénom test',
  lastname: 'NOM TEST modified',
  address: '123, rue de la place',
  postal_code: '31000',
  city: 'Toulouse',
  occupation: 'Développeur web',
  contrat_type: 'Apprenti',
  is_archived: false,
  email: 'prenom.test@mail.com',
  phone: '0611111111',
};
const userExpectectedResponsearchived = {
  id,
  firstname: 'Prénom test',
  lastname: 'NOM TEST modified',
  address: '123, rue de la place',
  postal_code: '31000',
  city: 'Toulouse',
  occupation: 'Développeur web',
  contrat_type: 'Apprenti',
  is_archived: true,
  email: 'prenom.test@mail.com',
  phone: '0611111111',
};

test('doit créer une nouvelle activité', async () => {
  prismaMock.activity.create.mockResolvedValue(activityExpectectedResponse);

  const res = await request(app).post('/api/activities').send({ name: activityExpectectedResponse.name });

  await expect(res.body).toEqual(activityExpectectedResponse);
});

test("doit retourner un tableau d'activités", async () => {
  const res = await request(app).get('/api/activities');

  expect(res.body).toEqual([activityExpectectedResponse]);
});

test('doit retourner une activité', async () => {
  const res = await request(app).get(`/api/activities/${activityExpectectedResponse.id}`);

  expect(res.body).toEqual(activityExpectectedResponse);
});

test('doit modifier une activité', async () => {
  prismaMock.activity.update.mockResolvedValue(activityExpectectedResponseupdated);

  const updateSource = {
    name: 'activity jest test updated',
  };

  const res = await request(app).put(`/api/activities/${activityExpectectedResponse.id}`).send(updateSource);

  expect(res.body).toEqual(activityExpectectedResponseupdated);
});

test('doit archiver une activité', async () => {
  prismaMock.activity.update.mockResolvedValue(activityExpectectedResponsearchived);

  const archiveSource = {
    is_archived: 'true',
  };

  const res = await request(app)
    .put(`/api/activities/archive/${activityExpectectedResponsearchived.id}`)
    .send(archiveSource);

  expect(res.body).toEqual(activityExpectectedResponsearchived);
});

test('doit créer un nouveau prospect status', async () => {
  prismaMock.prospect_status.create.mockResolvedValue(prospectStatusExpectectedResponse);

  const res = await request(app).post('/api/prospect-status').send({
    name: prospectStatusExpectectedResponse.name,
    color: prospectStatusExpectectedResponse.color,
    order_number: prospectStatusExpectectedResponse.order_number,
  });

  await expect(res.body).toEqual(prospectStatusExpectectedResponse);
});

test('doit retourner un tableau de prospect status', async () => {
  const res = await request(app).get('/api/prospect-status');

  expect(res.body).toEqual([prospectStatusExpectectedResponse]);
});

test('doit retourner un prospect status', async () => {
  const res = await request(app).get(`/api/prospect-status/${prospectStatusExpectectedResponse.id}`);

  expect(res.body).toEqual(prospectStatusExpectectedResponse);
});

test('doit modifier une prospect status', async () => {
  prismaMock.prospect_status.update.mockResolvedValue(prospectStatusExpectectedResponseupdated);

  const updateProspectSource = {
    name: 'prospect status jest test updated',
    color: '#811500',
    order_number: 10,
  };

  const res = await request(app)
    .put(`/api/prospect-status/${prospectStatusExpectectedResponse.id}`)
    .send(updateProspectSource);

  expect(res.body).toEqual(prospectStatusExpectectedResponseupdated);
});

test('doit archiver une prospect status', async () => {
  prismaMock.activity.update.mockResolvedValue(prospectStatusExpectectedResponsearchived);

  const archiveProspectSource = {
    is_archived: 'true',
  };

  const res = await request(app)
    .put(`/api/prospect-status/archive/${prospectStatusExpectectedResponse.id}`)
    .send(archiveProspectSource);

  expect(res.body).toEqual(prospectStatusExpectectedResponsearchived);
});

test('doit créer une nouvelle source', async () => {
  prismaMock.source.create.mockResolvedValue(sourceExpectectedResponse);

  const res = await request(app).post('/api/sources').send({ name: sourceExpectectedResponse.name });

  await expect(res.body).toEqual(sourceExpectectedResponse);
});

test('doit retourner un tableau de sources', async () => {
  const res = await request(app).get('/api/sources');

  expect(res.body).toEqual([sourceExpectectedResponse]);
});

test('doit retourner une source', async () => {
  const res = await request(app).get(`/api/sources/${sourceExpectectedResponse.id}`);

  expect(res.body).toEqual(sourceExpectectedResponse);
});

test('doit modifier une source', async () => {
  prismaMock.source.update.mockResolvedValue(sourceExpectectedResponseupdated);

  const updateSource = {
    name: 'source jest test updated',
  };

  const res = await request(app).put(`/api/sources/${sourceExpectectedResponse.id}`).send(updateSource);

  expect(res.body).toEqual(sourceExpectectedResponseupdated);
});

test('doit archiver une source', async () => {
  prismaMock.source.update.mockResolvedValue(sourceExpectectedResponsearchived);

  const archiveSource = {
    is_archived: 'true',
  };

  const res = await request(app).put(`/api/sources/archive/${sourceExpectectedResponse.id}`).send(archiveSource);

  expect(res.body).toEqual(sourceExpectectedResponsearchived);
});

test('doit créer un nouveau user', async () => {
  const res = await request(app).post('/api/users').send({
    firstname: userExpectectedResponse.firstname,
    lastname: userExpectectedResponse.lastname,
    address: userExpectectedResponse.address,
    postal_code: userExpectectedResponse.postal_code,
    city: userExpectectedResponse.city,
    occupation: userExpectectedResponse.occupation,
    contrat_type: userExpectectedResponse.contrat_type,
    phone: userExpectectedResponse.phone,
    password: 'test1234',
  });

  await expect(res.body).toEqual(userExpectectedResponse);
});

test('doit retourner un tableau de users', async () => {
  const res = await request(app).get('/api/users');

  expect(res.body).toEqual([userExpectectedResponse]);
});

test('doit retourner un user', async () => {
  const res = await request(app).get(`/api/users/${userExpectectedResponse.id}`);

  expect(res.body).toEqual(userExpectectedResponse);
});

test('doit modifier un user', async () => {
  const updateUser = {
    firstname: 'Prénom test',
    lastname: 'NOM TEST modified',
    address: '123, rue de la place',
    postal_code: '31000',
    city: 'Toulouse',
    occupation: 'Développeur web',
    contrat_type: 'Apprenti',
    phone: '0611111111',
  };

  const res = await request(app).put(`/api/users/${userExpectectedResponse.id}`).send(updateUser);

  expect(res.body).toEqual(userExpectectedResponseupdated);
});

test('doit archiver un user', async () => {
  const archiveUser = {
    is_archived: 'true',
  };

  const res = await request(app).put(`/api/users/archive/${userExpectectedResponse.id}`).send(archiveUser);

  expect(res.body).toEqual(userExpectectedResponsearchived);
});

test('doit créer un nouveau prospect', async () => {
  prismaMock.prospect.create.mockResolvedValue(prospectExpectectedResponse);

  const res = await request(app)
    .post('/api/prospects')
    .send({
      company_name: prospectExpectectedResponse.company_name,
      address: prospectExpectectedResponse.address,
      postal_code: prospectExpectectedResponse.postal_code,
      city: prospectExpectectedResponse.city,
      country: prospectExpectectedResponse.country,
      phone: prospectExpectectedResponse.phone,
      email: prospectExpectectedResponse.email,
      company_logo: prospectExpectectedResponse.company_logo,
      website_url: prospectExpectectedResponse.website_url,
      facebook_url: prospectExpectectedResponse.facebook_url,
      instagram_url: prospectExpectectedResponse.instagram_url,
      linkedin_url: prospectExpectectedResponse.linkedin_url,
      contacted_at: '2017-06-01T08:30',
      estimate_budget: prospectExpectectedResponse.estimate_budget,
      need_description: prospectExpectectedResponse.need_description,
      has_website: String(prospectExpectectedResponse.has_website),
      website_year: prospectExpectectedResponse.website_year,
      other_need: prospectExpectectedResponse.other_need,
      is_client: String(prospectExpectectedResponse.is_client),
      siret_number: prospectExpectectedResponse.siret_number,
      assigned_to_id: prospectExpectectedResponse.assigned_to_id,
      prospect_status_id: prospectExpectectedResponse.prospect_status_id,
      source_id: prospectExpectectedResponse.source_id,
      activity_id: prospectExpectectedResponse.activity_id,
    });

  await expect({ ...res.body, contacted_at: new Date(res.body.contacted_at) }).toEqual({
    ...prospectExpectectedResponse,
    contacted_at: new Date(prospectExpectectedResponse.contacted_at),
  });
});

test('doit retourner un tableau de prospects', async () => {
  const res = await request(app).get('/api/prospects');

  expect([{ ...res.body[0], contacted_at: new Date(res.body[0]['contacted_at']) }]).toEqual([
    { ...prospectExpectectedResponse, contacted_at: new Date(prospectExpectectedResponse.contacted_at) },
  ]);
});

test('doit retourner un prospect', async () => {
  const res = await request(app).get(`/api/prospects/${prospectExpectectedResponse.id}`);

  expect({ ...res.body, contacted_at: new Date(res.body.contacted_at) }).toEqual({
    ...prospectExpectectedResponse,
    contacted_at: new Date(prospectExpectectedResponse.contacted_at),
  });
});

test('doit modifier une prospect', async () => {
  prismaMock.prospect.update.mockResolvedValue(prospectExpectectedResponseupdated);

  const updateProspect = {
    company_name: 'company jest test modified',
    address: '123, rue de là-bas',
    postal_code: '81150',
    city: 'Marssac sur Tarn',
    country: 'France',
    phone: '0563532269',
    email: 'jest@mail.com',
    company_logo: 'jest.jpg',
    website_url: 'companyjest.com',
    facebook_url: 'https://facebook.com/companyjest',
    instagram_url: 'https://instagram.com/companyjest',
    linkedin_url: 'https://linkedin.com/companyjest',
    contacted_at: '2017-06-01T08:30',
    estimate_budget: '3000',
    need_description: 'ceci est une description qui décrit le besoin de la company en question',
    has_website: 'true',
    website_year: '2020',
    other_need: 'ceci est une description qui décrit un autre besoin de la company en question',
    is_client: 'false',
    siret_number: '12345678901234',
    assigned_to_id: id,
    prospect_status_id: id,
    source_id: id,
    activity_id: id,
  };

  const res = await request(app).put(`/api/prospects/${prospectExpectectedResponse.id}`).send(updateProspect);

  expect({ ...res.body, contacted_at: new Date(res.body.contacted_at) }).toEqual({
    ...prospectExpectectedResponseupdated,
    contacted_at: new Date(prospectExpectectedResponseupdated.contacted_at),
  });
});

test('doit archiver une prospect', async () => {
  prismaMock.prospect.update.mockResolvedValue(prospectExpectectedResponsearchived);

  const archiveProspect = {
    is_archived: 'true',
  };

  const res = await request(app).put(`/api/prospects/archive/${prospectExpectectedResponse.id}`).send(archiveProspect);

  expect({ ...res.body, contacted_at: new Date(res.body.contacted_at) }).toEqual({
    ...prospectExpectectedResponsearchived,
    contacted_at: new Date(prospectExpectectedResponsearchived.contacted_at),
  });
});

test('doit créer un nouveau contact', async () => {
  prismaMock.contact.create.mockResolvedValue(contactExpectectedResponse);

  const res = await request(app).post('/api/contacts').send({
    firstname: contactExpectectedResponse.firstname,
    lastname: contactExpectectedResponse.lastname,
    occupation: contactExpectectedResponse.occupation,
    phone: contactExpectectedResponse.phone,
    email: contactExpectectedResponse.email,
    is_prefered_contact: contactExpectectedResponse.is_prefered_contact,
    prospect_id: contactExpectectedResponse.prospect_id,
  });

  await expect(res.body).toEqual(contactExpectectedResponse);
});

test('doit retourner un tableau de contacts', async () => {
  const res = await request(app).get('/api/contacts');

  expect(res.body).toEqual([contactExpectectedResponse]);
});

test('doit retourner un contact', async () => {
  const res = await request(app).get(`/api/contacts/${contactExpectectedResponse.id}`);

  expect(res.body).toEqual(contactExpectectedResponse);
});

test('doit modifier un contact', async () => {
  prismaMock.contact.update.mockResolvedValue(contactExpectectedResponseupdated);

  const updateSource = {
    firstname: 'test',
    lastname: 'test',
    occupation: 'test modifié',
    phone: '0601010101',
    email: 'testn@email.com',
    is_prefered_contact: 'true',
    prospect_id: id,
  };

  const res = await request(app).put(`/api/contacts/${contactExpectectedResponse.id}`).send(updateSource);

  expect(res.body).toEqual(contactExpectectedResponseupdated);
});

test('doit archiver un contact', async () => {
  prismaMock.contact.update.mockResolvedValue(contactExpectectedResponsearchived);

  const archiveSource = {
    is_archived: 'true',
  };

  const res = await request(app).put(`/api/contacts/archive/${contactExpectectedResponse.id}`).send(archiveSource);

  expect(res.body).toEqual(contactExpectectedResponsearchived);
});

test('doit supprimer un contact', async () => {
  const res = await request(app).delete(`/api/contacts/${contactExpectectedResponse.id}`);

  expect(res.body).toEqual(contactExpectectedResponsearchived);
});

test('doit supprimer une prospect', async () => {
  const res = await request(app).delete(`/api/prospects/${prospectExpectectedResponse.id}`);

  expect({ ...res.body, contacted_at: new Date(res.body.contacted_at) }).toEqual({
    ...prospectExpectectedResponsearchived,
    contacted_at: new Date(prospectExpectectedResponsearchived.contacted_at),
  });
});

test('doit supprimer un user', async () => {
  const res = await request(app).delete(`/api/users/${userExpectectedResponse.id}`);

  expect(res.body).toEqual(userExpectectedResponsearchived);
});

test('doit supprimer une source', async () => {
  const res = await request(app).delete(`/api/sources/${sourceExpectectedResponse.id}`);

  expect(res.body).toEqual(sourceExpectectedResponsearchived);
});

test('doit supprimer une prospect status', async () => {
  const res = await request(app).delete(`/api/prospect-status/${prospectStatusExpectectedResponse.id}`);

  expect(res.body).toEqual(prospectStatusExpectectedResponsearchived);
});

test('doit supprimer une activité', async () => {
  const res = await request(app).delete(`/api/activities/${activityExpectectedResponse.id}`);

  expect(res.body).toEqual(activityExpectectedResponsearchived);
});
