import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux.hook';

import useModal from '../hooks/useModal';

import Header from '../components/header/Header.component';
import ModalAddUser from '../components/modal/ModalAddUser.component';

import { getUsers } from '../redux/userSlice';

function Employee() {
  const { isShowing, toggle } = useModal();
  
  const { users, loading } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="relative p-4 grow h-screen w-[calc(100%-64rem)]">
      <Header
        pageTitle="Employés"
        searchBar={true}
        createButton={true}
        tabs={false}
        openModal={toggle}
      />
      {isShowing && <ModalAddUser closeModal={toggle} />}
      <div>
        {!loading &&
          users.map((user: IUser, i: number) => {
            return <p key={i + user.firstname}>{user.firstname}</p>;
          })}
      </div>
    </div>
  );
}

export default Employee;
