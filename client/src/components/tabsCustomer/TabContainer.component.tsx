import { useState } from 'react';

import TabMenu from './TabMenu.component';
import EvenementCustomer from './tabContent/EvenementCustomer.component';
import ContactCustomer from './tabContent/ContactCustomer.component';
import InvoiceCustomer from './tabContent/InvoiceCustomer.component';
import ProjectCustomer from './tabContent/ProjectCustomer.component';
import InteractionCustomer from './tabContent/InteractionCustomer.component';

interface IProps {
  customer: IProspect;
}

const menu: ITabMenu[] = [
  {
    id: 541,
    name: 'Événements',
  },
  {
    id: 542,
    name: 'Intéractions',
  },
  {
    id: 543,
    name: 'Contacts',
  },
  {
    id: 544,
    name: 'Projets',
  },
  {
    id: 545,
    name: 'Devis/Factures',
  },
];

function TabContainer({ customer }: IProps) {
  const [activeTab, setActiveTab] = useState(541);

  const handlesetActiveTab = (id: number) => setActiveTab(id);

  return (
    <div className="grow flex flex-col px-4">
      <TabMenu menuTab={menu} activeTab={activeTab} setActiveTab={handlesetActiveTab} />
      {activeTab === 541 && <EvenementCustomer />}
      {activeTab === 542 && <InteractionCustomer customer={customer} />}
      {activeTab === 543 && <ContactCustomer customer={customer} />}
      {activeTab === 544 && <ProjectCustomer prospectId={customer.id} />}
      {activeTab === 545 && <InvoiceCustomer />}
    </div>
  );
}

export default TabContainer;
