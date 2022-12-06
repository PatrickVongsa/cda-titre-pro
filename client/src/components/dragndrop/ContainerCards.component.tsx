import { CardItem } from "./CardItem.component";
import { Data } from "./DragAndDrop.component";
import "./draganddrop.css";

interface Props {
  items: Data[];
  name: string;
  isDragging: boolean;
  handleDragging: (dragging: boolean) => void;
  handleUpdateList: (id: number, status: string) => void;
}

export const ContainerCards = ({
  items = [],
  name,
  isDragging,
  handleDragging,
  handleUpdateList,
}: Props) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = +e.dataTransfer.getData("text");
    handleUpdateList(id, name);
    handleDragging(false);
  };

  return (
    <div
      className={`layout-cards ${isDragging ? "layout-dragging" : ""}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <p>{name}</p>
      {items.map(
        (item) =>
          name === item.status && (
            <CardItem
              data={item}
              key={item.id}
              handleDragging={handleDragging}
            />
          )
      )}
    </div>
  );
};
