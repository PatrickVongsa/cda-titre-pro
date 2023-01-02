import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';

import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { addDaysOff, updateDaysOff } from '../../redux/daysOffSlice';

interface IProps {
  user: IUser;
  daysOff: IDaysOff | null;
  setDaysOff: (doff: IDaysOff | null) => void;
}

function FormDaysOff({ user, daysOff, setDaysOff }: IProps) {
  const { daysOffStatus } = useAppSelector((state) => state.daysOffStatus);

  const dispatch = useAppDispatch();

  const [startDate, setStartDate] = useState<Date | string>('');
  const [endDate, setEndDate] = useState<Date | string>('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (daysOff) {
      setStartDate(daysOff?.start_date);
      setEndDate(daysOff?.end_date);
      setStatus(daysOff.days_off_status_id);
    }
  }, [daysOff]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(
        addDaysOff({
          start_date: new Date(startDate),
          end_date: new Date(endDate),
          days_off_status_id: status,
          user_id: user.id,
        }),
      ).unwrap();
      setStartDate('');
      setEndDate('');
      setStatus('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(
        updateDaysOff({
          id: daysOff?.id,
          start_date: new Date(startDate),
          end_date: new Date(endDate),
          days_off_status_id: status,
          user_id: user.id,
        }),
      ).unwrap();
      setStartDate('');
      setEndDate('');
      setStatus('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="w-full h-fit border border-gray-400 rounded-lg p-2">
        <form>
          <p className="font-semibold mb-4 text-blue-gray-700">
            {!daysOff ? 'Demande' : 'Modifier ma demande'} de congés
          </p>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-2">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Date de début
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
            <div className="w-full lg:w-12/12 px-2">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Date de fin (inclus)
                </label>
                <input
                  type="date"
                  className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder=""
                  value={dayjs(endDate).format('YYYY-MM-DD')}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full lg:w-12/12 px-2">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blue-gray-600 text-xs font-bold mb-2">
                  Statut:
                </label>
                <select
                  className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">-- Choisir --</option>
                  {daysOffStatus.length &&
                    daysOffStatus.map((doff: IDaysOffStatus, i: number) => {
                      return (
                        <option value={doff.id} key={i + doff.name}>
                          {doff.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="w-full lg:w-12/12 px-2">
              <div className="relative w-full mb-3 flex justify-center gap-2">
                <button
                  className="bg-green-400 rounded-lg h-fit px-4 py-2 text-white"
                  onClick={(e) => {
                    if (!daysOff) {
                      handleSubmit(e);
                    } else {
                      handleUpdateSubmit(e);
                    }
                  }}
                >
                  {!daysOff ? 'Ajouter' : 'Enregistrer'}
                </button>
                {daysOff && (
                  <button
                    className="bg-red-500 rounded-lg h-fit px-4 py-2 text-white"
                    onClick={() => {
                      setStartDate('');
                      setEndDate('');
                      setStatus('');
                      setDaysOff(null);
                    }}
                  >
                    Annuler
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormDaysOff;
