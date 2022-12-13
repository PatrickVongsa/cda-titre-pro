import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { getProspectStatus } from '../../redux/prospectStatusSlice';
import { getSources } from '../../redux/sourceSlice';
import { getActivities } from '../../redux/activitySlice';
import { getUsers } from '../../redux/userSlice';
import { addProspect } from '../../redux/prospectSlice';

import { Typography } from '@material-tailwind/react';

import { GrClose } from 'react-icons/gr';

interface IProps {
  closeModal: () => void;
}

function ModalAddProspect({ closeModal }: IProps) {
  const { status } = useAppSelector((state) => state.prospectStatus);
  const { sources } = useAppSelector((state) => state.sources);
  const { activities } = useAppSelector((state) => state.activities);
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [estimateBudget, setEstimateBudget] = useState('');
  const [needDescription, setNeedDescription] = useState('');
  const [hasWebsite, setHasWebsite] = useState(false);
  const [websiteYear, setWebsiteYear] = useState('');
  const [otherNeed, setOtherNeed] = useState('');
  const [siretNumber, setSiretNumber] = useState('');
  const [statusProspect, setStatusProspect] = useState('');
  const [source, setSource] = useState('');
  const [activity, setActivity] = useState('');
  const [assignedToId, setAssignedToId] = useState('');

  useEffect(() => {
    dispatch(getProspectStatus());
    dispatch(getSources());
    dispatch(getActivities());
    dispatch(getUsers());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await dispatch(
        addProspect({
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
          assigned_to_id: assignedToId !== "" ? Number(assignedToId) : 1,
          piste_status_id: Number(statusProspect),
          source_id: Number(source),
          activity_id: Number(activity),
        }),
      ).unwrap();
      setCompanyName('');
      setAddress('');
      setPostalCode('');
      setCity('');
      setCountry('');
      setPhone('');
      setEmail('');
      setWebsiteUrl('');
      setFacebookUrl('');
      setInstagramUrl('');
      setLinkedInUrl('');
      setEstimateBudget('');
      setNeedDescription('');
      setHasWebsite(false);
      setWebsiteYear('');
      setOtherNeed('');
      setSiretNumber('');
      setStatusProspect('');
      setSource('');
      setActivity('');
      setAssignedToId('');
      closeModal();
    } catch (err) {
      console.error('Failed to save the post: ', err);
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
        <div className="rounded-t bg-gray-300 mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <Typography variant="h4" className="mb-2">
              Ajouter un nouveau prospect
            </Typography>
            <div>
              <GrClose
                className="text-black font-bold uppercase text-lg rounded hover:text-gray-800 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer"
                onClick={() => closeModal()}
              />
            </div>
          </div>
        </div>
        <div className="grow px-4 lg:px-10 py-10 pt-0 overflow-auto">
          <form onSubmit={handleSubmit}>
            <Typography
              variant="small"
              className="text-blue-gray-400 text-sm mt-3 mb-2 font-bold uppercase"
            >
              Prospect Information
            </Typography>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12 px-2">
                <div className="relative w-full">
                  <label className="block uppercase text-blue-gray-600 text-xs font-bold mb-2">
                    Statut:
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={statusProspect}
                    onChange={(e) => setStatusProspect(e.target.value)}
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
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-2">
                <div className="relative w-full">
                  <label className="block uppercase text-blue-gray-600 text-xs font-bold mb-2">
                    Provenance:
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
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
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-2">
                <div className="relative w-full">
                  <label className="block uppercase text-blue-gray-600 text-xs font-bold mb-2">
                    Secteur d'activité:
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
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
                </div>
              </div>
            </div>

            <hr className="my-4 border-b-1 border-blue-gray-300" />

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nom de l'entreprise
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="SAS entreprise"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="123, rue de la place"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Code Postal
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="31000"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Ville
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Paris"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full lg:w-4/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Pays
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="France"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-2">
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
                    placeholder="05xxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-2">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Numéro SIRET
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="France"
                    max={14}
                    value={siretNumber}
                    onChange={(e) => setSiretNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Logo
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="logo.[png, jpg, jpeg]"
                    value={companyLogo}
                    onChange={(e) => setCompanyLogo(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <hr className="my-4 border-b-1 border-blue-gray-300" />

            <h6 className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Besoin</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description du besoin
                  </label>
                  <textarea
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    cols={30}
                    rows={5}
                    value={needDescription}
                    onChange={(e) => setNeedDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    A un site web?
                  </label>
                  <input
                    type="checkbox"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={`${hasWebsite}`}
                    onChange={(e) => setHasWebsite(e.target.checked)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Année du site
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="2000"
                    value={websiteYear}
                    onChange={(e) => setWebsiteYear(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Budget estimé
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="1500"
                    value={estimateBudget}
                    onChange={(e) => setEstimateBudget(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <hr className="my-4 border-b-1 border-blue-gray-300" />

            <h6 className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Liens utiles
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Lien du site web
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="https://lien.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Facebook
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="https://www.facebook.com/name"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Instagram
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="https://www.instagram.com/name"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="https://www.linkedin.com/name"
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <hr className="my-4 border-b-1 border-blue-gray-300" />

            <h6 className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Autre Besoin
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description
                  </label>
                  <textarea
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    cols={30}
                    rows={5}
                    value={otherNeed}
                    onChange={(e) => setOtherNeed(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <hr className="my-4 border-b-1 border-blue-gray-300" />

            <h6 className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Assigner le prospect</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-2 mb-4">
                <div className="relative w-full">
                  <label className="block uppercase text-blue-gray-600 text-xs font-bold mb-2">
                    Assigné à:
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={assignedToId}
                    onChange={(e) => setStatusProspect(e.target.value)}
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
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalAddProspect;
