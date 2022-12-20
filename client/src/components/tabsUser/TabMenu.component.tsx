import React from 'react';
import { ITabMenu } from './TabContainer.component';

interface IProps {
  menuTab: ITabMenu[];
  activeTab: number;
  setActiveTab: (id: number) => void;
}

function TabMenu({ menuTab, activeTab, setActiveTab }: IProps) {
  return (
    <div className="w-full mb-2">
      <ul className="flex gap-4">
        {menuTab.map((tab: ITabMenu, i: number) => {
          return (
            <li
              key={i + tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer ${
                tab.id === activeTab
                  ? 'border-b-2 border-gray-400'
                  : ''
              }`}
            >
              {tab.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TabMenu;
