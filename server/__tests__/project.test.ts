import { prismaMock } from './../singleton';
import request from 'supertest';
import app from '../src/app';

const id = 1;

const projectStatusExpectectedResponse = {
  id,
  name: 'project status jest test',
};
const projectStatusExpectectedResponseupdated = {
  id,
  name: 'project status jest test updated',
};

const projectTypeExpectectedResponse = {
  id,
  name: 'project type jest test',
};
const projectTypeExpectectedResponseupdated = {
  id,
  name: 'project type jest test updated',
};

const projectExpectectedResponse = {
  id,
  name: 'project 1',
  description: 'website one page, with contact form',
  start_date: new Date('2017-06-01T08:30'),
  due_date: new Date('2017-07-01T08:30'),
  project_type_id: id,
  project_amount: 2133,
  did_deposit: true,
  has_financement: false,
  has_fully_paid: false,
  project_status_id: id,
  link: 'none',
  github_link: 'https://github.com/project1',
  host: 'ovh',
  ora_name: 'project 1',
  prospect_id: null,
};
const projectExpectectedResponseupdated = {
  id,
  name: 'project 1',
  description: 'website one page, with contact form',
  start_date: new Date('2017-06-01T08:30'),
  due_date: new Date('2017-08-01T08:30'),
  project_type_id: id,
  project_amount: 2133,
  did_deposit: true,
  has_financement: false,
  has_fully_paid: false,
  project_status_id: id,
  link: 'none',
  github_link: 'https://github.com/project1',
  host: 'ovh',
  ora_name: 'project 1',
  prospect_id: null,
};

test('doit créer un nouveau project status', async () => {
  prismaMock.project_status.create.mockResolvedValue(projectStatusExpectectedResponse);

  const res = await request(app).post('/api/project-status').send({
    name: projectStatusExpectectedResponse.name,
  });

  await expect(res.body).toEqual(projectStatusExpectectedResponse);
});

test('doit retourner un tableau de project status', async () => {
  const res = await request(app).get('/api/project-status');

  expect(res.body).toEqual([projectStatusExpectectedResponse]);
});

test('doit retourner un project status', async () => {
  const res = await request(app).get(`/api/project-status/${projectStatusExpectectedResponse.id}`);

  expect(res.body).toEqual(projectStatusExpectectedResponse);
});

test('doit modifier une project status', async () => {
  prismaMock.project_status.update.mockResolvedValue(projectStatusExpectectedResponseupdated);

  const updateProjectStatus = {
    name: projectStatusExpectectedResponseupdated.name,
  };

  const res = await request(app)
    .put(`/api/project-status/${projectStatusExpectectedResponse.id}`)
    .send(updateProjectStatus);

  expect(res.body).toEqual(projectStatusExpectectedResponseupdated);
});

test('doit créer un nouveau project type', async () => {
  prismaMock.project_type.create.mockResolvedValue(projectTypeExpectectedResponse);

  const res = await request(app).post('/api/project-types').send({
    name: projectTypeExpectectedResponse.name,
  });

  await expect(res.body).toEqual(projectTypeExpectectedResponse);
});

test('doit retourner un tableau de project type', async () => {
  const res = await request(app).get('/api/project-types');

  expect(res.body).toEqual([projectTypeExpectectedResponse]);
});

test('doit retourner un project type', async () => {
  const res = await request(app).get(`/api/project-types/${projectTypeExpectectedResponse.id}`);

  expect(res.body).toEqual(projectTypeExpectectedResponse);
});

test('doit modifier une project type', async () => {
  prismaMock.project_type.update.mockResolvedValue(projectTypeExpectectedResponseupdated);

  const updateProjectType = {
    name: projectTypeExpectectedResponseupdated.name,
  };

  const res = await request(app).put(`/api/project-types/${projectTypeExpectectedResponse.id}`).send(updateProjectType);

  expect(res.body).toEqual(projectTypeExpectectedResponseupdated);
});

