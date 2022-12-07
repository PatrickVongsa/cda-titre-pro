import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { getProspectStatus } from '../../redux/prospectStatusSlice';
import { getSources } from '../../redux/sourceSlice';
import { getActivities } from '../../redux/activitySlice';
import { addProspect } from '../../redux/prospectSlice';

import './modal.styles.css';

interface IProps {
  visible: boolean;
  closeModal: () => void;
}

function Modal({ visible, closeModal }: IProps) {
  const { status } = useAppSelector((state) => state.prospectStatus);
  const { sources } = useAppSelector((state) => state.sources);
  const { activities } = useAppSelector((state) => state.activities);
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
  const [isClient, setIsClient] = useState(false);
  const [siretNumber, setSiretNumber] = useState('');
  const [statusProspect, setStatusProspect] = useState('');
  const [source, setSource] = useState('');
  const [activity, setActivity] = useState('');

  useEffect(() => {
    dispatch(getProspectStatus());
    dispatch(getSources());
    dispatch(getActivities());
  }, []);

  //ajouter contacted_at au traitement du formulaire
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
          is_client: isClient,
          siret_number: siretNumber,
          assigned_to_id: 2,
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
      setIsClient(false);
      setSiretNumber('');
      setStatusProspect('');
      setSource('');
      setActivity('');
    } catch (err) {
      console.error('Failed to save the post: ', err);
    }
  };
  estimateBudget;

  return (
    visible && (
      <div
        className="overlay"
        onClick={() => {
          closeModal();
        }}
      >
        <div className="modal">
          <h3>Ajouter un nouveau prospect</h3>
          <form onClick={handleSubmit}>
            <div>
              <label htmlFor="company_name">Nom de l'entreprise</label>
              <input
                type="text"
                name="company_name"
                id="company_name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                name="address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="postal_code">Code postal</label>
              <input
                type="text"
                name="postal_code"
                id="postal_code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="city">Ville</label>
              <input type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
              <label htmlFor="country">Pays</label>
              <input
                type="text"
                name="country"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone">Téléphone</label>
              <input type="tel" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="company_logo">Logo</label>
              <input
                type="text"
                name="company_logo"
                id="company_logo"
                value={companyLogo}
                onChange={(e) => setCompanyLogo(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="website_url">URL site web</label>
              <input
                type="text"
                name="website_url"
                id="website_url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="facebook_url">Facebook</label>
              <input
                type="text"
                name="facebook_url"
                id="facebook_url"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="instagram_url">Instagram</label>
              <input
                type="text"
                name="instagram_url"
                id="instagram_url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="linkedin_url">Linked In</label>
              <input
                type="text"
                name="linkedin_url"
                id="linkedin_url"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="estimate_budget">Budget estimé</label>
              <input
                type="number"
                name="estimate_budget"
                id="estimate_budget"
                value={estimateBudget}
                onChange={(e) => setEstimateBudget(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="need_description">Description du besoin</label>
              <textarea
                name="need_description"
                id="need_description"
                cols={30}
                rows={10}
                value={needDescription}
                onChange={(e) => setNeedDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="has_website">A un site web</label>
              <input
                type="checkbox"
                name="has_website"
                id="has_website"
                value={`${hasWebsite}`}
                onChange={(e) => setHasWebsite(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="website_year">Année du site</label>
              <input
                type="number"
                name="website_year"
                id="website_year"
                value={websiteYear}
                onChange={(e) => setWebsiteYear(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="other_need">Autre besoin</label>
              <textarea
                name="other_need"
                id="other_need"
                cols={30}
                rows={10}
                value={otherNeed}
                onChange={(e) => setOtherNeed(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="is_client">est client?</label>
              <input
                type="checkbox"
                name="is_client"
                id="is_client"
                value={`${isClient}`}
                onChange={(e) => setIsClient(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="siret_number">Numéro de siret</label>
              <input
                type="text"
                name="siret_number"
                id="siret_number"
                max={14}
                value={siretNumber}
                onChange={(e) => setSiretNumber(e.target.value)}
              />
            </div>
            <div>
              <label>
                Choisir le statut:
                <select value={statusProspect} onChange={(e) => setStatusProspect(e.target.value)}>
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
              </label>
            </div>
            <div>
              <label>
                Choisir la source:
                <select value={source} onChange={(e) => setSource(e.target.value)}>
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
              </label>
            </div>
            <div>
              <label>
                Choisir le secteur d'activité:
                <select value={activity} onChange={(e) => setActivity(e.target.value)}>
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
              </label>
            </div>
            <div>
              <button type="submit">Ajouter</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default Modal;
