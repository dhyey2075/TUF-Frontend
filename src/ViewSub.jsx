import React, { useState, useEffect } from 'react'
import { IoMdClose } from "react-icons/io";

const ViewSub = () => {

    const [entries, setEntries] = useState([]);
    const [username, setUsername] = useState('');

    const handleInputChange = (e) => {
        setUsername(e.target.value);
        console.log('Username:', e.target.value);  
      };
    
      const handleViewClick = () => {
        fetchEntries();
      };

    const fetchEntries = async () => {
        try {
          const res = await fetch(`https://d5ttvtw2-3000.inc1.devtunnels.ms/getbyuser?username=${username}`);
          const data = await res.json();
          
          // Log the data to debug
          console.log('Fetched entries:', data.submissions);
          
          if (Array.isArray(data.submissions)) {
            setEntries(data.submissions);
          } else {
            console.error('Fetched data is not an array:', data);
          }
        } catch (error) {
          console.error('Error fetching entries:', error);
        }
      };
    
      


    return (
        <div>
            <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <div className="max-w-full w-full p-8 bg-white shadow-lg rounded-lg mx-20">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Submitted Entries</h1>
                    <div className="flex items-center justify-center mb-8">
                        <input
                            type="text"
                            value={username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                            onClick={handleViewClick}
                            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200"
                        >
                            View
                        </button>
                    </div>
                    {entries.length>0 && <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Sr. No.
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Username
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Code Language
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Standard Input (stdin)
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Source Code (First 100 characters)
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Submitted At
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {entries.map((entry, index=0) => (
                                    <tr key={entry._id} className="hover:bg-gray-100 transition-colors duration-200">
                                        <td className="text-xl px-6 py-4 whitespace-nowrap text-gray-500">{index+1}</td>
                                        <td className="text-xl px-6 py-4 whitespace-nowrap font-medium text-gray-900">{entry.username}</td>
                                        <td className="text-xl px-6 py-4 whitespace-nowrap text-gray-500">{entry.preferredLanguage}</td>
                                        <td className="text-xl px-6 py-4 whitespace-nowrap text-gray-500">{entry.stdin === ""?<IoMdClose />:entry.stdin}</td>
                                        <td className="text-xl px-6 py-4 whitespace-nowrap text-gray-500">{entry.sourceCode.slice(0, 100)}</td>
                                        <td className="text-xl px-6 py-4 whitespace-nowrap text-gray-500">{(new Date(entry.submittedAt.toString())).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                    {entries.length<1 && username && <div><h1 className='text-center text-xl'>User has not submitted any code.</h1></div>}
                    {!username && <div><h1 className='text-center text-xl'>Enter a username to view submissions.</h1></div>}
                </div>
            </div>
        </div>
    )
}

export default ViewSub