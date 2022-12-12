import { Typography } from '@material-tailwind/react';

interface IProps {
  pageTitle: string;
  searchBar: boolean;
  createButton: boolean;
  tabs: boolean;
  openModal?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

function Header({
  pageTitle,
  searchBar,
  createButton,
  tabs,
  openModal,
  activeTab,
  setActiveTab,
}: IProps) {
  return (
    <div className="flex flex-col justify-between items-start pb-4">
      <Typography variant="h3" className="mb-2">
        {pageTitle}
      </Typography>
      <div className="flex justify-between items-center w-full">
        {searchBar && (
          <div>
            <input
              className="border rounded-full w-[350px] shadow-sm  py-2 px-4 text-sm"
              type="search"
              name="search"
              id="search"
              placeholder="Rechercher"
            />
          </div>
        )}
        {createButton && (
          <div>
            <button
              className="bg-green-500 font-bold text-white rounded-lg py-2 px-4 hover:bg-green-700 text-sm"
              onClick={openModal && (() => openModal())}
            >
              + Créer
            </button>
          </div>
        )}
        {tabs && (
          <div>
            <button
              className={
                activeTab === 'list'
                  ? 'font-semibold py-2 px-6 bg-gray-400 rounded-l-full text-sm'
                  : 'bg-gray-200 font-semibold py-2 px-6 hover:bg-gray-400 rounded-l-full text-sm'
              }
              onClick={setActiveTab && (() => setActiveTab('list'))}
            >
              Vue Liste
            </button>
            <button
              className={
                activeTab === 'column'
                  ? 'font-semibold py-2 px-6 bg-gray-400 border-x border-gray-100 text-sm'
                  : 'bg-gray-200 font-semibold py-2 px-6 hover:bg-gray-400 border-x border-gray-100 text-sm'
              }

              onClick={setActiveTab && (() => setActiveTab('column'))}
            >
              Vue Colonnes
            </button>
            <button
              className={
                activeTab === 'archive'
                  ? 'font-semibold py-2 px-6 bg-gray-400 rounded-r-full text-sm'
                  : 'bg-gray-200 font-semibold py-2 px-6 hover:bg-gray-400 rounded-r-full text-sm'
              }
              onClick={setActiveTab && (() => setActiveTab('archive'))}
            >
              Archivés
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
