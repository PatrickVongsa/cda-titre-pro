import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setToken, setIsLoggedIn } from '../redux/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const useAuthFromLocalStorage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchData = async () => {
    try {
      const userJSON = localStorage.getItem('user');
      const currentUserJSON = localStorage.getItem('currentUser');

      if (userJSON && currentUserJSON) {
        const userData = JSON.parse(userJSON);
        const currentUserData = JSON.parse(currentUserJSON);
        const isLoggedIn = true;

        console.log({ userData, currentUserData, isLoggedIn });

        dispatch(setUser(userData));
        dispatch(setToken(currentUserData));
        dispatch(setIsLoggedIn(isLoggedIn));
      } else {
        const isLoggedIn = false;
        dispatch(setIsLoggedIn(isLoggedIn));
      }
    } catch (error) {
      // Gérer l'erreur de récupération des données
      dispatch(setUser(null));
      dispatch(setToken(null));
      dispatch(setIsLoggedIn(false));
    }
  };

  useEffect(() => {
    console.log('custom');

    fetchData();
  }, [dispatch]);
};

export default useAuthFromLocalStorage;