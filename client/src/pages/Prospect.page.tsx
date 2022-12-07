import { useState, useEffect } from 'react';

import { DragAndDrop } from '../components/dragndrop/DragAndDrop.component';
import Header from '../components/header/Header.component';
import Modal from '../components/modal/Modal.component';
import useModal from '../hooks/useModal';

function Prospect() {
  const { isShowing, toggle } = useModal();

  console.log(isShowing)
  return (
    <div className="page-content">
      <Header pageTitle="Prospects" searchBar={true} tabs={true} createButton={true} openModal={toggle} />
      <Modal visible={isShowing} closeModal={toggle} />
      <DragAndDrop />
    </div>
  );
}

export default Prospect;
