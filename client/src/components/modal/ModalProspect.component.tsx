import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { updateProspect } from '../../redux/prospectSlice';

import { Typography } from '@material-tailwind/react';

import { GrClose } from 'react-icons/gr';
import { getUsers } from '../../redux/userSlice';

interface IProps {
  prospect: IProspect;
  closeModal: () => void;
}

function ModalProspect({ prospect, closeModal }: IProps) {
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
  }, []);

  const handleSubmit = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      try {
        const updatedProspect = await dispatch(
          updateProspect({
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
            assigned_to_id: assignedToId !== '' ? Number(assignedToId) : 0,
            piste_status_id: Number(statusProspect),
            source_id: Number(source),
            activity_id: Number(activity),
          }),
        ).unwrap();
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
        });
      } catch (err) {
        console.error('Failed to save the post: ', err);
      }
    }
    if (e.key === 'Escape') {
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
      });
    }
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
        <div className="absolute top-6 right-6 cursor-pointer">
          <GrClose
            className="text-black font-bold uppercase text-lg rounded hover:text-gray-600 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            onClick={() => closeModal()}
          />
        </div>
        <div className="px-4 lg:px-10 py-10 overflow-auto">
          <Typography
            variant="small"
            className="text-blue-gray-400 text-sm mt-3 mb-2 font-bold uppercase"
          >
            Prospect Information
          </Typography>
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                    onKeyUp={(e) => handleSubmit(e)}
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
                <label className="block uppercase text-blue-gray-600 text-xs font-bold mb-2">
                  Assigné à:
                </label>
                <select
                  className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={assignedToId}
                  onChange={(e) => setAssignedToId(e.target.value)}
                  onKeyUp={(e) => handleSubmit(e)}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProspect;
