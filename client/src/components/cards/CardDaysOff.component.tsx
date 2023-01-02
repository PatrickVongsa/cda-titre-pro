import React from 'react';
import * as dayjs from 'dayjs';
import 'dayjs/locale/fr';

interface IProps {
  daysOff: IDaysOff;
  setDaysOff: (doff: IDaysOff | null) => void;
}

function CardDaysOff({ daysOff, setDaysOff }: IProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border-2 border-gray-400 hover:border-blue-300 hover:shadow-md rounded-xl">
      <div className="flex justify-between">
        <p>
          Du :{' '}
          <span className="font-semibold">
            {dayjs(daysOff.start_date).locale('fr').format('DD MMMM YYYY')}
          </span>
        </p>
        <p>
          Au :{' '}
          <span className="font-semibold">
            {dayjs(daysOff.end_date).locale('fr').format('DD MMMM YYYY')}
          </span>
        </p>
      </div>
      <div className="flex justify-between">
        <p>
          Status : <span className="font-semibold">{daysOff.days_off_status?.name}</span>
        </p>
        <button 
        className="bg-green-400 rounded-lg w-fit h-fit px-4 py-2 text-white"
        onClick={(e) =>setDaysOff(daysOff)}
        >
          Traiter
        </button>
      </div>
    </div>
  );
}

export default CardDaysOff;
