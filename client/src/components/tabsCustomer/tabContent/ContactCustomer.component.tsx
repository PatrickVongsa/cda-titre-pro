import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../../hooks/redux.hook';
import {
  addContact,
  archiveContact,
  deleteContact,
  getContacts,
  updateContact,
} from '../../../redux/contactSlice';
import { FaArchive, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

interface IProps {
  customer: IProspect;
}

function ContactCustomer({ customer }: IProps) {
  const dispatch = useAppDispatch();

  const { contacts } = useAppSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  /**
   * create / update / archive / delete Contact
   */
  const [contactId, setContactId] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [occupation, setOccupation] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isPreferedContact, setIsPreferedContact] = useState(false);

  const handleContactClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const data = {
      firstname,
      lastname,
      occupation,
      phone: contactPhone,
      email: contactEmail,
      is_prefered_contact: isPreferedContact,
      prospect_id: Number(customer.id),
    };
    try {
      await dispatch(addContact(data)).unwrap();
      setFirstname('');
      setLastname('');
      setOccupation('');
      setContactPhone('');
      setContactEmail('');
      setIsPreferedContact(false);
    } catch (err) {
      console.error('Failed to save the contact: ', err);
    }
  };

  const handleUpdateContactClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const data = {
      id: Number(contactId),
      firstname,
      lastname,
      occupation,
      phone: contactPhone,
      email: contactEmail,
      is_prefered_contact: isPreferedContact,
      prospect_id: Number(customer.id),
    };
    try {
      await dispatch(updateContact(data)).unwrap();
      setContactId('');
      setFirstname('');
      setLastname('');
      setOccupation('');
      setContactPhone('');
      setContactEmail('');
      setIsPreferedContact(false);
    } catch (err) {
      console.error('Failed to update the contact: ', err);
    }
  };
  const handleArchiveContactClick = async (e: React.MouseEvent, data: IContact) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await dispatch(archiveContact(data)).unwrap();
    } catch (err) {
      console.error('Failed to update the contact: ', err);
    }
  };

  const handleDeleteeContactClick = async (e: React.MouseEvent, data: IContact) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await dispatch(deleteContact(data)).unwrap();
    } catch (err) {
      console.error('Failed to update the contact: ', err);
    }
  };

  return (
    <div className='flex gap-4'>
      <div className="w-4/6 flex flex-wrap">
        <div className="w-full lg:w-12/12">
          {contacts &&
            contacts.map((contact, i: number) => {
              if (contact.prospect_id === customer.id && !contact.is_archived) {
                return (
                  <div
                    className={`group/contact relative w-full mb-2 bg-white rounded px-4 py-2 flex flex-wrap shadow-sm border-2 ${
                      contact.is_prefered_contact && 'border-blue-500'
                    } hover:border-blue-300`}
                    key={i + contact.firstname}
                  >
                    <div className="hidden group-hover/contact:flex absolute top-4 right-4 gap-2 justify-center items-center">
                      <button
                        className="group/modify border border-gray-400 hover:border-black p-1 rounded-lg"
                        title="Modifier contact"
                        onClick={(e) => {
                          setContactId(contact.id);
                          setFirstname(contact.firstname);
                          setLastname(contact.lastname);
                          setOccupation(contact.occupation);
                          setContactPhone(contact.phone);
                          setContactEmail(contactEmail);
                          setIsPreferedContact(contact.is_prefered_contact);
                        }}
                      >
                        <FaPencilAlt className="text-gray-500 group-hover/modify:text-black" />
                      </button>

                      <button
                        className="group/archive border border-gray-400 hover:border-black p-1 rounded-lg"
                        title="Archiver contact"
                        onClick={(e) => {
                          handleArchiveContactClick(e, contact);
                        }}
                      >
                        <FaArchive className="text-gray-500 group-hover/archive:text-black" />
                      </button>

                      <button
                        className="group/delete border border-gray-400 hover:border-red-500 hover:bg-red-500 p-1 rounded-lg"
                        title="Supprimer contact"
                        onClick={(e) => {
                          handleDeleteeContactClick(e, contact);
                        }}
                      >
                        <FaTrashAlt className="text-gray-500 group-hover/delete:text-white" />
                      </button>
                    </div>
                    <p className="w-3/6">
                      {contact.firstname} {contact.lastname}
                    </p>
                    <p className="w-3/6">{contact.occupation}</p>
                    <p className="w-3/6">{contact.phone}</p>
                    <p className="w-3/6">{contact.email}</p>
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div className="w-2/6 border border-gray-400 rounded-lg p-2">
        <form>
          {contactId !== "" ? (
            <p className="font-semibold mb-4 text-blue-gray-700">Modifier contact</p>
          ) : (
            <p className="font-semibold mb-4 text-blue-gray-700">Ajouter contact</p>
          )}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-2">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Prénom
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Jean"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full lg:w-12/12 px-2">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  NOM
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Valjean"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full lg:w-12/12 px-2">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Poste occupé
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Directeur communication"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full lg:w-12/12 px-2">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Téléphone
                </label>
                <input
                  type="tel"
                  className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="06xxxxxxxx"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full lg:w-12/12 px-2">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="moneamil@fournisseur.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full lg:w-12/12 px-2">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Contact prioritaire
                </label>
                <input
                  type="checkbox"
                  className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="France"
                  max={14}
                  checked={isPreferedContact}
                  onChange={(e) => setIsPreferedContact(e.target.checked)}
                />
              </div>
            </div>

            <div className="w-full lg:w-12/12 px-2">
              <div className="relative w-full mb-3 flex justify-center gap-2">
                <button
                  className="bg-green-400 rounded-lg h-fit px-4 py-2 text-white"
                  onClick={(e) => {
                    if (contactId !== '') {
                      handleUpdateContactClick(e);
                    } else {
                      handleContactClick(e);
                    }
                  }}
                >
                  Enregistrer
                </button>
                {contactId !== '' && (
                  <button
                    className="bg-red-500 rounded-lg h-fit px-4 py-2 text-white"
                    onClick={() => {
                      setContactId('');
                      setFirstname('');
                      setLastname('');
                      setOccupation('');
                      setContactPhone('');
                      setContactEmail('');
                      setIsPreferedContact(false);
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

export default ContactCustomer;
