import { useState } from "react";
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
    status: "good",
  },
  {
    id: 2,
    content: "Flash",
    status: "normal",
  },
  {
    id: 3,
    content: "Green Lantern",
    status: "good",
  },
  {
    id: 4,
    content: "Batman",
    status: "bad",
  },
];

const typesHero: string[] = ["good", "normal", "bad"];

export const DragAndDrop = () => {
  const { isDragging, listItems, handleDragging, handleUpdateList } = useDragAndDrop(data)

  return (
    <div className="grid">
      {typesHero.map((container) => (
        <ContainerCards
          status={container}
          key={container}
          items={data}
          isDragging={isDragging}
          handleDragging={handleDragging}
          handleUpdateList={handleUpdateList}
        />
      ))}
    </div>
  );
};
