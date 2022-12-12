import { Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import useModal from "../../hooks/useModal";
import ModalProspect from '../modal/ModalProspect.component';

interface Props {
  data: IProspect;
  handleDragging: (dragging: boolean) => void;
}

export const CardItem = ({ data, handleDragging }: Props) => {
  const { isShowing, toggle } = useModal();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${data.id}`);
    handleDragging(true);
  };
  const handleDragEnd = () => handleDragging(false);


  return (
    <>
    {isShowing && <ModalProspect prospect={data} closeModal={toggle} />}
    <Card
      className="m-2 border-2 shadow-md rounded-md p-4"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => toggle()}
    >
      <CardBody className="p-0 px-2">
        <Typography variant="lead" className="capitalize">
          {data.company_name}
        </Typography>
        <Typography variant="small" className="font-medium capitalize">{data.address}</Typography>
        <Typography variant="small" className="font-medium capitalize mb-1">
          {data.postal_code} {data.city}
        </Typography>
        <Typography variant="small" className="font-normal">{data.phone}</Typography>
        <Typography variant="small" className="font-normal mb-2">{data.email}</Typography>
      </CardBody>
      {data?.siret_number && (
        <CardFooter className="p-2 pb-0 text-end border-t">
          <Typography  variant="small" className="font-normal">{data.siret_number}</Typography>
        </CardFooter>
      )}
    </Card>
    </>
  );
};
