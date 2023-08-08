import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../../hooks/redux.hook';

import FormDaysOff from '../../form/FormDaysOff.component';
import { getDaysOffs } from '../../../redux/daysOffSlice';
import { getDaysOffStatus } from '../../../redux/daysOffStatusSlice';
import CardDaysOff from '../../cards/CardDaysOff.component';

interface IProps {
  user: IUser;
}

function DayOffUser({ user }: IProps) {
  const { daysOffStatus } = useAppSelector((state) => state.daysOffStatus);
  const { daysOff } = useAppSelector((state) => state.daysOff);

  const dispatch = useAppDispatch();

  const [daysOffUpdate, setDaysOffUpdate] = useState<IDaysOff | null>(null);

  useEffect(() => {
    dispatch(getDaysOffs());
    dispatch(getDaysOffStatus());
  }, []);

  const handlesetDaysOffUpdate = (doff: IDaysOff | null) => {
    setDaysOffUpdate(doff);
  };

  return (
    <div className="flex">
      <div className="w-2/4">
        <p className="font-semibold mb-2">Demande faites</p>
        <div className="overflow-auto">
          <div className="flex flex-col gap-2 pr-4">
            {daysOff.length === 0 && <p>pas de demande faites</p>}
            {daysOff.length > 0 &&
              daysOff.map((doff, i: number) => {
                if (user.id === doff.user_id) {
                  return <CardDaysOff key={i + 32155555566} daysOff={doff} setDaysOff={handlesetDaysOffUpdate} />;
                }
              })}
          </div>
        </div>
      </div>
      <div className="w-2/4">
        <FormDaysOff user={user} daysOff={daysOffUpdate} setDaysOff={handlesetDaysOffUpdate} />
      </div>
    </div>
  );
}

export default DayOffUser;
