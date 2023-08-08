import React from 'react'
import useAuthFromLocalStorage from '../hooks/useAuthFromLocalStorage';

function Dashboard() {
  useAuthFromLocalStorage();
  return (
    <div className="relative p-4 grow h-screen w-[calc(100%-64rem)]">Dashboard</div>
  )
}

export default Dashboard;