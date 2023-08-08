import { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import 'dayjs/locale/fr';

import { useAppSelector, useAppDispatch } from '../hooks/redux.hook';

import { getServers, deleteServer } from '../redux/serverSlice';

import useModal from '../hooks/useModal';
import Header from '../components/header/Header.component';

import { Typography } from '@material-tailwind/react';
import { FaTrashAlt } from 'react-icons/fa';
import ModalServer from '../components/modal/ModalServer.component';
import useAuthFromLocalStorage from '../hooks/useAuthFromLocalStorage';

function Server() {
  const { isShowing, toggle } = useModal();

  const { servers, loading } = useAppSelector((state) => state.servers);

  const dispatch = useAppDispatch();

  const [serverShow, setServerShow] = useState<IServer | null>(null);


  useAuthFromLocalStorage();

  useEffect(() => {
    dispatch(getServers());
  }, []);

  const handleDeleteServer = async (server: IServer) => {
    await dispatch(deleteServer(server));
  };

  return (
    <div className="relative p-4 grow h-screen w-[calc(100%-64rem)]">
      <Header
        pageTitle="Serveurs"
        searchBar={true}
        tabs={false}
        createButton={true}
        openModal={toggle}
      />
      {isShowing && <ModalServer closeModal={toggle} server={serverShow} setServer={(s: null) => setServerShow(s)} />}

      <section className="relative p-4 grow h-screen overflow-y-auto">
        {!servers.length && <p>Pas de domaines</p>}
        <div className="w-full grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {servers.length > 0 &&
            servers.map((server: IServer, i: number) => (
              <div
                key={i}
                className="group/cardProject relative border-2 border-gray-300 rounded-2xl p-8 flex flex-col gap-2 hover:scale-105 hover:border-blue-500 transition-all ease-in-out duration-300 cursor-pointer shadow-md"
                onClick={() => {
                  setServerShow(server);
                  toggle();
                }}
              >
                <button
                  className="block absolute top-4 right-4 p-2 rounded-lg border border-red-400 text-red-400 invisible hover:bg-red-400 hover:text-white group-hover/cardProject:visible"
                  title="Supprimer le project"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteServer(server);
                  }}
                >
                  <FaTrashAlt />
                </button>
                <Typography variant="lead" className="capitalize font-semibold">
                  {server.name}
                </Typography>
                <p className="text-xs text-center">
                  {' '}
                  Créé le :{' '}
                  <span className="capitalize font-semibold">
                    {dayjs(server.created_at).locale('fr').format('DD MMMM YYYY')}
                  </span>
                </p>
                <p className="text-xs text-center">
                  {' '}
                  Exprire le :{' '}
                  <span className="capitalize font-semibold">
                    {dayjs(server.renew_at).locale('fr').format('DD MMMM YYYY')}
                  </span>
                </p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default Server;
