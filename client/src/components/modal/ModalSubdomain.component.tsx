import { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';

import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { addSubdomain, updateSubdomain } from '../../redux/subdomainSlice';
import { getDomains } from '../../redux/domainSlice';
import { getServers } from '../../redux/serverSlice';
import { GrClose } from 'react-icons/gr';

interface IProps {
  closeModal: () => void;
  subdomain: ISubdomain | null;
  setSubdomain: (p: null) => void;
}

function ModalSubdomain({ closeModal, subdomain, setSubdomain }: IProps) {
  const { domains } = useAppSelector((state) => state.domains);
  const { servers } = useAppSelector((state) => state.servers);

  const dispatch = useAppDispatch();

  const [name, setName] = useState(subdomain ? subdomain.name : '');
  const [domainId, setDomainId] = useState(subdomain ? subdomain.domain_id : '');
  const [serverId, setServerId] = useState(subdomain ? subdomain.server_id : '');

  useEffect(() => {
    dispatch(getDomains());
    dispatch(getServers());
  }, []);

  const HandleSubmitAddSubdomain = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!subdomain) {
        await dispatch(
          addSubdomain({
            name,
            domain_id: Number(domainId),
            server_id: serverId !== '' ? Number(serverId) : null,
          }),
        ).unwrap();

        setName('');
        setDomainId('');
        setServerId('');
        closeModal();
      } else {
        const updatedSubdomain = await dispatch(
          updateSubdomain({
            id: subdomain.id,
            name,
            domain_id: Number(domainId),
            server_id: serverId !== '' ? Number(serverId) : null,
          }),
        ).unwrap();
        console.log(updatedSubdomain);
        setName(updatedSubdomain.name || '');
        setDomainId(updatedSubdomain.domain_id || '');
        setServerId(updatedSubdomain.server_id || '');
      }
    } catch (err) {
      console.error('Failed to save the post: ', err);
    }
  };
  
  return (
    <div
      className="absolute flex justify-center items-center inset-0 bg-black bg-opacity-50 z-50"
      onClick={(e) => {
        e.preventDefault();
        setSubdomain(null);
        closeModal();
      }}
    >
      <div
        className="relative flex flex-col min-w-0 break-words w-[50%] h-[75%] mb-6 shadow-lg rounded-lg bg-gray-100 border-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-t bg-gray-300 mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <Typography variant="h4" className="mb-2">
              {!subdomain ? 'Créer un nouveau sous domaine' : 'Détails du sous domaine'}
            </Typography>
            <div>
              <GrClose
                className="text-black font-bold uppercase text-lg rounded hover:text-gray-800 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer"
                onClick={() => {
                  setSubdomain(null);
                  closeModal();
                }}
              />
            </div>
          </div>
        </div>
        <div className="grow px-4 lg:px-10 py-10 pt-0 overflow-auto">
          <form onSubmit={HandleSubmitAddSubdomain}>
            <Typography
              variant="small"
              className="text-blue-gray-400 text-sm mt-3 mb-2 font-bold uppercase"
            >
              Information sous domaine
            </Typography>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full">
                  <label className="block uppercase text-blue-gray-600 text-xs font-bold mb-2">
                    Domaine lié:
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={domainId}
                    onChange={(e) => setDomainId(e.target.value)}
                  >
                    <option value="">-- Choisir --</option>
                    {domains.length &&
                      domains.map((domain: IDomain, i: number) => {
                        return (
                          <option value={domain.id} key={i + domain.domain_name}>
                            {domain.domain_name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>

            <hr className="my-4 border-b-1 border-blue-gray-300" />

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nom du sous domaine
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="One page SAS entreprise"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <hr className="my-4 border-b-1 border-blue-gray-300" />

            <h6 className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Client</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-2 mb-4">
                <div className="relative w-full">
                  <label className="block uppercase text-blue-gray-600 text-xs font-bold mb-2">
                    Serveur lié:
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={serverId === null ? '' : serverId}
                    onChange={(e) => setServerId(e.target.value)}
                  >
                    <option value="">-- Choisir --</option>
                    {servers.length &&
                      servers.map((server: IServer, i: number) => {
                        return (
                          <option value={server.id} key={i + server.name.replace(' ', '-')}>
                            {server.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
              >
                {!subdomain ? 'Ajouter' : 'Enregistrer les modifications'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalSubdomain;
