import React from 'react';
import { FaMailBulk, FaPhone } from 'react-icons/fa';

import User from '../../assets/user.jpeg';

interface IProps {
  customer: IProspect;
  displayClientID?: number | undefined;
  setDisplayCustomer: (customer: IProspect) => void;
}

function CardCustomer({ customer, displayClientID, setDisplayCustomer }: IProps) {
  return (
    <div
      className={`border-2 p-4 mb-2 rounded-lg shadow-md cursor-pointer flex items-center ${
        displayClientID && customer.id === displayClientID ? 'border-blue-200' : 'border-gray-400'
      }`}
      onClick={() => setDisplayCustomer(customer)}
    >
      <div className="w-2/6 text-center">
        <img src={User} alt="" width={75} />
      </div>
      <div className="w-4/6">
        <h6 className="font-bold m-0">
          {customer.company_name}
        </h6>
        <p className="flex items-center gap-4 text-sm mt-2">
          <FaPhone /> {customer.phone}
        </p>
        <p className="flex items-center gap-4 text-sm mb-2">
          <FaMailBulk /> {customer.email}
        </p>
      </div>
    </div>
  );
}

export default CardCustomer;
