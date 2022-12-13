import { useState } from 'react';
import { Typography } from '@material-tailwind/react';

import { useAppDispatch } from '../../hooks/redux.hook';
import { addUser } from '../../redux/userSlice';

import { GrClose } from 'react-icons/gr';

interface IProps {
  closeModal: () => void;
}

function ModalAddUser({ closeModal }: IProps) {
  const dispatch = useAppDispatch();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [contratType, setContratType] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await dispatch(
        addUser({
          firstname: firstname,
          lastname: lastname,
          address: address,
          postal_code: postalCode,
          city: city,
          occupation: occupation,
          contrat_type: contratType,
          phone: phone,
          email: email,
          password: password,
        }),
      ).unwrap();
      setFirstname('');
      setLastname('');
      setAddress('');
      setPostalCode('');
      setCity('');
      setOccupation('');
      setContratType('');
      setPhone('');
      setEmail('');
      setPassword('');
      closeModal();
    } catch (err) {
      console.error('Failed to save the user: ', err);
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
              Ajouter un nouvel employé
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
              Informations de l'employé
            </Typography>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="firstname"
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Prénom"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="lastname"
                  >
                    NOM
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="NOM"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="address"
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
                    htmlFor="postalCode"
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
              <div className="w-full lg:w-8/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="city"
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
                    htmlFor="email"
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
                    htmlFor="occupation"
                  >
                    Poste occupé
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Développeur web"
                    max={14}
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="contratType"
                  >
                    Type de contrat
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="CDI"
                    value={contratType}
                    onChange={(e) => setContratType(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <hr className="my-4 border-b-1 border-blue-gray-300" />

            <h6 className="text-blue-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Mot de passe pour connexion
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Mot de passe
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="simCa-1000"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
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

export default ModalAddUser;
