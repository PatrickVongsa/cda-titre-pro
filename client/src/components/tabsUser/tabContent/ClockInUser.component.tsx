import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../../hooks/redux.hook';

import * as dayjs from 'dayjs';
import 'dayjs/locale/fr';
import * as isBetween from 'dayjs/plugin/isBetween';
import { getDaysOffs } from '../../../redux/daysOffSlice';

interface IProps {
  user: IUser;
}

function ClockInUser({ user }: IProps) {
  const { daysOff } = useAppSelector((state) => state.daysOff);

  const dispatch = useAppDispatch();

  dayjs.extend(isBetween);

  const date = new Date();

  const dates = [];

  const daysOffUser = [
    ...daysOff.filter(
      (value) => dayjs(value.start_date).month() === dayjs().month() && user.id === value.user_id,
    ),
  ];

  for (let index = 0; index < dayjs(date).daysInMonth(); index++) {
    const month = dayjs(date).locale('fr').format('MM');
    const year = dayjs(date).locale('fr').format('YYYY');
    let dateToAdd = `${month} ${String(index + 1).padStart(2, '0')} ${year}`;

    if (dayjs(dateToAdd).day() !== 0 && dayjs(dateToAdd).day() !== 6) {
      dates.push(dateToAdd);
    }
  }

  useEffect(() => {
    dispatch(getDaysOffs());
  }, []);

  const handleClick = (data: { day: Date }) => {
    console.log(data.day);
  };

  return (
    <div className="max-h-[65vh]">
      <p>
        Émargement pour{' '}
        <span className="capitalize">{dayjs(date).locale('fr').format('MMMM')}</span>
      </p>
      <div className="max-h-[62vh] overflow-y-auto">
        <div className="flex flex-col gap-8 py-2 pr-4">
          {dates.map((date, i) => {
            return (
              <div
                className="grid grid-cols-[10rem_8rem_1fr_8rem] justify-items-center gap-4 pb-2 border-b border-b-gray-300"
                key={i + date.replace(' ', '-')}
              >
                <p className="capitalize self-center">
                  {dayjs(date).locale('fr').format('DD MMMM YYYY')}
                </p>
                <p className="text-xs self-center">09h00 - 12h00 13h00 - 17h30</p>
                <div>
                  {daysOffUser.map((doff, i: number) => {
                    const start = dayjs(doff.start_date).locale('fr').format('YYYY-MM-DD');
                    const end = dayjs(doff.end_date).locale('fr').format('YYYY-MM-DD');

                    return (
                      dayjs(date).isBetween(start, end, null, '[]') && (
                        <p key={i + 987654321} className="self-center">
                          Congés : {doff.days_off_status?.name}
                        </p>
                      )
                    );
                  })}
                </div>
                <button
                  className="bg-green-400 rounded-lg h-fit px-4 py-2 text-white self-center"
                  onClick={(e) => {
                    const dateClockin = dayjs(date).format('YYYY-MM-DD');
                    handleClick({
                      day: new Date(dateClockin),
                    });
                  }}
                >
                  Émarger
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ClockInUser;
