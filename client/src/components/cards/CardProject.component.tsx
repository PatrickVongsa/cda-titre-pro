import { Typography } from '@material-tailwind/react';
import React from 'react';
import * as dayjs from 'dayjs';
import 'dayjs/locale/fr';

interface IProps {
  project: IProject;
}

function CardProject({ project }: IProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border-2 border-gray-400 hover:border-blue-300 hover:shadow-md rounded-xl">
      <div className="flex flex-col-reverse lg:flex-row gap-2">
        <Typography variant="h4" className="font-semibold grow">
          {project.name}
        </Typography>
        <div className="flex gap-2 justify-end">
          <p className="px-4 py-2 text-xs rounded-full bg-gray-200 font-semibold">
            {project.project_type?.name}
          </p>
          <p className="px-4 py-2 text-xs rounded-full bg-blue-500 font-semibold">
            {project.project_status?.name}
          </p>
        </div>
      </div>
      <div>
        <p className="uppercase text-xs font-semibold mb-2">Description</p>
        <p>{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-4 justify-between">
        <div>
          <p className="uppercase text-xs font-semibold mb-2">Date de début</p>
          <p>{dayjs(project.start_date).locale('fr').format('DD MMMM YYYY')}</p>
        </div>
        <div>
          <p className="uppercase text-xs font-semibold mb-2">Date de fin</p>
          <p>{dayjs(project.due_date).locale('fr').format('DD MMMM YYYY')}</p>
        </div>
        <div>
          <p className="uppercase text-xs font-semibold mb-2">Montant</p>
          <p>{project.project_amount} €</p>
        </div>
        <div>
          <p className="uppercase text-xs font-semibold mb-2">Financement</p>
          <p>{project.has_financement ? 'Oui' : 'Non'}</p>
        </div>
        <div>
          <p className="uppercase text-xs font-semibold mb-2">Accompte reçu</p>
          <p>{project.did_deposit ? 'Oui' : 'Non'}</p>
        </div>
        <div>
          <p className="uppercase text-xs font-semibold mb-2">Payé en totalité</p>
          <p>{project.has_fully_paid ? 'Oui' : 'Non'}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-between">
        <div className="w-full">
          <p className="uppercase text-xs font-semibold mb-2">Url client</p>
          <p>{project.link}</p>
        </div>
        <div className="w-full">
          <p className="uppercase text-xs font-semibold mb-2">lien GitHub</p>
          <p>{project.github_link}</p>
        </div>
        <div className="w-full">
          <p className="uppercase text-xs font-semibold mb-2">Ora</p>
          <p>{project.ora_name}</p>
        </div>
      </div>
    </div>
  );
}

export default CardProject;
