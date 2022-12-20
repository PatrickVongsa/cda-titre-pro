import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux.hook';
import User from '../../assets/user.jpeg';
import { updateProspect, archiveProspect } from '../../redux/prospectSlice';

import { BsMailbox2 } from 'react-icons/bs';
import { FaArchive, FaMailBulk, FaPhone } from 'react-icons/fa';
import { Typography } from '@material-tailwind/react';

import websiteIcon from '../../assets/socials/website.svg';
import facebookIcon from '../../assets/socials/facebook.png';
import instagramIcon from '../../assets/socials/instagram.png';
import linkedinIcon from '../../assets/socials/linkedin.svg';

interface IProps {
  customer: IProspect;
  setDisplayCustomer: (customer: IProspect | null) => void;
}

function DetailCustomer({ customer, setDisplayCustomer }: IProps) {
  const [companyName, setCompanyName] = useState(customer.company_name);
  const [address, setAddress] = useState(customer.address);
  const [postalCode, setPostalCode] = useState(customer.postal_code);
  const [city, setCity] = useState(customer.city);
  const [phone, setPhone] = useState(customer.phone);
  const [email, setEmail] = useState(customer.email);

  const [update, setUpdate] = useState({
    companyNameUpdate: false,
    addressUpdate: false,
    postalCodeUpdate: false,
    cityUpdate: false,
    phoneUpdate: false,
    emailUpdate: false,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    setCompanyName(customer.company_name);
    setAddress(customer.address);
    setPostalCode(customer.postal_code);
    setCity(customer.city);
    setPhone(customer.phone);
    setEmail(customer.email);
  }, [customer]);

  const handleSubmitKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      const data = {
        ...customer,
        company_name: companyName,
        address,
        postal_code: postalCode,
        city,
        phone,
        email,
      };
      const updatedUser = await dispatch(updateProspect(data)).unwrap();
      setCompanyName(updatedUser.company_name);
      setAddress(updatedUser.address);
      setPostalCode(updatedUser.postal_code);
      setCity(updatedUser.city);
      setPhone(updatedUser.phone);
      setEmail(updatedUser.email);
      setUpdate({
        companyNameUpdate: false,
        addressUpdate: false,
        postalCodeUpdate: false,
        cityUpdate: false,
        phoneUpdate: false,
        emailUpdate: false,
      });
    }
    if (e.key === 'Escape') {
      setUpdate({
        companyNameUpdate: false,
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
    await dispatch(archiveProspect(customer));
    setDisplayCustomer(null)
  };

  return (
    customer && (
      <div className="p-4 pt-0 pb-8 flex gap-8 items-center relative">
        <button
          className="absolute top-2 right-2 p-2 rounded-lg border border-gray-400 hover:bg-gray-400 hover:text-white"
          title="Archiver le client"
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
              {!update.companyNameUpdate ? (
                <div
                  className="relative w-full rounded pr-4"
                  onClick={() => setUpdate({ ...update, companyNameUpdate: true })}
                >
                  <Typography variant="h4" className="capitalize">
                    {companyName}
                  </Typography>
                </div>
              ) : (
                <div className="relative w-full mb-3 bg-white rounded">
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="SAS entreprise"
                    autoFocus
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
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
          <div className="flex gap-4 mt-4 px-2">
            {customer.website_url !== '' && (
              <div>
                <a
                  href={
                    customer.website_url.includes('https://')
                      ? customer.website_url
                      : 'https://' + customer.website_url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="website customer"
                >
                  <img
                    src={websiteIcon}
                    alt="icon website"
                    width={24}
                    className="transition-transform hover:scale-105"
                  />
                </a>
              </div>
            )}
            {customer.facebook_url !== '' && (
              <div>
                <a
                  href={
                    customer.facebook_url.includes('https://')
                      ? customer.facebook_url
                      : 'https://' + customer.facebook_url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="website customer"
                >
                  <img
                    src={facebookIcon}
                    alt="icon website"
                    width={24}
                    className="transition-transform hover:scale-105"
                  />
                </a>
              </div>
            )}
            {customer.instagram_url !== '' && (
              <div>
                <a
                  href={
                    customer.instagram_url.includes('https://')
                      ? customer.instagram_url
                      : 'https://' + customer.instagram_url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="website customer"
                >
                  <img
                    src={instagramIcon}
                    alt="icon website"
                    width={24}
                    className="transition-transform hover:scale-105"
                  />
                </a>
              </div>
            )}
            {customer.linkedin_url !== '' && (
              <div>
                <a
                  href={
                    customer.linkedin_url.includes('https://')
                      ? customer.linkedin_url
                      : 'https://' + customer.linkedin_url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="website customer"
                >
                  <img
                    src={linkedinIcon}
                    alt="icon website"
                    width={24}
                    className="transition-transform hover:scale-105"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default DetailCustomer;
