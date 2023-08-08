import React from 'react'
import useAuthFromLocalStorage from '../hooks/useAuthFromLocalStorage';

function Planning() {

  useAuthFromLocalStorage();
  return (
    <div className="relative p-4 grow h-screen w-[calc(100%-64rem)]">Planning</div>
  )
}

export default Planning