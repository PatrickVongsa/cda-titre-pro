import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux.hook';

import useModal from '../hooks/useModal';

import Header from '../components/header/Header.component';
import ModalAddUser from '../components/modal/ModalAddUser.component';

import { getUsers } from '../redux/userSlice';
import CardUser from '../components/cards/CardUser.component';
import DetaiUser from '../components/details/DetaiUser.component';
import TabContainer from '../components/tabsUser/TabContainer.component';

function Employee() {
  const { isShowing, toggle } = useModal();

  const { users, loading } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  const [displayUser, setDisplayUser] = useState<IUser | null>(null);

  const handleSetDisplayUser = (user: IUser | null) => setDisplayUser(user);

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
      <div className="flex h-[90%]">
        <div className="w-3/12 pr-2 mr-2 border-r border-gray--700 h-full overflow-auto">
          {!loading &&
            users.map((user: IUser, i: number) => {
              if (!user.is_archived) {
                return (
                  <CardUser
                    user={user}
                    key={i + user.firstname}
                    displayUserID={displayUser?.id}
                    setDisplayUser={handleSetDisplayUser}
                  />
                );
              }
            })}
        </div>
        <div className="w-9/12 flex flex-col">
          {displayUser && 
            <>
              <DetaiUser user={displayUser} setDisplayUser={handleSetDisplayUser} />
              <div className="grow">
                <TabContainer user={displayUser} />
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default Employee;
