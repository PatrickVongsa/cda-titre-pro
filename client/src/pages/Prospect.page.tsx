import { useState, useEffect } from "react";

import { DragAndDrop } from "../components/dragndrop/DragAndDrop.component";
import Header from "../components/header/Header.component";

function Prospect() {
  return (
    <div className="page-content">
      <Header
        pageTitle="Prospect"
        searchBar={true}
        tabs={true}
        createButton={true}
      />
      <DragAndDrop />
    </div>
  );
}

export default Prospect;
