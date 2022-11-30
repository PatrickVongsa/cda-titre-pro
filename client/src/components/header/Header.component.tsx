import React from 'react'

import './header.styles.css'

interface IProps {
    pageTitle: string;
}

function Header({pageTitle}: IProps) {
  return (
    <div className='header'>
        <h1>{pageTitle}</h1>
        <div className='container'>
            <div>
                <input type="search" name="search" id="search" />
            </div>
            <div>
                <button>+ Créer</button>
            </div>
            <div>
                <button>Vue Liste</button>
                <button>Vue Colonnes</button>
                <button>Archivés</button>
            </div>
        </div>
    </div>
  )
}

export default Header