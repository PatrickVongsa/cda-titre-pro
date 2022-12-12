import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/redux.hook';

import { addProspectStatus } from '../redux/prospectStatusSlice';
import { addProjectStatus } from '../redux/projectStatusSlice';
import { addProjectType } from '../redux/projectTypeSlice';
import { addActivity } from '../redux/activitySlice';
import { addSource } from '../redux/sourceSlice';

function Parameters() {
  const [name, setName] = useState('');
  const [projectStatusName, setProjectStatusName] = useState('');
  const [projectTypeName, setProjectTypeName] = useState('');
  const [activityName, setActivityName] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [color, setColor] = useState('');
  const [order, setOrder] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const dispatch = useAppDispatch();

  //PROSPECT
  //Add new prospect status
  const canSave = [name, color, order].every(Boolean) && addRequestStatus === 'idle';
  const onSaveProspectStatusClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        await dispatch(addProspectStatus({ name, color, order_number: Number(order) })).unwrap();
        setName('');
        setColor('');
        setOrder('');
      } catch (err) {
        console.error('Failed to save the post: ', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };
  //Add new activity
  const onSaveActivityClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(addActivity({ name: activityName })).unwrap();
      setActivityName('');
    } catch (err) {
      console.error('Failed to save the post: ', err);
    }
  };
  //Add new source
  const onSaveSourceClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(addSource({ name: sourceName })).unwrap();
      setSourceName('');
    } catch (err) {
      console.error('Failed to save the post: ', err);
    }
  };

  //PROJECT
  //Add new project status
  const onSaveProjectStatusClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(addProjectStatus({ name: projectStatusName })).unwrap();
      setProjectStatusName('');
    } catch (err) {
      console.error('Failed to save the post: ', err);
    }
  };
  //Add new project type
  const onSaveProjectTypeClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(addProjectType({ name: projectTypeName })).unwrap();
      setProjectTypeName('');
    } catch (err) {
      console.error('Failed to save the post: ', err);
    }
  };

  return (
    <section className="relative p-4 grow h-screen w-[calc(100%-64rem)]">
      <div>
        <h3>Ajouter un status prospect</h3>
        <form onSubmit={(e) => onSaveProspectStatusClicked(e)}>
          <div>
            <label htmlFor="name">Nom</label>
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="color">Couleur</label>
            <input type="color" name="color" id="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
          <div>
            <label htmlFor="number">Ordre</label>
            <input type="number" name="number" id="number" value={order} onChange={(e) => setOrder(e.target.value)} />
          </div>
          <div>
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>

      <div>
        <h3>Ajouter un secteur d'activité</h3>
        <form onSubmit={(e) => onSaveActivityClicked(e)}>
          <div>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              name="name"
              id="name"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>

      <div>
        <h3>Ajouter une source</h3>
        <form onSubmit={(e) => onSaveSourceClicked(e)}>
          <div>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              name="name"
              id="name"
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>

      {/* <div>
        <h3>Ajouter un status project</h3>
        <form onSubmit={(e) => onSaveProjectStatusClicked(e)}>
          <div>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              name="name"
              id="name"
              value={projectStatusName}
              onChange={(e) => setProjectStatusName(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>

      <div>
        <h3>Ajouter un type project</h3>
        <form onSubmit={(e) => onSaveProjectTypeClicked(e)}>
          <div>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              name="name"
              id="name"
              value={projectTypeName}
              onChange={(e) => setProjectTypeName(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div> */}
    </section>
  );
}

export default Parameters;
