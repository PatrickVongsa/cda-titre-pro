import { CardItem } from './CardItem.component';

interface Props {
  items: IProspect[];
  name: string;
  color: string;
  isDragging: boolean;
  handleDragging: (dragging: boolean) => void;
  handleUpdateList: (id: number, status: string) => void;
}

export const ContainerCards = ({ items = [], name, color, isDragging, handleDragging, handleUpdateList }: Props) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = +e.dataTransfer.getData('text');
    handleUpdateList(id, name);
    handleDragging(false);
  };

  return (
    <div
      className={`min-w-[350px] rounded-xl h-full overflow-hidden flex-1 flex flex-col border-2`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <p
        style={{ backgroundColor: color, color: parseInt(color.replace('#', ''), 16) > 0xffffff / 2 ? '#000' : '#fff' }}
        className="border-b-2 border-slate-100 capitalize font-bold p-2 text-center"
      >
        {name}
      </p>
      <div className="h-[94%] overflow-y-auto">
        {items.map(
          (item) =>
            name === item.prospect_status?.name && (
              <CardItem data={item} key={item.id} handleDragging={handleDragging} />
            ),
        )}
      </div>
    </div>
  );
};
