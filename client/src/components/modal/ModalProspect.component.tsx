import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { archiveProspect, updateProspect } from '../../redux/prospectSlice';

import { Typography } from '@material-tailwind/react';

import { GrClose, GrReactjs } from 'react-icons/gr';
import { getUsers } from '../../redux/userSlice';
import { FaCheck } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { getProspectStatus } from '../../redux/prospectStatusSlice';
import { getSources } from '../../redux/sourceSlice';
import { getActivities } from '../../redux/activitySlice';

interface IProps {
  prospect: IProspect;
  closeModal: () => void;
}

function ModalProspect({ prospect, closeModal }: IProps) {
  const { status } = useAppSelector((state) => state.prospectStatus);
  const { sources } = useAppSelector((state) => state.sources);
  const { activities } = useAppSelector((state) => state.activities);
  const { users } = useAppSelector((state) => state.users);

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
  const [statusProspect, setStatusProspect] = useState(prospect.piste_status_id || '');
  const [source, setSource] = useState(prospect.source_id || '');
  const [activity, setActivity] = useState(prospect.activity_id || '');
  const [assignedToId, setAssignedToId] = useState(prospect.assigned_to_id || '');

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProspectStatus());
    dispatch(getSources());
    dispatch(getActivities());
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
      piste_status_id: Number(statusProspect),
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
      setStatusProspect(updatedProspect.piste_status_id || '');
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

  return (
    <div
      className="absolute flex justify-center items-center inset-0 bg-black bg-opacity-50 z-50"
      onClick={(e) => {
        e.preventDefault();
        closeModal();
      }}
    >
      <div
        className="relative flex flex-col min-w-0 break-words w-[50%] h-[75%] mb-6 shadow-lg rounded-lg bg-gray-100 border-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-t bg-gray-300 mb-0 px-6 py-6">
          <div className="flex justify-between">
            <div className="w-full lg:w-8/12 px-2">
              {!update.companyNameUpdate ? (
                <div
                  className="relative w-full rounded px-4"
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

            <div>
              <GrClose
                className="text-black font-bold uppercase text-lg rounded hover:text-gray-800 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer"
                onClick={() => closeModal()}
              />
            </div>
          </div>
        </div>
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
                    {status.length &&
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
                variant="legend"
                className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
              >
                Nom de l'entreprise
              </Typography>
              {!update.companyNameUpdate ? (
                <div
                  className="relative w-full mb-3 bg-white rounded px-4"
                  onClick={() => setUpdate({ ...update, companyNameUpdate: true })}
                >
                  <Typography variant="lead" className="capitalize">
                    {prospect.company_name}
                  </Typography>
                </div>
              ) : (
                <div className="relative w-full mb-3 bg-white rounded">
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="SAS entreprise"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    onKeyUp={(e) => handleSubmitKeyDown(e)}
                    autoFocus
                  />
                </div>
              )}
            </div>
            <div className="w-full lg:w-12/12 px-2">
              <Typography
                variant="legend"
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
              variant="legend"
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
                variant="legend"
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

          <h6 className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Liens utiles</h6>
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

          <h6 className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Autre Besoin</h6>
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
      </div>
    </div>
  );
}

export default ModalProspect;
