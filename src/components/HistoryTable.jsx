import moment from 'moment'

function HistoryTable({ history }) {

    const epochToHumanRead=(epoch)=> {
        let t = new Date( epoch );
        return moment(t).format("DD.MM.YYYY hh:MM:ss");
    }
  return <div>
        <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select className="appearance-none h-full rounded-l border border-gray-400 bg-white py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-gray-500">
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="block relative">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                <path d="M10 2a8 8 0 106.32 3.16L17.1 4a10 10 0 11-1.12 1.12l-1.2 1.2A8 8 0 0010 2zm0 18a8 8 0 100-16 8 8 0 000 16zm4-6H6a1 1 0 010-2h8a1 1 0 010 2z" />
              </svg>
            </span>
            <input placeholder="Search" className="appearance-none rounded-r border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Source</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Question</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categories</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ticket Id</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Received on</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img className="w-full h-full rounded-full" src="https://via.placeholder.com/150" alt="Avatar" />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">{item.source}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{item.question}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {item.categories.map((category, index) => (
                        <div key={index} className="text-gray-900 whitespace-no-wrap">
                          {category}
                        </div>
                      ))}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{item.ticketId?? '-'}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${item.status === 'Active' ? 'text-green-900' : 'text-yellow-900'}`}>
                        <span aria-hidden="true" className={`absolute inset-0 opacity-50 rounded-full ${item.status === 'Active' ? 'bg-green-200' : 'bg-yellow-200'}`}></span>
                        <span className="relative">{epochToHumanRead(item.createdAt)}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${item.status === 'Active' ? 'text-green-900' : 'text-yellow-900'}`}>
                        <span aria-hidden="true" className={`absolute inset-0 opacity-50 rounded-full ${item.status === 'Active' ? 'bg-green-200' : 'bg-yellow-200'}`}></span>
                        <span className="relative">{epochToHumanRead(item.createdAt)}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">Showing 1 to 2 of 2 Entries</span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button className="text-sm text-white bg-gray-900 hover:bg-gray-700 rounded-l-md px-4 py-2">Prev</button>
                <button className="text-sm text-white bg-gray-900 hover:bg-gray-700 rounded-r-md px-4 py-2">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default HistoryTable;
