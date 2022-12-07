import React from "react";

import "./header.styles.css";

interface IProps {
  pageTitle: string;
  searchBar: boolean;
  createButton: boolean;
  tabs: boolean;
  openModal: () => void;
}

function Header({ pageTitle, searchBar, createButton, tabs, openModal }: IProps) {
  return (
    <div className="header">
      <h1>{pageTitle}</h1>
      <div className="container">
        {searchBar && (
          <div>
            <input type="search" name="search" id="search" />
          </div>
        )}
        {createButton && (
          <div>
            <button onClick={() => openModal()}>+ Créer</button>
          </div>
        )}
        {tabs && (
          <div>
            <button>Vue Liste</button>
            <button>Vue Colonnes</button>
            <button>Archivés</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
