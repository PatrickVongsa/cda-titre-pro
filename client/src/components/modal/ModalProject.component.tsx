import { ChangeEvent, useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import { Typography } from '@material-tailwind/react';

import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { addProject, updateProject } from '../../redux/projectSlice';
import { getProjectStatus } from '../../redux/projectStatusSlice';
import { getProjectType } from '../../redux/projectTypeSlice';
import { GrClose } from 'react-icons/gr';
import { getProspects } from '../../redux/prospectSlice';
import { getUsers } from '../../redux/userSlice';
import {
  addProjectUser,
  deleteOneProjectUser,
  getAllProjectUsersbByProject,
} from '../../redux/projectUserSlice';

interface IProps {
  closeModal: () => void;
  project: IProject | null;
  setProject: (p: null) => void;
}

function ModalProject({ closeModal, project, setProject }: IProps) {
  const { status: projectStatus } = useAppSelector((state) => state.projectStatus);
  const { type: projectType } = useAppSelector((state) => state.projectType);
  const { prospects } = useAppSelector((state) => state.prospects);
  const { users } = useAppSelector((state) => state.users);
  const { projectUser } = useAppSelector((state) => state.projectUsers);

  const dispatch = useAppDispatch();

  const [name, setName] = useState(project ? project.name : '');
  const [description, setDescription] = useState(project ? project.description : '');
  const [startDate, setStartDate] = useState(project ? project.start_date : '');
  const [dueDate, setDueDate] = useState(project ? project.due_date : '');
  const [projectAmount, setProjectAmount] = useState(project ? project.project_amount : '');
  const [didDeposit, setDidDeposit] = useState(project ? project.did_deposit : false);
  const [hasFinancement, setHasFinancement] = useState(project ? project.has_financement : false);
  const [hasFullyPaid, setHasFullyPaid] = useState(project ? project.has_fully_paid : false);
  const [status, setStatus] = useState(project ? project.project_status_id : '');
  const [type, setType] = useState(project ? project.project_type_id : '');
  const [link, setLink] = useState(project ? project.link : '');
  const [githubLink, setGithubLink] = useState(project ? project.github_link : '');
  const [host, setHost] = useState(project ? project.host : '');
  const [oraName, setOraName] = useState(project ? project.ora_name : '');
  const [customerId, setCustomerId] = useState(project ? project.prospect_id : '');

  useEffect(() => {
    dispatch(getProjectStatus());
    dispatch(getProjectType());
    dispatch(getProspects());
    dispatch(getUsers());
    if (project) {
      dispatch(getAllProjectUsersbByProject(project));
    }
  }, []);

  const handleUserCheckbox = async (e: any, project: IProject, user: IUser) => {
    console.log('coucou');
    if (e.target.checked) {
      await dispatch(addProjectUser({ project, newUser: user }));
    } else {
      await dispatch(deleteOneProjectUser({ project, newUser: user }));
    }
  };

  const HandleSubmitAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!project) {
        await dispatch(
          addProject({
            name,
            description,
            start_date: new Date(startDate),
            due_date: new Date(dueDate),
            project_amount: Number(projectAmount),
            did_deposit: didDeposit,
            has_financement: hasFinancement,
            has_fully_paid: hasFullyPaid,
            project_status_id: Number(status),
            project_type_id: Number(type),
            link,
            github_link: githubLink,
            host,
            ora_name: oraName,
            prospect_id: customerId !== '' ? Number(customerId) : null,
          }),
        ).unwrap();

        setName('');
        setDescription('');
        setStartDate('');
        setDueDate('');
        setProjectAmount('');
        setDidDeposit(false);
        setHasFinancement(false);
        setHasFullyPaid(false);
        setStatus('');
        setType('');
        setLink('');
        setGithubLink('');
        setHost('');
        setOraName('');
        closeModal();
      } else {
        const updatedProject = await dispatch(
          updateProject({
            id: project.id,
            name,
            description,
            start_date: new Date(startDate),
            due_date: new Date(dueDate),
            project_amount: Number(projectAmount),
            did_deposit: didDeposit,
            has_financement: hasFinancement,
            has_fully_paid: hasFullyPaid,
            project_status_id: Number(status),
            project_type_id: Number(type),
            link,
            github_link: githubLink,
            host,
            ora_name: oraName,
            prospect_id: Number(customerId),
          }),
        ).unwrap();
        console.log(updatedProject);
        setName(updatedProject.name || '');
        setDescription(updatedProject.description || '');
        setStartDate(updatedProject.start_date || '');
        setDueDate(updatedProject.due_date || '');
        setProjectAmount(updatedProject.project_amount || '');
        setDidDeposit(updatedProject.did_deposit || false);
        setHasFinancement(updatedProject.has_financement || false);
        setHasFullyPaid(updatedProject.has_fully_paid || false);
        setStatus(updatedProject.project_status_id || '');
        setType(updatedProject.project_type_id || '');
        setLink(updatedProject.link || '');
        setGithubLink(updatedProject.github_link || '');
        setHost(updatedProject.host || '');
        setOraName(updatedProject.ora_name || '');
      }
    } catch (err) {
      console.error('Failed to save the post: ', err);
    }
  };
  console.log(projectUser);
  return (
    <div
      className="absolute flex justify-center items-center inset-0 bg-black bg-opacity-50 z-50"
      onClick={(e) => {
        e.preventDefault();
        setProject(null);
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
              {!project ? 'Créer un nouveau projet' : 'Détails du projet'}
            </Typography>
            <div>
              <GrClose
                className="text-black font-bold uppercase text-lg rounded hover:text-gray-800 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer"
                onClick={() => {
                  setProject(null);
                  closeModal();
                }}
              />
            </div>
          </div>
        </div>
        <div className="grow px-4 lg:px-10 py-10 pt-0 overflow-auto">
          <form onSubmit={HandleSubmitAddProject}>
            <Typography
              variant="small"
              className="text-blue-gray-400 text-sm mt-3 mb-2 font-bold uppercase"
            >
              Project Information
            </Typography>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full">
                  <label className="block uppercase text-blue-gray-600 text-xs font-bold mb-2">
                    Statut:
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">-- Choisir --</option>
                    {projectStatus.length &&
                      projectStatus.map((prjtstatus: IProjectStatus, i: number) => {
                        return (
                          <option value={prjtstatus.id} key={i + prjtstatus.name}>
                            {prjtstatus.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full">
                  <label className="block uppercase text-blue-gray-600 text-xs font-bold mb-2">
                    Type de projet:
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">-- Choisir --</option>
                    {projectType.length &&
                      projectType.map((t: IProjectType, i: number) => {
                        return (
                          <option value={t.id} key={i + t.name}>
                            {t.name}
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
                    Nom du projet
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

              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description du projet
                  </label>
                  <textarea
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    cols={30}
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Start date
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder=""
                    value={dayjs(startDate).format('YYYY-MM-DD')}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Due date
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder=""
                    value={dayjs(dueDate).format('YYYY-MM-DD')}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Montant du projet
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="31000"
                    value={projectAmount}
                    onChange={(e) => setProjectAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Accompte reçu?
                  </label>
                  <input
                    type="checkbox"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={`${didDeposit}`}
                    checked={didDeposit}
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setDidDeposit(e.target.checked);
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
                    Est finançable?
                  </label>
                  <input
                    type="checkbox"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={`${hasFinancement}`}
                    checked={hasFinancement}
                    onChange={(e) => setHasFinancement(e.target.checked)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Paiementtotal reçu?
                  </label>
                  <input
                    type="checkbox"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={`${hasFullyPaid}`}
                    checked={hasFullyPaid}
                    onChange={(e) => setHasFullyPaid(e.target.checked)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Url du projet
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Renseigner le nom de l'url du site client"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Lien du GitHub
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Renseigner le nom du dépôt Git"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nom de l'hébergeur
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Renseigner le nom de l'hébergeur"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nom du projet sur ora
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Renseigner le nom du tableau créé sur Ora"
                    value={oraName}
                    onChange={(e) => setOraName(e.target.value)}
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
                    Assigné à:
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={customerId === null ? '' : customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                  >
                    <option value="">-- Choisir --</option>
                    {prospects.length &&
                      prospects.map((prospect: IProspect, i: number) => {
                        if (prospect.is_client) {
                          return (
                            <option
                              value={prospect.id}
                              key={i + prospect.company_name.replace(' ', '-')}
                            >
                              {prospect.company_name}
                            </option>
                          );
                        }
                      })}
                  </select>
                </div>
              </div>
            </div>

            {project && (
              <>
                <hr className="my-4 border-b-1 border-blue-gray-300" />

                <h6 className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Équipe</h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-2 mb-4">
                    <div className="relative w-full">
                      <div className="grid grid-cols-2 gap-4 p-4">
                        {users.length > 0 &&
                          users.map((user: IUser, i: number) => {

                            return (
                              <div key={i + user.lastname} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-fit ease-linear transition-all duration-150"
                                  placeholder="Renseigner le nom du tableau créé sur Ora"
                                  checked={projectUser.some(userAssign => userAssign.user_id === user.id)}
                                  onChange={(e) => handleUserCheckbox(e, project, user)}
                                />
                                <label className="block uppercase text-blue-gray-600 text-xs font-bold">
                                  {user.firstname} {user.lastname}
                                </label>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
              >
                {!project ? 'Ajouter' : 'Enregistrer les modifications'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalProject;
