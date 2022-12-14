import { Typography } from '@material-tailwind/react';
import { FaArchive, FaMailBulk, FaPhone, FaTrashAlt } from 'react-icons/fa';
import useModal from '../../hooks/useModal';
import ModalProspect from '../modal/ModalProspect.component';
import { useAppDispatch } from '../../hooks/redux.hook';
import { archiveProspect, deleteProspect } from '../../redux/prospectSlice';

interface IProps {
  prospect: IProspect;
  color: string;
  seeArchive: boolean;
}

function ProspectLine({ color, prospect, seeArchive }: IProps) {
  const { isShowing, toggle } = useModal();
  const dispatch = useAppDispatch();

  const handleArchiveClick = async (prospect: IProspect) => {
    await dispatch(archiveProspect(prospect));
  };
  const handleDeleteClick = async (prospect: IProspect) => {
    await dispatch(deleteProspect(prospect));
  };

  return (
    <>
      {isShowing && <ModalProspect prospect={prospect} closeModal={toggle} />}
      <tr
        onClick={() => toggle()}
        className="hover:bg-gray-200 w-full p-4 cursor-pointer group/card relative"
      >
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
          <img src={''} className="h-12 w-12 bg-white rounded-full border" alt="..."></img>{' '}
          <span
            className={
              'ml-3 font-bold ' + +(color === 'light' ? 'text-blue-gray-600' : 'text-white')
            }
          >
            {prospect.company_name}
          </span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <p className="flex items-center gap-2 mb-2">
            <FaPhone /> {prospect.phone}
          </p>
          <p className="flex items-center gap-2">
            <FaMailBulk /> {prospect.email}
          </p>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {prospect.assigned_to_id && (
            <div className="flex items-center">
              <img
                src={''}
                alt="..."
                className="w-10 h-10 rounded-full border-2 border-blue-gray-50 shadow"
              ></img>
              <Typography variant="small" className="ml-4 font-bold font-small">
                {prospect.assigned_to?.firstname} {prospect.assigned_to?.lastname}
              </Typography>
            </div>
          )}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex items-center">
            <span className="mr-2">60%</span>
            <div className="relative w-full">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                <div
                  style={{ width: '60%' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                ></div>
              </div>
            </div>
          </div>
        </td>
        <td>
          {!seeArchive && (
            <button
              className="absolute top-[50%] -translate-y-2/4 right-8 z-10 p-2 rounded-lg border border-gray-400 invisible hover:bg-gray-400 hover:text-white group-hover/card:visible"
              title="Archiver le prospect"
              onClick={(e) => {
                e.stopPropagation();
                handleArchiveClick(prospect);
              }}
            >
              <FaArchive />
            </button>
          )}
          {seeArchive && (
            <div className="flex gap-2">
              <button
                className="block absolute top-[50%] -translate-y-2/4 right-8 z-10 p-2 rounded-lg border border-red-400 text-red-400 invisible hover:bg-red-400 hover:text-white group-hover/card:visible"
                title="Supprimer le prospect"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(prospect);
                }}
              >
                <FaTrashAlt />
              </button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
}

export default ProspectLine;
