import { useState, useEffect } from 'react';

import { DragAndDrop } from '../components/dragndrop/DragAndDrop.component';
import Header from '../components/header/Header.component';
import ListView from '../components/listview/ListView.component';
import ModalAddProspect from '../components/modal/ModalAddProspect.component';
import useModal from '../hooks/useModal';

function Prospect() {
  const { isShowing, toggle } = useModal();

  const [activeTabs, setActiveTabs] = useState('list');

  return (
    <div className="relative p-4 grow h-screen w-[calc(100%-64rem)]">
      <Header
        pageTitle="Prospects"
        searchBar={true}
        tabs={true}
        createButton={true}
        openModal={toggle}
        activeTab={activeTabs}
        setActiveTab={(tab: string) => setActiveTabs(tab)}
      />
      {isShowing && <ModalAddProspect closeModal={toggle} />}
      {activeTabs === 'column' && <DragAndDrop />}
      {activeTabs === 'list' && <ListView />}
      {activeTabs === 'archive' && <DragAndDrop />}
    </div>
  );
}

export default Prospect;
