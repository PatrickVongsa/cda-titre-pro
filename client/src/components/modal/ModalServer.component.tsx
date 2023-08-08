import { ChangeEvent, useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import { Typography } from '@material-tailwind/react';

import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { addServer, updateServer } from '../../redux/serverSlice';
import { getProjects } from '../../redux/projectSlice';
import { getHosts } from '../../redux/hostSlice';
import { getServerTypes } from '../../redux/serverTypeSlice';

import { GrClose } from 'react-icons/gr';

interface IProps {
  closeModal: () => void;
  server: IServer | null;
  setServer: (p: null) => void;
}

function ModalServer({ closeModal, server, setServer }: IProps) {
  const { projects } = useAppSelector((state) => state.projects);
  const { hosts } = useAppSelector((state) => state.hosts);
  const { serverTypes } = useAppSelector((state) => state.serverTypes);

  const dispatch = useAppDispatch();

  const [name, setName] = useState(server ? server.name : '');
  const [createdAt, setCreatedAt] = useState(server ? server.created_at : '');
  const [renewAt, setRenewAt] = useState(server ? server.renew_at : '');
  const [isOwner, setIsOwner] = useState(server ? server.is_owner : false);
  const [accountName, setAccountName] = useState(server ? server.account_name : '');
  const [projectId, setProjectId] = useState(server ? server.project_id : '');
  const [hostId, setHostId] = useState(server ? server.host_id : '');
  const [serverTypeId, setServerTypeId] = useState(server ? server.server_type_id : '');
  const [isDev, setIsDev] = useState(server ? server.is_dev : false);
  const [isProd, setIsProd] = useState(server ? server.is_prod : false);
  const [ipv4, setIpv4] = useState(server ? server.ipv4 : '');
  const [ipv6, setIpv6] = useState(server ? server.ipv6 : '');
  const [sftp, setSftp] = useState(server ? server.sftp : '');
  const [ssh, setSsh] = useState(server ? server.ssh : '');
  const [dbHostName, setDbHostName] = useState(server ? server.bdd_host_name : '');

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getHosts());
    dispatch(getServerTypes());
  }, []);

  const HandleSubmitAddDomain = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!server) {
        await dispatch(
          addServer({
            name,
            created_at: new Date(createdAt),
            renew_at: new Date(renewAt),
            is_owner: isOwner,
            account_name: accountName,
            project_id: Number(projectId),
            host_id: Number(hostId),
            server_type_id: Number(serverTypeId),
            is_dev: isDev,
            is_prod: isProd,
            ipv4,
            ipv6,
            sftp,
            ssh,
            bdd_host_name: dbHostName,
          }),
        ).unwrap();

        setName('');
        setCreatedAt('');
        setRenewAt('');
        setIsOwner(false);
        setAccountName('');
        setProjectId('');
        setHostId('');
        setServerTypeId('');
        setIsDev(false);
        setIsProd(false);
        setIpv4('');
        setIpv6('');
        setSftp('');
        setSsh('');
        setDbHostName('');
        closeModal();
      } else {
        const updatedDomain = await dispatch(
          updateServer({
            id: server.id,
            name,
            created_at: new Date(createdAt),
            renew_at: new Date(renewAt),
            is_owner: isOwner,
            account_name: accountName,
            project_id: Number(projectId),
            host_id: Number(hostId),
            server_type_id: Number(serverTypeId),
            is_dev: isDev,
            is_prod: isProd,
            ipv4,
            ipv6,
            sftp,
            ssh,
            bdd_host_name: dbHostName,
          }),
        ).unwrap();
        console.log(updatedDomain);
        setName(updatedDomain.name || '');
        setCreatedAt(updatedDomain.created_at || '');
        setRenewAt(updatedDomain.renew_at || '');
        setIsOwner(updatedDomain.is_owner || false);
        setAccountName(updatedDomain.account_name || '');
        setProjectId(updatedDomain.projectId || '');
        setHostId(updatedDomain.hostId || '');
        setServerTypeId(updatedDomain.server_type_Id || '');
        setIsDev(updatedDomain.is_dev || false);
        setIsProd(updatedDomain.is_prod || false);
        setIpv4(updatedDomain.ipv4 || '');
        setIpv6(updatedDomain.ipv6 || '');
        setSftp(updatedDomain.sftp || '');
        setSsh(updatedDomain.ssh || '');
        setDbHostName(updatedDomain.bdd_host_name || '');
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
        setServer(null);
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
              {!server ? 'Créer un nouveau serveur' : 'Détails du server'}
            </Typography>
            <div>
              <GrClose
                className="text-black font-bold uppercase text-lg rounded hover:text-gray-800 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer"
                onClick={() => {
                  setServer(null);
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
                    Nom du serveur
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
                    value={serverTypeId === null ? '' : serverTypeId}
                    onChange={(e) => setServerTypeId(e.target.value)}
                  >
                    <option value="">-- Choisir --</option>
                    {serverTypes.length &&
                      serverTypes.map((serverType: IServerType, i: number) => {
                        return (
                          <option value={serverType.id} key={i + serverType.name.replace(' ', '-')}>
                            {serverType.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Serveur de dév?
                  </label>
                  <input
                    type="checkbox"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={`${isDev}`}
                    checked={isDev}
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setIsDev(e.target.checked);
                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Serveur de prod?
                  </label>
                  <input
                    type="checkbox"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={`${isProd}`}
                    checked={isProd}
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setIsProd(e.target.checked);
                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    IPV4
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Renseigner le nom de l'url du site client"
                    value={ipv4}
                    onChange={(e) => setIpv4(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    IPV6
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="One page SAS entreprise"
                    value={ipv6}
                    onChange={(e) => setIpv6(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    SFTP
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Renseigner le nom de l'url du site client"
                    value={sftp}
                    onChange={(e) => setSftp(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    SSH
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="One page SAS entreprise"
                    value={ssh}
                    onChange={(e) => setSsh(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Hostname BDD
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="One page SAS entreprise"
                    value={dbHostName}
                    onChange={(e) => setDbHostName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
              >
                {!server ? 'Ajouter' : 'Enregistrer les modifications'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalServer;
