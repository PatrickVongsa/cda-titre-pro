import { FaMailBulk, FaPhone } from "react-icons/fa";

interface IProps {
  prospect: IProspect;
  color: string;
}

function ProspectLine({ color , prospect }: IProps) {
  return (
    <>
      <tr>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
          <img src={''} className="h-12 w-12 bg-white rounded-full border" alt="..."></img>{' '}
          <span
            className={
              'ml-3 font-bold ' + +(color === 'light' ? 'text-blue-gray-600' : 'text-white')
            }
          >
            {prospect.company_name}
          </span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <p className="flex items-center gap-2 mb-2"><FaPhone /> {prospect.phone}</p>
          <p className="flex items-center gap-2"><FaMailBulk /> {prospect.email}</p>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex">
            <img
              src={''}
              alt="..."
              className="w-10 h-10 rounded-full border-2 border-blue-gray-50 shadow"
            ></img>
            <img
              src={''}
              alt="..."
              className="w-10 h-10 rounded-full border-2 border-blue-gray-50 shadow -ml-4"
            ></img>
            <img
              src={''}
              alt="..."
              className="w-10 h-10 rounded-full border-2 border-blue-gray-50 shadow -ml-4"
            ></img>
          </div>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex items-center">
            <span className="mr-2">60%</span>
            <div className="relative w-full">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                <div
                  style={{ width: '60%' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                ></div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ProspectLine;
