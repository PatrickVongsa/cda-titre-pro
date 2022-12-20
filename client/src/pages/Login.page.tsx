import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux.hook';
import { login } from '../redux/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    await dispatch(login({ email, password }));
    navigate('/');
  };

  return (
    <div className=" w-full flex flex-col justify-center items-center">
      <div className="border-2 border-gray-400 p-4 rounded-xl shadow-md">
        <h1 className="text-xl font-bold mb-8">Se connecter</h1>
        <form>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-2">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                  htmlFor="firstname"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="monemail@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full lg:w-12/12 px-2">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blue-gray-600 text-xs font-bold mb-2"
                  htmlFor="password"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  className="border-0 px-3 py-3 placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="motdepasse"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full lg:w-12/12 my-4 px-2 text-end">
              <button
                className="bg-green-400 text-white text-semibold rounded-lg py-2 px-4"
                onClick={handleSubmit}
              >
                Se connecter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
