import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../../hooks/redux.hook';
import { getProjects } from '../../../redux/projectSlice';
import CardProject from '../../cards/CardProject.component';

interface IProps {
  prospectId: number | undefined;
}

function ProjectCustomer({ prospectId }: IProps) {
  const { projects } = useAppSelector((state) => state.projects);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <div className="h-[60vh] overflow-y-auto pr-4 pb-16">
      <div className="flex flex-col gap-4">
      {prospectId &&
        projects.map((project) => {
          if (project.prospect_id === prospectId) {
            return <CardProject project={project} />;
          }
        })}</div>
    </div>
  );
}

export default ProjectCustomer;
