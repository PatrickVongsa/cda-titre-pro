import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../../hooks/redux.hook';
import { getEmergencyContacts } from '../../../redux/emergencyContactSlice';
import { getAllEmergencyUsersbByUser } from '../../../redux/emergencyUserSlice';
import CardEmergencyContact from '../../cards/CardEmergencyContact.component';
import FormAddEmergencyContact from '../../form/FormAddEmergencyContact.component';

interface IProps {
  user: IUser;
}

function EmergencyContact({ user }: IProps) {
  const { emergencyContacts } = useAppSelector((state) => state.emergencyContacts);
  const { emergencyUsers } = useAppSelector((state) => state.emergencyUsers);

  const dispatch = useAppDispatch();

  const [emergencyContactUpdate, setEmergencyContactUpdate] = useState<IEmergencyContact | null>(
    null,
  );

  useEffect(() => {
    dispatch(getEmergencyContacts());
    dispatch(getAllEmergencyUsersbByUser(user));
  }, []);

  const handlesetEmergencyContact = (contact: IEmergencyContact | null) => {
    setEmergencyContactUpdate(contact);
  };
  console.log(emergencyUsers);
  return (
    <div className="flex gap-4 pr-4">
      <div className="w-4/6 max-h-[62vh] pb-4 overflow-y-scroll">
        <div className="flex flex-col gap-2">
          {emergencyUsers.length === 0 && <p>pas contact...</p>}
          {emergencyContacts.length > 0 &&
            emergencyContacts.map((emergencyContact: IEmergencyContact, i: number) => {
              if (
                emergencyUsers.some(
                  (emergencyUser) =>
                    emergencyUser.user_id === user.id &&
                    emergencyUser.emergency_contact_id === emergencyContact.id,
                )
              ) {
                return (
                  <CardEmergencyContact
                    key={i + 987654}
                    contact={emergencyContact}
                    user={user}
                    setEmergencyContact={handlesetEmergencyContact}
                  />
                );
              }
            })}
        </div>
      </div>
      <div className="w-2/6 flex">
        <FormAddEmergencyContact
          user={user}
          contact={emergencyContactUpdate}
          setEmergencyContact={handlesetEmergencyContact}
        />
      </div>
    </div>
  );
}

export default EmergencyContact;
