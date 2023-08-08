import React from 'react';
import { FaMailBulk, FaPhone } from 'react-icons/fa';

import User from '../../assets/user.jpeg';

interface IProps {
  user: IUser;
  displayUserID?: number | undefined;
  setDisplayUser: (user: IUser) => void;
}

function CardUser({ user, displayUserID, setDisplayUser }: IProps) {
  return (
    <div
      className={`border-2 p-4 mb-2 rounded-lg shadow-md cursor-pointer flex items-center ${
        displayUserID && user.id === displayUserID ? 'border-blue-200' : 'border-gray-400'
      }`}
      onClick={() => setDisplayUser(user)}
    >
      <div className="w-2/6 text-center">
        <img src={User} alt="" width={75} />
      </div>
      <div className="w-4/6">
        <h6 className="font-bold m-0">
          {user.firstname} {user.lastname}
        </h6>
        <p className="flex items-center gap-4 text-sm mt-2">
          <FaPhone className="min-w-[1rem]" /> {user.phone}
        </p>
        <p className="flex items-center gap-4 text-sm mb-2 break-all">
          <FaMailBulk className="min-w-[1rem]" /> {user.email}
        </p>
      </div>
    </div>
  );
}

export default CardUser;
