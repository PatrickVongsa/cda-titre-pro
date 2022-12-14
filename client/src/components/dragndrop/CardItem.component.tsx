import { Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { FaArchive } from 'react-icons/fa';
import { useAppDispatch } from '../../hooks/redux.hook';
import useModal from '../../hooks/useModal';
import { archiveProspect } from '../../redux/prospectSlice';
import ModalProspect from '../modal/ModalProspect.component';

interface Props {
  data: IProspect;
  handleDragging: (dragging: boolean) => void;
}

export const CardItem = ({ data, handleDragging }: Props) => {
  // const { isShowing, toggle } = useModal();
  const [showModal, setShowModal] = useState(true);

  const dispatch = useAppDispatch();

  const openModal = () => setShowModal(!showModal);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${data.id}`);
    handleDragging(true);
  };
  const handleDragEnd = () => handleDragging(false);

  const handleclick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await dispatch(archiveProspect(data));
  };

  return (
    <>
      {!showModal && <ModalProspect prospect={data} closeModal={openModal} />}
      <Card
        className="group/card m-2 border-2 shadow-md rounded-md p-4 cursor-pointer relative"
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(!showModal);
        }}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <button
          className="absolute top-2 right-2 p-2 rounded-lg border border-gray-400 invisible hover:bg-gray-400 hover:text-white group-hover/card:visible"
          title="Archiver le prospect"
          onClick={(e) => {
            e.stopPropagation();
            handleclick(e);
          }}
        >
          <FaArchive />
        </button>
        <CardBody className="p-0 px-2">
          <Typography variant="lead" className="capitalize">
            {data.company_name}
          </Typography>
          <Typography variant="small" className="font-medium capitalize">
            {data.address}
          </Typography>
          <Typography variant="small" className="font-medium capitalize mb-1">
            {data.postal_code} {data.city}
          </Typography>
          <Typography variant="small" className="font-normal">
            {data.phone}
          </Typography>
          <Typography variant="small" className="font-normal mb-2">
            {data.email}
          </Typography>
        </CardBody>
        {data?.assigned_to_id && (
          <CardFooter className="p-2 pb-0 text-end border-t">
            <Typography variant="small" className="font-normal">
              assigné à{' '}
              <b>
                {data.assigned_to?.firstname} {data.assigned_to?.lastname}
              </b>
            </Typography>
          </CardFooter>
        )}
      </Card>
    </>
  );
};
