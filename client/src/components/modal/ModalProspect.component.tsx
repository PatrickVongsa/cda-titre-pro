import React, { useState, useEffect } from 'react';
import { Typography } from '@material-tailwind/react';

import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { archiveProspect, updateProspect } from '../../redux/prospectSlice';
import { addContact, updateContact, archiveContact, deleteContact } from '../../redux/contactSlice';
import { addInteraction } from '../../redux/interactionSlice';
import { getSources } from '../../redux/sourceSlice';
import { getActivities } from '../../redux/activitySlice';
import { getInteractions } from '../../redux/interactionSlice';
import { getContacts } from '../../redux/contactSlice';

import ChatInteraction from '../chat/ChatInteraction.component';

import { GrClose } from 'react-icons/gr';
import { getUsers } from '../../redux/userSlice';
import { FaArchive, FaCheck, FaTrashAlt } from 'react-icons/fa';
import { IoMdClose, IoMdSend } from 'react-icons/io';
import { BiMessageDetail } from 'react-icons/bi';
import { RiContactsBookLine, RiContactsLine } from 'react-icons/ri';
import { FaPencilAlt } from 'react-icons/fa';

interface IProps {
  prospect: IProspect;
  closeModal: () => void;
}

function ModalProspect({ prospect, closeModal }: IProps) {
  const { status, loading: loadingStatus } = useAppSelector((state) => state.prospectStatus);
  const { sources } = useAppSelector((state) => state.sources);
  const { activities } = useAppSelector((state) => state.activities);
  const { users } = useAppSelector((state) => state.users);
  const { interactions } = useAppSelector((state) => state.interactions);
  const { contacts } = useAppSelector((state) => state.contacts);

  const [showInteractions, setShowInteractions] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

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
      prospect_id: Number(prospect.id),
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
      prospect_id: Number(prospect.id),
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

  /**
   * Create interactions
   */
  const [report, setReport] = useState('');

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const data = {
      report: report,
      reported_by_id: 1, //+++ get user id from token
      reported_at: new Date(),
      prospect_id: Number(prospect.id),
    };
    try {
      await dispatch(addInteraction(data)).unwrap();
      setReport('');
    } catch (err) {
      console.error('Failed to save the interaction: ', err);
    }
  };

  /**
   * Update prospect
   */
  const [update, setUpdate] = useState({
    companyNameUpdate: false,
    addressUpdate: false,
    postalCodeUpdate: false,
    cityUpdate: false,
    countryUpdate: false,
    phoneUpdate: false,
    emailUpdate: false,
    companyLogoUpdate: false,
    websiteUrlUpdate: false,
    facebookUrlUpdate: false,
    instagramUrlUpdate: false,
    linkedInUrlUpdate: false,
    estimateBudgetUpdate: false,
    needDescriptionUpdate: false,
    hasWebsiteUpdate: false,
    websiteYearUpdate: false,
    otherNeedUpdate: false,
    siretNumberUpdate: false,
    statusProspectUpdate: false,
    sourceUpdate: false,
    activityUpdate: false,
    assignedToId: false,
  });

  const dispatch = useAppDispatch();

  const [companyName, setCompanyName] = useState(prospect.company_name || '');
  const [address, setAddress] = useState(prospect.address || '');
  const [postalCode, setPostalCode] = useState(prospect.postal_code || '');
  const [city, setCity] = useState(prospect.city || '');
  const [country, setCountry] = useState(prospect.country || '');
  const [phone, setPhone] = useState(prospect.phone || '');
  const [email, setEmail] = useState(prospect.email || '');
  const [companyLogo, setCompanyLogo] = useState(prospect.company_logo || '');
  const [websiteUrl, setWebsiteUrl] = useState(prospect.website_url || '');
  const [facebookUrl, setFacebookUrl] = useState(prospect.facebook_url || '');
  const [instagramUrl, setInstagramUrl] = useState(prospect.instagram_url || '');
  const [linkedInUrl, setLinkedInUrl] = useState(prospect.linkedin_url || '');
  const [estimateBudget, setEstimateBudget] = useState(prospect.estimate_budget || '');
  const [needDescription, setNeedDescription] = useState(prospect.need_description || '');
  const [hasWebsite, setHasWebsite] = useState(prospect.has_website || false);
  const [websiteYear, setWebsiteYear] = useState(prospect.website_year || '');
  const [otherNeed, setOtherNeed] = useState(prospect.other_need || '');
  const [siretNumber, setSiretNumber] = useState(prospect.siret_number || '');
  const [statusProspect, setStatusProspect] = useState(prospect.prospect_status_id || '');
  const [source, setSource] = useState(prospect.source_id || '');
  const [activity, setActivity] = useState(prospect.activity_id || '');
  const [assignedToId, setAssignedToId] = useState(prospect.assigned_to_id || '');

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getSources());
    dispatch(getActivities());
    dispatch(getInteractions());
    dispatch(getContacts());
  }, []);

  const resetUpdate = () => {
    setUpdate({
      companyNameUpdate: false,
      addressUpdate: false,
      postalCodeUpdate: false,
      cityUpdate: false,
      countryUpdate: false,
      phoneUpdate: false,
      emailUpdate: false,
      companyLogoUpdate: false,
      websiteUrlUpdate: false,
      facebookUrlUpdate: false,
      instagramUrlUpdate: false,
      linkedInUrlUpdate: false,
      estimateBudgetUpdate: false,
      needDescriptionUpdate: false,
      hasWebsiteUpdate: false,
      websiteYearUpdate: false,
      otherNeedUpdate: false,
      siretNumberUpdate: false,
      statusProspectUpdate: false,
      sourceUpdate: false,
      activityUpdate: false,
      assignedToId: false,
    });
  };

  const updateProspectFunction = async () => {
    let data: IProspect = {
      id: prospect.id,
      company_name: companyName,
      address,
      postal_code: postalCode,
      city,
      country,
      phone,
      email,
      company_logo: companyLogo,
      website_url: websiteUrl,
      facebook_url: facebookUrl,
      instagram_url: instagramUrl,
      linkedin_url: linkedInUrl,
      contacted_at: new Date(),
      estimate_budget: Number(estimateBudget),
      need_description: needDescription,
      has_website: hasWebsite,
      website_year: Number(websiteYear),
      other_need: otherNeed,
      is_client: false,
      siret_number: siretNumber,
      prospect_status_id: Number(statusProspect),
      source_id: Number(source),
      activity_id: Number(activity),
    };

    if (assignedToId !== '') {
      data.assigned_to_id = Number(assignedToId);
    }

    try {
      const updatedProspect = await dispatch(updateProspect(data)).unwrap();
      setCompanyName(updatedProspect.company_name || '');
      setAddress(updatedProspect.address || '');
      setPostalCode(updatedProspect.postal_code || '');
      setCity(updatedProspect.city || '');
      setCountry(updatedProspect.country || '');
      setPhone(updatedProspect.phone || '');
      setEmail(updatedProspect.email || '');
      setCompanyLogo(updatedProspect.company_logo || '');
      setWebsiteUrl(updatedProspect.website_url || '');
      setFacebookUrl(updatedProspect.facebook_url || '');
      setInstagramUrl(updatedProspect.instagram_url || '');
      setLinkedInUrl(updatedProspect.linkedin_url || '');
      setEstimateBudget(updatedProspect.estimate_budget || '');
      setNeedDescription(updatedProspect.need_description || '');
      setHasWebsite(updatedProspect.has_website || false);
      setWebsiteYear(updatedProspect.website_year || '');
      setOtherNeed(updatedProspect.other_need || '');
      setSiretNumber(updatedProspect.siret_number || '');
      setStatusProspect(updatedProspect.prospect_status_id || '');
      setSource(updatedProspect.source_id || '');
      setActivity(updatedProspect.activity_id || '');
      setAssignedToId(updatedProspect.assigned_to_id || '');

      resetUpdate();
    } catch (err) {
      console.error('Failed to save the post: ', err);
    }
  };

  const handleSubmitKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      updateProspectFunction();
    }
    if (e.key === 'Escape') {
      resetUpdate();
    }
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    updateProspectFunction();
  };

  const handleArchiveClick = async (prospect: IProspect) => {
    await dispatch(archiveProspect(prospect));
  };

  console.log(contacts);

  return (
    <div
      className="absolute flex justify-center items-center inset-0 bg-black bg-opacity-50 z-50"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
      }}
    >
      <div
        className="group/cardhead relative flex flex-col min-w-0 break-words w-[50%] h-[75%] mb-6 shadow-lg rounded-lg bg-gray-100 border-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-t bg-gray-300 mb-0 px-6 py-6">
          <div className="flex justify-between">
            <div className="w-full lg:w-8/12 px-2">
              {!update.companyNameUpdate ? (
                <div
                  className="relative w-full rounded pr-4"
                  onClick={() => setUpdate({ ...update, companyNameUpdate: true })}
                >
                  <Typography variant="h4" className="capitalize">
                    {prospect.company_name}
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

            <div className="flex gap-4">
              <button
                className="block text-gray-700 border border-current rounded-lg p-2 hover:bg-gray-700 hover:text-white hover:border-gray-700"
                title="Voir les détails"
              >
                <RiContactsLine
                  className=" text-2xl font-bold uppercase rounded outline-none focus:outline-none  ease-linear transition-all duration-150 cursor-pointer"
                  onClick={() => {
                    setShowInteractions(false);
                    setShowContacts(false);
                  }}
                />
              </button>
              <button
                className="block text-gray-700 border border-current rounded-lg p-2 hover:bg-gray-700 hover:text-white hover:border-gray-700"
                title="Voir les contacts"
              >
                <RiContactsBookLine
                  className=" text-2xl font-bold uppercase rounded outline-none focus:outline-none  ease-linear transition-all duration-150 cursor-pointer"
                  onClick={() => {
                    setShowInteractions(false);
                    setShowContacts(!showContacts);
                  }}
                />
              </button>
              <button
                className="block text-gray-700 border border-current rounded-lg p-2 hover:bg-gray-700 hover:text-white hover:border-gray-700"
                title="Voir les intéractions"
              >
                <BiMessageDetail
                  className=" text-2xl font-bold uppercase rounded outline-none focus:outline-none  ease-linear transition-all duration-150 cursor-pointer"
                  onClick={() => {
                    setShowInteractions(!showInteractions);
                    setShowContacts(false);
                  }}
                />
              </button>
            </div>

            <div>
              <GrClose
                className="text-black font-bold uppercase text-xl rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  closeModal();
                }}
              />
            </div>
          </div>
        </div>
        {!showInteractions && !showContacts && (
          <div className="grow px-4 lg:px-10 py-10 pt-0 overflow-auto">
            <Typography
              variant="small"
              className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase"
            >
              Informations
            </Typography>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12 px-2">
                <div className="relative w-full">
                  <fieldset className="border border-gray-300 rounded-md p-2">
                    <legend className="block uppercase text-blue-gray-600 text-xs font-bold mb-2 px-2">
                      Statut:
                    </legend>
                    <select
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={statusProspect}
                      onChange={(e) => setStatusProspect(e.target.value)}
                      onClick={() => setUpdate({ ...update, statusProspectUpdate: true })}
                    >
                      <option value="">-- Choisir --</option>
                      {!loadingStatus &&
                        status.map((prsptstatus: IProspectStatus, i: number) => {
                          return (
                            <option value={prsptstatus.id} key={i + prsptstatus.name}>
                              {prsptstatus.name}
                            </option>
                          );
                        })}
                    </select>
                    {update.statusProspectUpdate && (
                      <div className="text-end">
                        <button
                          className="bg-green-500 rounded-lg p-2 mt-2"
                          onClick={(e) => handleSubmit(e)}
                        >
                          <FaCheck className="text-white" />
                        </button>

                        <button
                          className="bg-red-500 rounded-lg p-2 mt-2 ml-4"
                          onClick={() => resetUpdate()}
                        >
                          <IoMdClose className="text-white font-bold" />
                        </button>
                      </div>
                    )}
                  </fieldset>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-2">
                <div className="relative w-full">
                  <fieldset className="border border-gray-300 rounded-md p-2">
                    <legend className="block uppercase text-blue-gray-600 text-xs font-bold mb-2 px-2">
                      Provenance:
                    </legend>
                    <select
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      onClick={() => setUpdate({ ...update, sourceUpdate: true })}
                    >
                      <option value="">-- Choisir --</option>
                      {sources.length &&
                        sources.map((src: ISource, i: number) => {
                          return (
                            <option value={src.id} key={i + src.name}>
                              {src.name}
                            </option>
                          );
                        })}
                    </select>
                    {update.sourceUpdate && (
                      <div className="text-end">
                        <button
                          className="bg-green-500 rounded-lg p-2 mt-2"
                          onClick={(e) => handleSubmit(e)}
                        >
                          <FaCheck className="text-white" />
                        </button>

                        <button
                          className="bg-red-500 rounded-lg p-2 mt-2 ml-4"
                          onClick={() => resetUpdate()}
                        >
                          <IoMdClose className="text-white font-bold" />
                        </button>
                      </div>
                    )}
                  </fieldset>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-2">
                <div className="relative w-full">
                  <fieldset className="border border-gray-300 rounded-md p-2">
                    <legend className="block uppercase text-blue-gray-600 text-xs font-bold mb-2 px-2">
                      Secteur d'activité:
                    </legend>
                    <select
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      onClick={() => setUpdate({ ...update, activityUpdate: true })}
                    >
                      <option value="">-- Choisir --</option>
                      {activities.length &&
                        activities.map((activity: IActivity, i: number) => {
                          return (
                            <option value={activity.id} key={i + activity.name}>
                              {activity.name}
                            </option>
                          );
                        })}
                    </select>
                    {update.activityUpdate && (
                      <div className="text-end">
                        <button
                          className="bg-green-500 rounded-lg p-2 mt-2"
                          onClick={(e) => handleSubmit(e)}
                        >
                          <FaCheck className="text-white" />
                        </button>

                        <button
                          className="bg-red-500 rounded-lg p-2 mt-2 ml-4"
                          onClick={() => resetUpdate()}
                        >
                          <IoMdClose className="text-white font-bold" />
                        </button>
                      </div>
                    )}
                  </fieldset>
                </div>
              </div>
            </div>

            <hr className="my-4 border-b-1 border-blue-gray-300" />
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-2">
                <Typography
                  variant="small"
                  className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                >
                  Adresse
                </Typography>
                {!update.addressUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, addressUpdate: true })}
                  >
                    <Typography variant="paragraph" className="capitalize">
                      {prospect.address}
                    </Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
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
              <div className="w-full lg:w-4/12 px-2">
                {!update.postalCodeUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, postalCodeUpdate: true })}
                  >
                    <Typography variant="paragraph" className="capitalize">
                      {prospect.postal_code}
                    </Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
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
              <div className="w-full lg:w-4/12 px-2">
                {!update.cityUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, cityUpdate: true })}
                  >
                    <Typography variant="paragraph" className="capitalize">
                      {prospect.city}
                    </Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
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

              <div className="w-full lg:w-4/12 px-2">
                {!update.countryUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, countryUpdate: true })}
                  >
                    <Typography variant="paragraph" className="capitalize">
                      {prospect.country}
                    </Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="France"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      onKeyUp={(e) => handleSubmitKeyDown(e)}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <Typography
                variant="small"
                className="w-full block uppercase text-blue-gray-600 text-xs font-bold mb-2 px-2"
              >
                Contact
              </Typography>
              <div className="w-full lg:w-6/12 px-2">
                {!update.phoneUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, phoneUpdate: true })}
                  >
                    <Typography variant="paragraph" className="capitalize">
                      {prospect.phone}
                    </Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
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
              <div className="w-full lg:w-6/12 px-2">
                {!update.emailUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, emailUpdate: true })}
                  >
                    <Typography variant="paragraph">{prospect.email}</Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
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

              <div className="w-full lg:w-12/12 px-2">
                <Typography
                  variant="small"
                  className="w-full block uppercase text-blue-gray-600 text-xs font-bold mb-2 px-2"
                >
                  Numéro de SIRET
                </Typography>
                {!update.siretNumberUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, siretNumberUpdate: true })}
                  >
                    <Typography variant="paragraph">{prospect.siret_number}</Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="France"
                      max={14}
                      value={siretNumber}
                      onChange={(e) => setSiretNumber(e.target.value)}
                      onKeyUp={(e) => handleSubmitKeyDown(e)}
                      autoFocus
                    />
                  </div>
                )}
              </div>
              <div className="w-full lg:w-12/12 px-2">
                {!update.companyLogoUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, companyLogoUpdate: true })}
                  >
                    <Typography variant="paragraph">{prospect.company_logo}</Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="logo.[png, jpg, jpeg]"
                      value={companyLogo}
                      onChange={(e) => setCompanyLogo(e.target.value)}
                      onKeyUp={(e) => handleSubmitKeyDown(e)}
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </div>

            <hr className="my-4 border-b-1 border-blue-gray-300" />

            <h6 className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Besoin</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-2">
                {!update.needDescriptionUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, needDescriptionUpdate: true })}
                  >
                    <Typography variant="paragraph">{prospect.need_description}</Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
                    <textarea
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      cols={30}
                      rows={5}
                      value={needDescription}
                      onChange={(e) => setNeedDescription(e.target.value)}
                      onKeyUp={(e) => handleSubmitKeyDown(e)}
                      autoFocus
                    ></textarea>
                  </div>
                )}
              </div>
              <div className="w-full lg:w-4/12 px-2">
                {!update.hasWebsiteUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, hasWebsiteUpdate: true })}
                  >
                    <Typography variant="paragraph">
                      {prospect.has_website ? 'A un site web' : 'Pas de site web'}
                    </Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
                    <input
                      type="checkbox"
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      // value={`${hasWebsite}`}
                      // onChange={(e) => setHasWebsite(e.target.checked)}
                    />
                  </div>
                )}
              </div>
              <div className="w-full lg:w-4/12 px-2">
                {!update.websiteYearUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, websiteYearUpdate: true })}
                  >
                    <Typography variant="paragraph">{prospect.website_year}</Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="2000"
                      value={websiteYear}
                      onChange={(e) => setWebsiteYear(e.target.value)}
                      onKeyUp={(e) => handleSubmitKeyDown(e)}
                      autoFocus
                    />
                  </div>
                )}
              </div>
              <div className="w-full lg:w-4/12 px-2">
                {!update.estimateBudgetUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, estimateBudgetUpdate: true })}
                  >
                    <Typography variant="paragraph">{prospect.estimate_budget}</Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="1500"
                      value={estimateBudget}
                      onChange={(e) => setEstimateBudget(e.target.value)}
                      onKeyUp={(e) => handleSubmitKeyDown(e)}
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </div>

            <hr className="my-4 border-b-1 border-blue-gray-300" />

            <h6 className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Liens utiles
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-2">
                {!update.websiteUrlUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, websiteUrlUpdate: true })}
                  >
                    <Typography variant="paragraph">{prospect.website_url}</Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="https://lien.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      onKeyUp={(e) => handleSubmitKeyDown(e)}
                      autoFocus
                    />
                  </div>
                )}
              </div>
              <div className="w-full lg:w-12/12 px-2">
                {!update.facebookUrlUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, facebookUrlUpdate: true })}
                  >
                    <Typography variant="paragraph">{prospect.facebook_url}</Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="https://www.facebook.com/name"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      onKeyUp={(e) => handleSubmitKeyDown(e)}
                      autoFocus
                    />
                  </div>
                )}
              </div>
              <div className="w-full lg:w-12/12 px-2">
                {!update.instagramUrlUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, instagramUrlUpdate: true })}
                  >
                    <Typography variant="paragraph">{prospect.instagram_url}</Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="https://www.instagram.com/name"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      onKeyUp={(e) => handleSubmitKeyDown(e)}
                      autoFocus
                    />
                  </div>
                )}
              </div>
              <div className="w-full lg:w-12/12 px-2">
                {!update.linkedInUrlUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, linkedInUrlUpdate: true })}
                  >
                    <Typography variant="paragraph">{prospect.linkedin_url}</Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="https://www.linkedin.com/name"
                      value={linkedInUrl}
                      onChange={(e) => setLinkedInUrl(e.target.value)}
                      onKeyUp={(e) => handleSubmitKeyDown(e)}
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </div>

            <hr className="my-4 border-b-1 border-blue-gray-300" />

            <h6 className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Autre Besoin
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-2">
                {!update.otherNeedUpdate ? (
                  <div
                    className="relative w-full mb-3 bg-white rounded px-4"
                    onClick={() => setUpdate({ ...update, otherNeedUpdate: true })}
                  >
                    <Typography variant="paragraph">{prospect.other_need}</Typography>
                  </div>
                ) : (
                  <div className="relative w-full mb-3">
                    <textarea
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      cols={30}
                      rows={5}
                      value={otherNeed}
                      onChange={(e) => setOtherNeed(e.target.value)}
                      onKeyUp={(e) => handleSubmitKeyDown(e)}
                      autoFocus
                    ></textarea>
                  </div>
                )}
              </div>
            </div>

            <hr className="my-4 border-b-1 border-blue-gray-300" />

            <h6 className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Assigner le prospect
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-2 mb-4">
                <div className="relative w-full">
                  <fieldset className="border border-gray-300 rounded-md p-2">
                    <legend className="block uppercase text-blue-gray-600 text-xs font-bold mb-2 px-2">
                      Assigné à:
                    </legend>
                    <select
                      className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={assignedToId}
                      onChange={(e) => setAssignedToId(e.target.value)}
                      onClick={() => setUpdate({ ...update, assignedToId: true })}
                    >
                      <option value="">-- Choisir --</option>
                      {users.length &&
                        users.map((user: IUser, i: number) => {
                          return (
                            <option value={user.id} key={i + user.firstname}>
                              {user.firstname} {user.lastname}
                            </option>
                          );
                        })}
                    </select>
                    {update.assignedToId && (
                      <div className="text-end">
                        <button
                          className="bg-green-500 rounded-lg p-2 mt-2"
                          onClick={(e) => handleSubmit(e)}
                        >
                          <FaCheck className="text-white" />
                        </button>

                        <button
                          className="bg-red-500 rounded-lg p-2 mt-2 ml-4"
                          onClick={() => resetUpdate()}
                        >
                          <IoMdClose className="text-white font-bold" />
                        </button>
                      </div>
                    )}
                  </fieldset>
                </div>
              </div>
            </div>
            {prospect.is_archived && (
              <>
                <hr className="my-4 border-b-1 border-blue-gray-300" />

                <h6 className="text-blue-gray-400 text-sm mt-3 mb-2 font-bold uppercase">
                  Restaurer le prospect
                </h6>

                <div className="flex justify-center">
                  <button
                    className="bg-green-500 rounded-lg p-2 px-4 mt-2 text-white"
                    onClick={(e) => handleArchiveClick(prospect)}
                  >
                    Restaurer
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        {showInteractions && (
          <div className="grow px-4 lg:p-4 overflow-auto flex flex-col gap-2">
            <div className="h-4/6 border border-gray-400 rounded-lg p-2 overflow-auto bg-white flex flex-col">
              {interactions.length > 0 &&
                interactions.map((interaction: IInteraction, i: number) => {
                  if (interaction.prospect_id === prospect.id && !interaction.is_archived) {
                    return (
                      <ChatInteraction
                        key={i + interaction.report}
                        report={interaction}
                        prospectId={prospect.id}
                      />
                    );
                  }
                })}
            </div>
            <div className="h-2/6 border border-gray-400 rounded-lg overflow-hidden relative">
              <textarea
                name="interaction"
                id="interaction"
                className="h-full w-full p-2 resize-none pb-9"
                placeholder="Décrire votre intéraction..."
                value={report}
                onChange={(e) => setReport(e.target.value)}
              ></textarea>
              <button
                className="block absolute bottom-2 right-2 bg-green-400 rounded-lg h-fit px-4 py-1"
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                <IoMdSend className="text-xl text-white" />
              </button>
            </div>
          </div>
        )}
        {showContacts && (
          <div className="grow px-4 lg:p-4 overflow-auto flex flex-col gap-2">
            <div className="h-4/6 overflow-auto">
              <h6 className="text-blue-gray-400 text-sm mb-2 font-bold uppercase">Contacts</h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12">
                  {contacts &&
                    contacts.map((contact, i: number) => {
                      if (contact.prospect_id === prospect.id && !contact.is_archived) {
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
            </div>
            <div className="border border-gray-400 rounded-lg p-2">
              <form>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-4/12 px-2">
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
                  <div className="w-full lg:w-4/12 px-2">
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
                  <div className="w-full lg:w-4/12 px-2">
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

                  <div className="w-full lg:w-4/12 px-2">
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
                  <div className="w-full lg:w-5/12 px-2">
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

                  <div className="w-full lg:w-3/12 px-2">
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
        )}
      </div>
    </div>
  );
}

export default ModalProspect;
