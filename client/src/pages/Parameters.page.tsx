import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/redux.hook';

import { addProspectStatus } from '../redux/prospectStatusSlice';
import { addProjectStatus } from '../redux/projectStatusSlice';
import { addProjectType } from '../redux/projectTypeSlice';
import { addActivity } from '../redux/activitySlice';
import { addSource } from '../redux/sourceSlice';
import { Typography } from '@material-tailwind/react';
import { addDaysOffStatus } from '../redux/daysOffStatusSlice';
import { addServerType } from '../redux/serverTypeSlice';
import { addHost } from '../redux/hostSlice';
import useAuthFromLocalStorage from '../hooks/useAuthFromLocalStorage';

function Parameters() {
  const [name, setName] = useState('');
  const [projectStatusName, setProjectStatusName] = useState('');
  const [projectTypeName, setProjectTypeName] = useState('');
  const [activityName, setActivityName] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [serverTypeName, setServerTypeName] = useState('');
  const [hostName, setHostName] = useState('');
  const [linkHostName, setLinkHostName] = useState('');
  const [color, setColor] = useState('');
  const [order, setOrder] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const [daysOffStatusName, setDaysOffStatusName] = useState('');

  const dispatch = useAppDispatch();


  useAuthFromLocalStorage();

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
  //Add new serverType
  const onSaveServerTypeClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(addServerType({ name: serverTypeName })).unwrap();
      setServerTypeName('');
    } catch (err) {
      console.error('Failed to save the post: ', err);
    }
  };
  //Add new host
  const onSaveHostClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(addHost({ name: hostName, link: linkHostName })).unwrap();
      setHostName('');
      setLinkHostName('');
    } catch (err) {
      console.error('Failed to save the post: ', err);
    }
  };

  //DAYS OFF
  //Add new days off status
  const onSaveDaysOffStatusClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(addDaysOffStatus({ name: daysOffStatusName })).unwrap();
      setDaysOffStatusName('');
    } catch (err) {
      console.error('Failed to save the post: ', err);
    }
  };

  return (
    <main className="relative p-4 grow h-screen w-[calc(100%-64rem)] overflow-y-auto">
      <section className="border border-gray-500 p-8 mb-4 rounded-3xl">
        <Typography variant="h2" className="mb-4">
          Paramètres Prospect
        </Typography>
        <div className="p-2">
          <Typography variant="h5" className="mb-4">
            Ajouter un status prospect
          </Typography>
          <form onSubmit={(e) => onSaveProspectStatusClicked(e)}>
            <div className="relative w-full mb-3">
              <label
                htmlFor="name"
                className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
              >
                Nom
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative w-full mb-3">
              <label
                htmlFor="color"
                className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
              >
                Couleur
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="color"
                name="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="relative w-full mb-3">
              <label
                htmlFor="number"
                className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
              >
                Ordre
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="number"
                name="number"
                id="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              />
            </div>
            <div className="relative w-full mb-3">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>

        <hr />
        <div className="p-2">
          <Typography variant="h5" className="mb-4">
            Ajouter un secteur d'activité
          </Typography>
          <form onSubmit={(e) => onSaveActivityClicked(e)}>
            <div className="relative w-full mb-3">
              <label
                htmlFor="name"
                className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
              >
                Nom
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="text"
                name="name"
                id="name"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
              />
            </div>
            <div className="relative w-full mb-3">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>

        <hr />
        <div className="p-2">
          <Typography variant="h5" className="mb-4">
            Ajouter une source
          </Typography>
          <form onSubmit={(e) => onSaveSourceClicked(e)}>
            <div className="relative w-full mb-3">
              <label
                htmlFor="name"
                className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
              >
                Nom
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="text"
                name="name"
                id="name"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
              />
            </div>
            <div className="relative w-full mb-3">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="border border-gray-500 p-8 mb-4 rounded-3xl">
        <Typography variant="h2" className="mb-4">
          Paramètres Projet
        </Typography>
        <div className="p-2">
          <Typography variant="h5" className="mb-4">
            Ajouter un status project
          </Typography>
          <form onSubmit={(e) => onSaveProjectStatusClicked(e)}>
            <div className="relative w-full mb-3">
              <label
                htmlFor="name"
                className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
              >
                Nom
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="text"
                name="name"
                id="name"
                value={projectStatusName}
                onChange={(e) => setProjectStatusName(e.target.value)}
              />
            </div>
            <div className="relative w-full mb-3">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>

        <hr />
        <div className="p-2">
          <Typography variant="h5" className="mb-4">
            Ajouter un type project
          </Typography>
          <form onSubmit={(e) => onSaveProjectTypeClicked(e)}>
            <div className="relative w-full mb-3">
              <label
                htmlFor="name"
                className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
              >
                Nom
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="text"
                name="name"
                id="name"
                value={projectTypeName}
                onChange={(e) => setProjectTypeName(e.target.value)}
              />
            </div>
            <div className="relative w-full mb-3">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>

        <hr />
        <div className="p-2">
          <Typography variant="h5" className="mb-4">
            Ajouter un type de server
          </Typography>
          <form onSubmit={(e) => onSaveServerTypeClicked(e)}>
            <div className="relative w-full mb-3">
              <label
                htmlFor="name"
                className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
              >
                Nom
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="text"
                name="name"
                id="name"
                value={serverTypeName}
                onChange={(e) => setServerTypeName(e.target.value)}
              />
            </div>
            <div className="relative w-full mb-3">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>

        <hr />
        <div className="p-2">
          <Typography variant="h5" className="mb-4">
            Ajouter un hébergeur
          </Typography>
          <form onSubmit={(e) => onSaveHostClicked(e)}>
            <div className="relative w-full mb-3">
              <label
                htmlFor="name"
                className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
              >
                Nom
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="text"
                name="name"
                id="name"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
              />
            </div>
            <div className="relative w-full mb-3">
              <label
                htmlFor="link"
                className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
              >
                Lien de connexion hébergeur
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="text"
                name="link"
                id="link"
                value={linkHostName}
                onChange={(e) => setLinkHostName(e.target.value)}
              />
            </div>
            <div className="relative w-full mb-3">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="border border-gray-500 p-8 mb-4 rounded-3xl">
        <Typography variant="h2" className="mb-4">
          Paramètres Congés
        </Typography>
        <div className="p-2">
          <Typography variant="h5" className="mb-4">
            Ajouter un status demande de congés
          </Typography>
          <form onSubmit={(e) => onSaveDaysOffStatusClicked(e)}>
            <div className="relative w-full mb-3">
              <label
                htmlFor="name"
                className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
              >
                Nom
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="text"
                name="name"
                id="name"
                value={daysOffStatusName}
                onChange={(e) => setDaysOffStatusName(e.target.value)}
              />
            </div>
            <div className="relative w-full mb-3">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Parameters;
