import { useState, useEffect } from "react";

import { allProspectStatus } from "../../api/statusProspect.api";

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

export const DragAndDrop = () => {
  const [prospectStatusList, setProspectStatusList] = useState(null);
  useEffect(() => {
    allProspectStatus().then((res) => {
      console.log(res);
      setProspectStatusList(res);
    });
  }, []);
  const { isDragging, listItems, handleDragging, handleUpdateList } =
    useDragAndDrop(data);
  console.log(prospectStatusList);
  return (
    <div className="grid">
      {prospectStatusList.length &&
        prospectStatusList.map((container) => (
          <ContainerCards
            status={container}
            key={container.id}
            items={listItems}
            isDragging={isDragging}
            handleDragging={handleDragging}
            handleUpdateList={handleUpdateList}
          />
        ))}
    </div>
  );
};
