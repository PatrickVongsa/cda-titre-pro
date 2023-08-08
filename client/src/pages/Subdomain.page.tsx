import { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import 'dayjs/locale/fr';

import { useAppSelector, useAppDispatch } from '../hooks/redux.hook';

import { getSubdomains, deleteSubdomain } from '../redux/subdomainSlice';

import useModal from '../hooks/useModal';
import Header from '../components/header/Header.component';

import { Typography } from '@material-tailwind/react';
import { FaTrashAlt } from 'react-icons/fa';
import ModalSubdomain from '../components/modal/ModalSubdomain.component';
import useAuthFromLocalStorage from '../hooks/useAuthFromLocalStorage';

function Subdomain() {
  const { isShowing, toggle } = useModal();

  const { subdomains, loading } = useAppSelector((state) => state.subdomains);

  const dispatch = useAppDispatch();

  const [subdomainShow, setSubdomainShow] = useState<ISubdomain | null>(null);


  useAuthFromLocalStorage();

  useEffect(() => {
    dispatch(getSubdomains());
  }, []);

  const handleDeleteSubomain = async (subdomain: ISubdomain) => {
    await dispatch(deleteSubdomain(subdomain));
  };

  return (
    <div className="relative p-4 grow h-screen w-[calc(100%-64rem)]">
      <Header
        pageTitle="Nom de domaine"
        searchBar={true}
        tabs={false}
        createButton={true}
        openModal={toggle}
      />
      {isShowing && <ModalSubdomain closeModal={toggle} subdomain={subdomainShow} setSubdomain={(s: null) => setSubdomainShow(s)} />}

      <section className="relative p-4 grow h-screen overflow-y-auto">
        {!subdomains.length && <p>Pas de domaines</p>}
        <div className="w-full grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {subdomains.length > 0 &&
            subdomains.map((subdomain: ISubdomain, i: number) => (
              <div
                key={i}
                className="group/cardProject relative border-2 border-gray-300 rounded-2xl p-8 flex flex-col gap-2 hover:scale-105 hover:border-blue-500 transition-all ease-in-out duration-300 cursor-pointer shadow-md"
                onClick={() => {
                  setSubdomainShow(subdomain);
                  toggle();
                }}
              >
                <button
                  className="block absolute top-4 right-4 p-2 rounded-lg border border-red-400 text-red-400 invisible hover:bg-red-400 hover:text-white group-hover/cardProject:visible"
                  title="Supprimer le project"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSubomain(subdomain);
                  }}
                >
                  <FaTrashAlt />
                </button>
                <Typography variant="lead" className="capitalize font-semibold">
                  {subdomain.name}
                </Typography>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default Subdomain;
