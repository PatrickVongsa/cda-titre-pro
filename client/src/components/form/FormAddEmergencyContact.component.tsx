import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { addEmergencyContact, updateEmergencyContact } from '../../redux/emergencyContactSlice';
import { addEmergencyUser } from '../../redux/emergencyUserSlice';
interface IProps {
  user: IUser;
  contact: IEmergencyContact | null;
  setEmergencyContact: (contact: IEmergencyContact | null) => void;
}

function FormAddEmergencyContact({ user, contact, setEmergencyContact }: IProps) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [whoIs, setWhoIs] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const newContact = await dispatch(
        addEmergencyContact({
          firstname,
          lastname,
          who_is: whoIs,
          phone,
        }),
      ).unwrap();

      if (newContact) {
        await dispatch(addEmergencyUser({ contact: newContact, user }));
        setFirstname('');
        setLastname('');
        setWhoIs('');
        setPhone('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(
        updateEmergencyContact({
          id: contact?.id,
          firstname,
          lastname,
          who_is: whoIs,
          phone,
        }),
      ).unwrap();
      setFirstname('');
      setLastname('');
      setWhoIs('');
      setPhone('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (contact) {
      setFirstname(contact?.firstname);
      setLastname(contact?.lastname);
      setWhoIs(contact?.who_is);
      setPhone(contact?.phone);
    }
  }, [contact]);

  return (
    <div className="w-full h-fit border border-gray-400 rounded-lg p-2">
      <form>
        <p className="font-semibold mb-4 text-blue-gray-700">
          {!contact ? 'Ajouter' : 'Modifier'} contact d'urgence
        </p>
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
                Lien de parenté
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Père"
                value={whoIs}
                onChange={(e) => setWhoIs(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full lg:w-12/12 px-2">
            <div className="relative w-full mb-3 flex justify-center gap-2">
              <button
                className="bg-green-400 rounded-lg h-fit px-4 py-2 text-white"
                onClick={(e) => {
                  if (!contact) {
                    handleSubmit(e);
                  } else {
                    handleUpdateSubmit(e);
                  }
                }}
              >
                {!contact ? 'Ajouter' : 'Enregistrer'}
              </button>
              {contact && (
                <button
                  className="bg-red-500 rounded-lg h-fit px-4 py-2 text-white"
                  onClick={() => {
                    setFirstname('');
                    setLastname('');
                    setWhoIs('');
                    setPhone('');
                    setEmergencyContact(null);
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
  );
}

export default FormAddEmergencyContact;