test('doit créer un nouveau project', async () => {
  prismaMock.project.create.mockResolvedValue(projectExpectectedResponse);

  const res = await request(app)
    .post('/api/projects')
    .send({
      name: projectExpectectedResponse.name,
      description: projectExpectectedResponse.description,
      start_date: '2017-06-01T08:30',
      due_date: '2017-07-01T08:30',
      project_type_id: projectExpectectedResponse.project_type_id,
      project_amount: projectExpectectedResponse.project_amount,
      did_deposit: String(projectExpectectedResponse.did_deposit),
      has_financement: String(projectExpectectedResponse.has_financement),
      has_fully_paid: String(projectExpectectedResponse.has_fully_paid),
      project_status_id: projectExpectectedResponse.project_status_id,
      link: projectExpectectedResponse.link,
      github_link: projectExpectectedResponse.github_link,
      host: projectExpectectedResponse.host,
      ora_name: projectExpectectedResponse.ora_name,
      prospect_id: null,
    });

  await expect({
    ...res.body,
    start_date: new Date(res.body.start_date),
    due_date: new Date(res.body.due_date),
  }).toEqual({
    ...projectExpectectedResponse,
    start_date: new Date(projectExpectectedResponse.start_date),
    due_date: new Date(projectExpectectedResponse.due_date),
  });
});

test('doit retourner un tableau de project', async () => {
  const res = await request(app).get('/api/projects');

  expect([
    {
      ...res.body[0],
      start_date: new Date(res.body[0]['start_date']),
      due_date: new Date(res.body[0]['due_date']),
    },
  ]).toEqual([
    {
      ...projectExpectectedResponse,
      start_date: new Date(projectExpectectedResponse.start_date),
      due_date: new Date(projectExpectectedResponse.due_date),
    },
  ]);
});

test('doit retourner un project', async () => {
  const res = await request(app).get(`/api/projects/${projectExpectectedResponse.id}`);

  expect({
    ...res.body,
    start_date: new Date(res.body.start_date),
    due_date: new Date(res.body.due_date),
  }).toEqual({
    ...projectExpectectedResponse,
    start_date: new Date(projectExpectectedResponse.start_date),
    due_date: new Date(projectExpectectedResponse.due_date),
  });
});

test('doit modifier une project', async () => {
  prismaMock.project.update.mockResolvedValue(projectExpectectedResponseupdated);

  const updateProject = {
    name: projectExpectectedResponseupdated.name,
    description: projectExpectectedResponseupdated.description,
    start_date: '2017-06-01T08:30',
    due_date: '2017-08-01T08:30',
    project_type_id: projectExpectectedResponseupdated.project_type_id,
    project_amount: projectExpectectedResponseupdated.project_amount,
    did_deposit: String(projectExpectectedResponseupdated.did_deposit),
    has_financement: String(projectExpectectedResponseupdated.has_financement),
    has_fully_paid: String(projectExpectectedResponseupdated.has_fully_paid),
    project_status_id: projectExpectectedResponseupdated.project_status_id,
    link: projectExpectectedResponseupdated.link,
    github_link: projectExpectectedResponseupdated.github_link,
    host: projectExpectectedResponseupdated.host,
    ora_name: projectExpectectedResponseupdated.ora_name,
    prospect_id: null,
  };

  const res = await request(app).put(`/api/projects/${projectExpectectedResponse.id}`).send(updateProject);

  expect({
    ...res.body,
    start_date: new Date(res.body.start_date),
    due_date: new Date(res.body.due_date),
  }).toEqual({
    ...projectExpectectedResponseupdated,
    start_date: new Date(projectExpectectedResponseupdated.start_date),
    due_date: new Date(projectExpectectedResponseupdated.due_date),
  });
});

test('doit supprimer une project', async () => {
  const res = await request(app).delete(`/api/projects/${projectExpectectedResponse.id}`);

  expect({
    ...res.body,
    start_date: new Date(res.body.start_date),
    due_date: new Date(res.body.due_date),
  }).toEqual({
    ...projectExpectectedResponseupdated,
    start_date: new Date(projectExpectectedResponseupdated.start_date),
    due_date: new Date(projectExpectectedResponseupdated.due_date),
  });
});

test('doit supprimer une project type', async () => {
  const res = await request(app).delete(`/api/project-types/${projectTypeExpectectedResponse.id}`);

  expect(res.body).toEqual(projectTypeExpectectedResponseupdated);
});

test('doit supprimer une project status', async () => {
  const res = await request(app).delete(`/api/project-status/${projectStatusExpectectedResponse.id}`);

  expect(res.body).toEqual(projectStatusExpectectedResponseupdated);
});
