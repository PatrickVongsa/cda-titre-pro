import { ChangeEvent, useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import { Typography } from '@material-tailwind/react';

import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { addDomain, updateDomain } from '../../redux/domainSlice';
import { getProjects } from '../../redux/projectSlice';
import { getHosts } from '../../redux/hostSlice';
import { getServers } from '../../redux/serverSlice';

import { GrClose } from 'react-icons/gr';

interface IProps {
  closeModal: () => void;
  domain: IDomain | null;
  setDomain: (p: null) => void;
}

function ModalDomain({ closeModal, domain, setDomain }: IProps) {
  const { projects } = useAppSelector((state) => state.projects);
  const { hosts } = useAppSelector((state) => state.hosts);
  const { servers } = useAppSelector((state) => state.servers);

  const dispatch = useAppDispatch();

  const [domainName, setDomainName] = useState(domain ? domain.domain_name : '');
  const [createdAt, setCreatedAt] = useState(domain ? domain.created_at : '');
  const [renewAt, setRenewAt] = useState(domain ? domain.renew_at : '');
  const [isOwner, setIsOwner] = useState(domain ? domain.is_owner : false);
  const [accountName, setAccountName] = useState(domain ? domain.account_name : '');
  const [projectId, setProjectId] = useState(domain ? domain.project_id : '');
  const [hostId, setHostId] = useState(domain ? domain.host_id : '');
  const [serverId, setServerId] = useState(domain ? domain.server_id : '');

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getHosts());
    dispatch(getServers());
  }, []);

  const HandleSubmitAddDomain = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!domain) {
        await dispatch(
          addDomain({
            domain_name: domainName,
            created_at: new Date(createdAt),
            renew_at: new Date(renewAt),
            is_owner: isOwner,
            account_name: accountName,
            project_id: Number(projectId),
            host_id: Number(hostId),
            server_id: serverId !== '' ? Number(serverId) : null,
          }),
        ).unwrap();

        setDomainName('');
        setCreatedAt('');
        setRenewAt('');
        setIsOwner(false);
        setAccountName('');
        setProjectId('');
        setHostId('');
        setServerId('');
        closeModal();
      } else {
        const updatedDomain = await dispatch(
          updateDomain({
            id: domain.id,
            domain_name: domainName,
            created_at: new Date(createdAt),
            renew_at: new Date(renewAt),
            is_owner: isOwner,
            account_name: accountName,
            project_id: Number(projectId),
            host_id: Number(hostId),
            server_id: serverId !== '' ? Number(serverId) : null,
          }),
        ).unwrap();
        console.log(updatedDomain);
        setDomainName(updatedDomain.domain_name || '');
        setCreatedAt(updatedDomain.created_at || '');
        setRenewAt(updatedDomain.renew_at || '');
        setIsOwner(updatedDomain.is_owner || false);
        setAccountName(updatedDomain.account_name || '');
        setProjectId(updatedDomain.projectId || '');
        setHostId(updatedDomain.hostId || '');
        setServerId(updatedDomain.serverId || '');
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
        setDomain(null);
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
              {!domain ? 'Créer un nouveau domaine' : 'Détails du domaine'}
            </Typography>
            <div>
              <GrClose
                className="text-black font-bold uppercase text-lg rounded hover:text-gray-800 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer"
                onClick={() => {
                  setDomain(null);
                  closeModal();
                }}
              />
            </div>
          </div>
        </div>
        <div className="grow px-4 lg:px-10 py-10 pt-0 overflow-auto">
          <form onSubmit={HandleSubmitAddDomain}>
            <Typography
              variant="small"
              className="text-blue-gray-400 text-sm mt-3 mb-2 font-bold uppercase"
            >
              Information Nom de Domaine
            </Typography>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nom du domaine
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="One page SAS entreprise"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Date création
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder=""
                    value={dayjs(createdAt).format('YYYY-MM-DD')}
                    onChange={(e) => setCreatedAt(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Date renouvellement
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder=""
                    value={dayjs(renewAt).format('YYYY-MM-DD')}
                    onChange={(e) => setRenewAt(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Webgo propriétaire?
                  </label>
                  <input
                    type="checkbox"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={`${isOwner}`}
                    checked={isOwner}
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setIsOwner(e.target.checked);
                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nom du compte
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Renseigner le nom de l'url du site client"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <hr className="my-4 border-b-1 border-blue-gray-300" />

            <h6 className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Client</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-2 mb-4">
                <div className="relative w-full">
                  <label className="block uppercase text-blue-gray-600 text-xs font-bold mb-2">
                    Projet lié:
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={projectId === null ? '' : projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                  >
                    <option value="">-- Choisir --</option>
                    {projects.length &&
                      projects.map((project: IProject, i: number) => {
                        return (
                          <option value={project.id} key={i + project.name.replace(' ', '-')}>
                            {project.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-2 mb-4">
                <div className="relative w-full">
                  <label className="block uppercase text-blue-gray-600 text-xs font-bold mb-2">
                    Hébergeur lié:
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={hostId === null ? '' : hostId}
                    onChange={(e) => setHostId(e.target.value)}
                  >
                    <option value="">-- Choisir --</option>
                    {hosts.length &&
                      hosts.map((host: IHost, i: number) => {
                        return (
                          <option value={host.id} key={i + host.name.replace(' ', '-')}>
                            {host.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-2 mb-4">
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
                {!domain ? 'Ajouter' : 'Enregistrer les modifications'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalDomain;
