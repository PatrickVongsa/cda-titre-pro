import ProspectLine from './ProspectLine.component';

interface IProps {
  status: string;
  prospects: IProspect[];
  color: string;
  seeArchive: boolean;
}

function LineContainer({ color, prospects, status, seeArchive }: IProps) {
  return (
    <div className="mb-2 shadow-sm border-2 rounded-md">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h4
              className={
                'font-semibold text-lg capitalize ' +
                (color === 'light' ? 'text-blue-gray-700' : 'text-white')
              }
            >
              {status}
            </h4>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        {/* Projects table */}
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                className={
                  'w-3/12 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blue-gray-50 text-blue-gray-500 border-blue-gray-100'
                    : 'bg-light-blue-800 text-light-blue-300 border-light-blue-700')
                }
              >
                Name
              </th>
              <th
                className={
                  'w-3/12 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blue-gray-50 text-blue-gray-500 border-blue-gray-100'
                    : 'bg-light-blue-800 text-light-blue-300 border-light-blue-700')
                }
              >
                Contact
              </th>
              <th
                className={
                  'w-3/12 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blue-gray-50 text-blue-gray-500 border-blue-gray-100'
                    : 'bg-light-blue-800 text-light-blue-300 border-light-blue-700')
                }
              >
                Assigné à
              </th>
              <th
                className={
                  'w-2/12 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blue-gray-50 text-blue-gray-500 border-blue-gray-100'
                    : 'bg-light-blue-800 text-light-blue-300 border-light-blue-700')
                }
              >
                Événements
              </th>

              <th
                className={
                  'w-1/12 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blue-gray-50 text-blue-gray-500 border-blue-gray-100'
                    : 'bg-light-blue-800 text-light-blue-300 border-light-blue-700')
                }
              ></th>
            </tr>
          </thead>
          <tbody>
            {prospects.length > 0 &&
              prospects.map((prospect: IProspect, i: number) => {
                if (!seeArchive && prospect.prospect_status?.name === status) {
                  return (
                    <ProspectLine
                      color={color}
                      prospect={prospect}
                      key={i + status + prospect.id}
                      seeArchive={seeArchive}
                    />
                  );
                } else if (seeArchive) {
                  return (
                    <ProspectLine
                      color={color}
                      prospect={prospect}
                      key={i + status + prospect.id}
                      seeArchive={seeArchive}
                    />
                  );
                }
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LineContainer;
