import React from 'react'
import useAuthFromLocalStorage from '../hooks/useAuthFromLocalStorage';

function NoMatch() {

  useAuthFromLocalStorage();
  
  return (
    <div className="relative p-4 grow h-screen w-[calc(100%-64rem)]">404</div>
  )
}

export default NoMatch;