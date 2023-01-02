import { useState } from 'react';

import TabMenu from './TabMenu.component';
import DayOffUser from './tabContent/DayOffUser.component';
import EvenementUser from './tabContent/EvenementUser.component';
import ClockInUser from './tabContent/ClockInUser.component';
import EmergencyContact from './tabContent/EmergencyContact.component';

interface IProps {
  user: IUser;
}

const menu: ITabMenu[] = [
  {
    id: 123,
    name: 'Événements',
  },
  {
    id: 124,
    name: 'Demande de congés',
  },
  {
    id: 125,
    name: 'Émargement',
  },
  {
    id: 126,
    name: "Contacts d'urgence",
  },
];

function TabContainer({ user }: IProps) {
  const [activeTab, setActiveTab] = useState(123);

  const handlesetActiveTab = (id: number) => setActiveTab(id);

  return (
    <div className="px-4">
      <TabMenu menuTab={menu} activeTab={activeTab} setActiveTab={handlesetActiveTab} />
      {activeTab === 123 && <EvenementUser />}
      {activeTab === 124 && <DayOffUser user={user} />}
      {activeTab === 125 && <ClockInUser />}
      {activeTab === 126 && <EmergencyContact user={user} />}
    </div>
  );
}

export default TabContainer;
