import { Typography } from '@material-tailwind/react';

import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { deleteOneEmergencyUser } from '../../redux/emergencyUserSlice';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { deleteEmergencyContact } from '../../redux/emergencyContactSlice';

interface IProps {
  contact: IEmergencyContact;
  user: IUser;
  setEmergencyContact: (contact: IEmergencyContact) => void;
}

function CardEmergencyContact({ contact, user, setEmergencyContact }: IProps) {
  const dispatch = useAppDispatch();

  const handleDeleteClick = async () => {
    await dispatch(deleteOneEmergencyUser({ contact, user }));
    await dispatch(deleteEmergencyContact(contact));
  };

  return (
    <div className="flex justify-between items-center border-2 rounded-xl border-gray-300 py-2 px-4 hover:border-blue-300 hover:shadow-md">
      <div>
        <Typography variant="lead" className="font-semibold">
          {contact.firstname} {contact.firstname}
        </Typography>
        <p>{contact.who_is}</p>
        <p>{contact.phone}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="group/modify block border border-gray-400 hover:border-black p-2 rounded-lg"
          title="Modifier le contact"
          onClick={(e) => {
            setEmergencyContact(contact);
          }}
        >
          <FaPencilAlt className="text-gray-500 group-hover/modify:text-black" />
        </button>
        <button
          className="block p-2 rounded-lg border border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
          title="Supprimer le contact"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteClick();
          }}
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}

export default CardEmergencyContact;
