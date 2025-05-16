
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Users, Plus, Download, Printer } from 'lucide-react';
import { mockApi, Guest } from '../services/mockApi';
import { useAuth } from '../contexts/AuthContext';

const Guests: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchGuests = async () => {
      setIsLoading(true);
      try {
        const data = await mockApi.getGuests();
        setGuests(data);
      } catch (error) {
        console.error('Error fetching guests:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGuests();
  }, []);

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    guest.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStatus = (status: string) => {
    const statusMap: Record<string, { class: string, label: string }> = {
      'registered': { class: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100', label: 'Registered' },
      'checked-in': { class: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100', label: 'Checked In' },
      'no-show': { class: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100', label: 'No Show' },
    };
    
    const statusInfo = statusMap[status] || { class: 'bg-gray-100 text-gray-800', label: 'Unknown' };
    
    return (
      <span className={`status-pill ${statusInfo.class}`}>
        {statusInfo.label}
      </span>
    );
  };

  const exportCsv = () => {
    const headers = ['Name', 'Organization', 'Job Title', 'Email', 'Phone', 'Event', 'Registered', 'Status'];
    
    const csvData = guests.map(guest => [
      guest.name,
      guest.organization,
      guest.jobTitle,
      guest.contact.email,
      guest.contact.phone,
      'Event Name', // Would normally fetch event name from event ID
      guest.registered,
      guest.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'guests.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Guest Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage guest information and registrations
          </p>
        </div>
        
        {(user?.role === 'admin' || user?.role === 'organizer') && (
          <div className="flex gap-2 mt-4 md:mt-0">
            <button 
              onClick={exportCsv}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Download size={18} className="mr-1" />
              Export
            </button>
            
            <Link
              to="/guests/add"
              className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-4 py-2 rounded-md transition-colors"
            >
              <Plus size={18} className="mr-1" />
              New Guest
            </Link>
          </div>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search guests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <Filter size={18} className="mr-2" />
            <span>Filter</span>
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredGuests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Users size={48} className="text-gray-300 dark:text-gray-600 mb-3" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No guests found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Organization</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Job Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Registered</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">{guest.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {guest.organization}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {guest.jobTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div>{guest.contact.phone}</div>
                      <div>{guest.contact.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {guest.registered}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatus(guest.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end gap-4">
                        <button
                          onClick={() => window.open(`/print-badges?guestId=${guest.id}`, '_blank')}
                          className="text-gray-600 hover:text-gold transition-colors inline-flex items-center gap-1"
                          title="Print Badge"
                        >
                          <Printer size={16} />
                          <span className="sr-only">Print Badge</span>
                        </button>
                        <Link
                          to={`/guests/${guest.id}`}
                          className="text-gold hover:text-gold-dark font-medium"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guests;
