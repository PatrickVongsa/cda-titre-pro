import { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import 'dayjs/locale/fr';

import { useAppSelector, useAppDispatch } from '../hooks/redux.hook';

import { getProjects, addProject, deleteProject } from '../redux/projectSlice';
import { getProjectStatus } from '../redux/projectStatusSlice';
import { getProjectType } from '../redux/projectTypeSlice';

import Header from '../components/header/Header.component';
import useModal from '../hooks/useModal';
import ModalProject from '../components/modal/ModalProject.component';
import { Typography } from '@material-tailwind/react';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteProjectUser } from '../redux/projectUserSlice';

function Project() {
  const { isShowing, toggle } = useModal();

  const { projects, loading } = useAppSelector((state) => state.projects);
  const { status: projectStatus, loading: loadingStatus } = useAppSelector(
    (state) => state.projectStatus,
  );
  const { type: projectType, loading: loadingType } = useAppSelector((state) => state.projectType);

  const dispatch = useAppDispatch();

  const [projectShow, setProjectShow] = useState<IProject | null>(null);

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getProjectStatus());
    dispatch(getProjectType());
  }, []);

  const handleDeleteProject = async (project: IProject) => {
    await dispatch(deleteProjectUser(project));
    await dispatch(deleteProject(project));
  };

  return (
    <div className="relative p-4 grow h-screen w-[calc(100%-64rem)]">
      <Header
        pageTitle="Projets"
        searchBar={true}
        tabs={false}
        createButton={true}
        openModal={toggle}
      />
      {isShowing && <ModalProject closeModal={toggle} project={projectShow} setProject={(p: null) => setProjectShow(p)} />}

      <section className="relative p-4 grow h-screen overflow-y-auto">
        {!projects.length && <p>Pas de projets</p>}
        <div className="w-full grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {projects.length > 0 &&
            projects.map((project: IProject, i: number) => (
              <div
                key={i}
                className="group/cardProject relative border-2 border-gray-300 rounded-2xl p-8 flex flex-col gap-2 hover:scale-105 hover:border-blue-500 transition-all ease-in-out duration-300 cursor-pointer shadow-md"
                onClick={() => {
                  setProjectShow(project);
                  toggle();
                }}
              >
                <button
                className="block absolute top-4 right-4 p-2 rounded-lg border border-red-400 text-red-400 invisible hover:bg-red-400 hover:text-white group-hover/cardProject:visible"
                title="Supprimer le project"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProject(project);
                }}
              >
                <FaTrashAlt />
              </button>
                <div className="flex justify-center gap-2">
                  <p className="w-fit py-2 px-4 rounded-full text-xs bg-blue-gray-200">
                    {projectType.filter((type) => type.id === project.project_type_id)[0]?.name}
                  </p>
                  <p className="w-fit py-2 px-4 rounded-full text-xs bg-blue-200">
                    {
                      projectStatus.filter((status) => status.id === project.project_status_id)[0]
                        ?.name
                    }
                  </p>
                </div>
                <Typography variant="lead" className="capitalize font-semibold">
                  {project.name}
                </Typography>
                <p className="italic h-full">{project.description}</p>
                <p className='text-xs text-center'>
                  {' '}
                  Commence le :{' '}
                  <span className="capitalize font-semibold">
                    {dayjs(project.start_date).locale('fr').format('DD MMMM YYYY')}
                  </span>
                </p>
                <p className='text-xs text-center'>
                  {' '}
                  Livraison le :{' '}
                  <span className="capitalize font-semibold">
                    {dayjs(project.due_date).locale('fr').format('DD MMMM YYYY')}
                  </span>
                </p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default Project;
