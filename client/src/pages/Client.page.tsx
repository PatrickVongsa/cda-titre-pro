import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux.hook';

import useModal from '../hooks/useModal';

import Header from '../components/header/Header.component';
import ModalAddUser from '../components/modal/ModalAddUser.component';

import { getProspects } from '../redux/prospectSlice';
import CardUser from '../components/cards/CardUser.component';
import DetaiUser from '../components/details/DetaiUser.component';
import TabContainer from '../components/tabsCustomer/TabContainer.component';
import DetailCustomer from '../components/details/DetaiCustomer.component';
import CardCustomer from '../components/cards/CardCustomer.component';

function Client() {
  const { isShowing, toggle } = useModal();

  const { prospects, loading } = useAppSelector((state) => state.prospects);

  const dispatch = useAppDispatch();

  const [displayClient, setDisplayClient] = useState<IProspect | null>(null);

  const handleSetDisplayUser = (prospect: IProspect | null) => setDisplayClient(prospect);

  useEffect(() => {
    dispatch(getProspects());
  }, []);

  return (
    <div className="relative p-4 grow h-screen w-[calc(100%-64rem)]">
      <Header
        pageTitle="Clients"
        searchBar={true}
        createButton={true}
        tabs={false}
        openModal={toggle}
      />
      {isShowing && <ModalAddUser closeModal={toggle} />}
      <div className="flex h-[90%]">
        <div className="w-3/12 pr-2 mr-2 border-r border-gray--700 h-full overflow-auto">
          {!loading &&
            prospects.map((prospect: IProspect, i: number) => {
              if (prospect.is_client && !prospect.is_archived) {
                return (
                  <CardCustomer
                    customer={prospect}
                    key={i + prospect.company_name}
                    displayClientID={displayClient?.id}
                    setDisplayCustomer={handleSetDisplayUser}
                  />
                );
              }
            })}
        </div>
        <div className="w-9/12 flex flex-col">
          {displayClient && (
            <>
              <DetailCustomer customer={displayClient} setDisplayCustomer={handleSetDisplayUser} />
              <div className="grow">
                <TabContainer customer={displayClient}  />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Client;
