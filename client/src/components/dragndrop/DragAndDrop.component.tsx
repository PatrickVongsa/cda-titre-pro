import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { getProspectStatus } from '../../redux/prospectStatusSlice';
import { getProspects } from '../../redux/prospectSlice';

import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { ContainerCards } from './ContainerCards.component';

import './draganddrop.css';
import Prospect from '../../pages/Prospect.page';

export const DragAndDrop = () => {
  const { status, loading: loadingStatus } = useAppSelector((state) => state.prospectStatus);
  const { prospects, loading: loadingProspect } = useAppSelector((state) => state.prospects);

  const dispatch = useAppDispatch();

  
  useEffect(() => {
    dispatch(getProspects());
    dispatch(getProspectStatus());
  }, []);
  
  const { isDragging, listItems, handleDragging, handleUpdateList } = useDragAndDrop(prospects, status);

  return (
    <div className="grid">
      {!loadingStatus &&
        status.map((container: IProspectStatus) => (
          <ContainerCards
            name={container.name}
            key={container.id + container.name}
            items={listItems}
            isDragging={isDragging}
            handleDragging={handleDragging}
            handleUpdateList={handleUpdateList}
          />
        ))}
    </div>
  );
};
