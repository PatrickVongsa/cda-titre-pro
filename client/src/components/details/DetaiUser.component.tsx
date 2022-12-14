import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux.hook';
import User from '../../assets/user.jpeg';
import { updateUser, archiveUser } from '../../redux/userSlice';

import { BsMailbox2 } from 'react-icons/bs';
import { FaArchive, FaMailBulk, FaPhone } from 'react-icons/fa';
import { Typography } from '@material-tailwind/react';

interface IProps {
  user: IUser;
}

function DetaiUser({ user }: IProps) {
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [address, setAddress] = useState(user.address);
  const [postalCode, setPostalCode] = useState(user.postal_code);
  const [city, setCity] = useState(user.city);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  const [update, setUpdate] = useState({
    firstnameUpdate: false,
    lastnameUpdate: false,
    addressUpdate: false,
    postalCodeUpdate: false,
    cityUpdate: false,
    phoneUpdate: false,
    emailUpdate: false,
  });

  const dispatch = useAppDispatch();

  useEffect(()=> {
    setFirstname(user.firstname);
      setLastname(user.lastname);
      setAddress(user.address);
      setPostalCode(user.postal_code);
      setCity(user.city);
      setPhone(user.phone);
      setEmail(user.email);
  }, [user])

  const handleSubmitKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      const data = {
        ...user,
        firstname,
        lastname,
        address,
        postal_code: postalCode,
        city,
        phone,
        email,
      };
      const updatedUser = await dispatch(updateUser(data)).unwrap();
      setFirstname(updatedUser.firstname);
      setLastname(updatedUser.lastname);
      setAddress(updatedUser.address);
      setPostalCode(updatedUser.postal_code);
      setCity(updatedUser.city);
      setPhone(updatedUser.phone);
      setEmail(updatedUser.email);
      setUpdate({
        firstnameUpdate: false,
        lastnameUpdate: false,
        addressUpdate: false,
        postalCodeUpdate: false,
        cityUpdate: false,
        phoneUpdate: false,
        emailUpdate: false,
      });
    }
    if (e.key === 'Escape') {
      setUpdate({
        firstnameUpdate: false,
        lastnameUpdate: false,
        addressUpdate: false,
        postalCodeUpdate: false,
        cityUpdate: false,
        phoneUpdate: false,
        emailUpdate: false,
      });
    }
  };

  const handleclick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await dispatch(archiveUser(user));
  };

  return (
    user && (
      <div className="p-4 pt-0 pb-8 flex gap-8 items-center relative">
        <button
          className="absolute top-2 right-2 p-2 rounded-lg border border-gray-400 hover:bg-gray-400 hover:text-white"
          title="Archiver le user"
          onClick={(e) => {
            e.stopPropagation();
            handleclick(e);
          }}
        >
          <FaArchive />
        </button>
        <div className="text-center">
          <img src={User} alt="" width={150} />
        </div>
        <div className="grow">
          <div className="flex">
            <div className="w-fit px-2">
              {!update.firstnameUpdate ? (
                <div
                  className="relative w-full rounded pr-4"
                  onClick={() => setUpdate({ ...update, firstnameUpdate: true })}
                >
                  <Typography variant="h4" className="capitalize">
                    {firstname}
                  </Typography>
                </div>
              ) : (
                <div className="relative w-full mb-3 bg-white rounded">
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="SAS entreprise"
                    autoFocus
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    onKeyUp={(e) => handleSubmitKeyDown(e)}
                  />
                </div>
              )}
            </div>
            <div className="w-fitpx-2">
              {!update.lastnameUpdate ? (
                <div
                  className="relative w-full rounded pr-4"
                  onClick={() => setUpdate({ ...update, lastnameUpdate: true })}
                >
                  <Typography variant="h4" className="capitalize">
                    {lastname}
                  </Typography>
                </div>
              ) : (
                <div className="relative w-full mb-3 bg-white rounded">
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="SAS entreprise"
                    autoFocus
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    onKeyUp={(e) => handleSubmitKeyDown(e)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap my-2">
            <div className="w-full lg:w-12/12 px-2 mt-2">
              {!update.addressUpdate ? (
                <div
                  className="relative w-full bg-white rounded pr-4"
                  onClick={() => setUpdate({ ...update, addressUpdate: true })}
                >
                  <Typography variant="paragraph" className="capitalize flex items-center gap-2">
                    <BsMailbox2 />
                    {address}
                  </Typography>
                </div>
              ) : (
                <div className="relative w-full">
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="123, rue de la place"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyUp={(e) => handleSubmitKeyDown(e)}
                    autoFocus
                  />
                </div>
              )}
            </div>
            <div className="w-fit pl-8">
              {!update.postalCodeUpdate ? (
                <div
                  className="relative w-full bg-white rounded pr-2"
                  onClick={() => setUpdate({ ...update, postalCodeUpdate: true })}
                >
                  <Typography variant="paragraph" className="capitalize">
                    {postalCode}
                  </Typography>
                </div>
              ) : (
                <div className="relative w-full">
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="31000"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    onKeyUp={(e) => handleSubmitKeyDown(e)}
                    autoFocus
                  />
                </div>
              )}
            </div>
            <div className="w-ft px-2">
              {!update.cityUpdate ? (
                <div
                  className="relative w-full bg-white rounded pr-4"
                  onClick={() => setUpdate({ ...update, cityUpdate: true })}
                >
                  <Typography variant="paragraph" className="capitalize">
                    {city}
                  </Typography>
                </div>
              ) : (
                <div className="relative w-full">
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Paris"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyUp={(e) => handleSubmitKeyDown(e)}
                    autoFocus
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-fit px-2">
              {!update.phoneUpdate ? (
                <div
                  className="relative w-full bg-white rounded pr-4"
                  onClick={() => setUpdate({ ...update, phoneUpdate: true })}
                >
                  <Typography variant="paragraph" className="capitalize flex items-center gap-2">
                    <FaPhone /> {phone}
                  </Typography>
                </div>
              ) : (
                <div className="relative w-full">
                  <input
                    type="tel"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="05xxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyUp={(e) => handleSubmitKeyDown(e)}
                    autoFocus
                  />
                </div>
              )}
            </div>
            <div className="w-fit px-2">
              {!update.emailUpdate ? (
                <div
                  className="relative w-full bg-white rounded pr-4"
                  onClick={() => setUpdate({ ...update, emailUpdate: true })}
                >
                  <Typography variant="paragraph" className=" flex items-center gap-2">
                    <FaMailBulk /> {email}
                  </Typography>
                </div>
              ) : (
                <div className="relative w-full">
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="moneamil@fournisseur.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyUp={(e) => handleSubmitKeyDown(e)}
                    autoFocus
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default DetaiUser;
