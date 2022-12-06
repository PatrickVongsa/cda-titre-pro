import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hook";
import { getProspectStatus } from "../../redux/prospectStatusSlice";

import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { ContainerCards } from "./ContainerCards.component";

import "./draganddrop.css";

export interface Data {
  id: number;
  content: string;
  status: string;
}

export const data: Data[] = [
  {
    id: 1,
    content: "Aqua-man",
    status: "nouveau",
  },
  {
    id: 2,
    content: "Flash",
    status: "assigné",
  },
  {
    id: 3,
    content: "Green Lantern",
    status: "assigné",
  },
  {
    id: 4,
    content: "Batman",
    status: "gagné",
  },
];

export const DragAndDrop = () => {
  const { status, loading } = useAppSelector((state) => state.prospectStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProspectStatus());
  }, []);

  const { isDragging, listItems, handleDragging, handleUpdateList } =
    useDragAndDrop(data);

  return (
    <div className="grid">
      {!loading &&
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
