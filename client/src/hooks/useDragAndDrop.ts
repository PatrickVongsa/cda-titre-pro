import { useState, useEffect } from 'react';
import { useAppDispatch } from './redux.hook';
import { updateProspect } from '../redux/prospectSlice';

export const useDragAndDrop = (initialList: IProspect[], statusList: IProjectStatus[]) => {
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState<IProspect[]>(initialList);
  const [listStatus, setListStatus] = useState<IProjectStatus[]>(statusList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setListItems(initialList);
    setListStatus(statusList);
  }, [initialList, statusList]);

  const handleUpdateList = async (id: number, status: string) => {
    let card = listItems.find((item) => item.id === id);
    if (card && card.prospect_status.name !== status) {
      let statusInfo = statusList.filter((sts) => sts.name === status)[0];
      let updateCard = { ...card, piste_status_id: Number(statusInfo.id), prospect_status: statusInfo };

      try {
        await dispatch(updateProspect(updateCard)).unwrap();
      } catch (err) {
        console.error('Failed to save the post: ', err);
      }
    }
  };

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  return {
    isDragging,
    listItems,
    handleUpdateList,
    handleDragging,
  };
};
