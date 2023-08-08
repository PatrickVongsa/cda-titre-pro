import { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import 'dayjs/locale/fr';

import { useAppSelector, useAppDispatch } from '../hooks/redux.hook';

import { getDomains, deleteDomain } from '../redux/domainSlice';

import useModal from '../hooks/useModal';
import Header from '../components/header/Header.component';
import ModalDomain from '../components/modal/ModalDomain.component';

import { Typography } from '@material-tailwind/react';
import { FaTrashAlt } from 'react-icons/fa';
import useAuthFromLocalStorage from '../hooks/useAuthFromLocalStorage';

function Domain() {
  const { isShowing, toggle } = useModal();

  const { domains, loading } = useAppSelector((state) => state.domains);

  const dispatch = useAppDispatch();

  const [domainShow, setDomainShow] = useState<IDomain | null>(null);


  useAuthFromLocalStorage();

  useEffect(() => {
    dispatch(getDomains());
  }, []);

  const handleDeleteDomain = async (domain: IDomain) => {
    await dispatch(deleteDomain(domain));
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
      {isShowing && <ModalDomain closeModal={toggle} domain={domainShow} setDomain={(d: null) => setDomainShow(d)} />}

      <section className="relative p-4 grow h-screen overflow-y-auto">
        {!domains.length && <p>Pas de domaines</p>}
        <div className="w-full grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {domains.length > 0 &&
            domains.map((domain: IDomain, i: number) => (
              <div
                key={i}
                className="group/cardProject relative border-2 border-gray-300 rounded-2xl p-8 flex flex-col gap-2 hover:scale-105 hover:border-blue-500 transition-all ease-in-out duration-300 cursor-pointer shadow-md"
                onClick={() => {
                  setDomainShow(domain);
                  toggle();
                }}
              >
                <button
                  className="block absolute top-4 right-4 p-2 rounded-lg border border-red-400 text-red-400 invisible hover:bg-red-400 hover:text-white group-hover/cardProject:visible"
                  title="Supprimer le project"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteDomain(domain);
                  }}
                >
                  <FaTrashAlt />
                </button>
                <Typography variant="lead" className="capitalize font-semibold">
                  {domain.domain_name}
                </Typography>
                <p className="text-xs text-center">
                  {' '}
                  Créé le :{' '}
                  <span className="capitalize font-semibold">
                    {dayjs(domain.created_at).locale('fr').format('DD MMMM YYYY')}
                  </span>
                </p>
                <p className="text-xs text-center">
                  {' '}
                  Exprire le :{' '}
                  <span className="capitalize font-semibold">
                    {dayjs(domain.renew_at).locale('fr').format('DD MMMM YYYY')}
                  </span>
                </p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default Domain;
