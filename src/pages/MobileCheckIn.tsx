
import React, { useState } from 'react';
import { Search, CheckCircle, QrCode, User, UserCheck, Smartphone } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

// Mock data for check-ins
interface Guest {
  id: string;
  name: string;
  email: string;
  company: string;
  checkedIn: boolean;
  checkInTime?: string;
}

const initialGuests: Guest[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', company: 'Tech Co', checkedIn: true, checkInTime: '09:15 AM' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', company: 'Design Inc', checkedIn: false },
  { id: '3', name: 'Carol Williams', email: 'carol@example.com', company: 'Marketing LLC', checkedIn: false },
  { id: '4', name: 'Dave Brown', email: 'dave@example.com', company: 'Finance Corp', checkedIn: true, checkInTime: '09:32 AM' },
  { id: '5', name: 'Eve Davis', email: 'eve@example.com', company: 'Sales Group', checkedIn: false },
];

const MobileCheckIn: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [scanning, setScanning] = useState(false);
  const [manualCheckIn, setManualCheckIn] = useState(false);
  const { toast } = useToast();
  
  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    guest.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    guest.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckIn = (id: string) => {
    setGuests(prevGuests => 
      prevGuests.map(guest => 
        guest.id === id 
          ? { 
              ...guest, 
              checkedIn: true, 
              checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          : guest
      )
    );
    
    toast({
      title: "Guest Checked In",
      description: "Guest has been successfully checked in.",
    });
  };

  const startScanning = () => {
    setScanning(true);
    
    // Simulate QR code scan after 2 seconds
    setTimeout(() => {
      // Find first guest that isn't checked in yet
      const guestToCheckIn = guests.find(guest => !guest.checkedIn);
      
      if (guestToCheckIn) {
        handleCheckIn(guestToCheckIn.id);
        
        // Show QR success screen
        setScanning(false);
        
        toast({
          title: "QR Code Scanned",
          description: `${guestToCheckIn.name} has been checked in.`,
          variant: "default",
        });
      } else {
        setScanning(false);
      }
    }, 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Mobile Check-In</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Scan QR codes or manually check in guests
        </p>
      </div>
      
      {/* Event selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Event
          </label>
          <select 
            className="w-full md:w-96 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="">Select an event to check in guests</option>
            <option value="1">Annual Tech Conference 2025</option>
            <option value="2">Product Launch</option>
            <option value="3">Marketing Workshop</option>
          </select>
        </div>
        
        {selectedEvent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QR Code Scanner */}
            <div 
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => !scanning && startScanning()}
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <QrCode size={32} className="text-gold" />
              </div>
              <h3 className="text-lg font-medium mb-2">QR Code Check-In</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
                Scan a guest's QR code to quickly check them in
              </p>
              <button 
                className="px-4 py-2 bg-gold hover:bg-gold-dark text-white rounded-md transition-colors"
                onClick={startScanning}
              >
                Start Scanning
              </button>
              
              {scanning && (
                <div className="mt-4">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="w-48 h-48 border-2 border-gold/50 relative">
                      <div className="absolute inset-0 border-t-2 border-gold animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gold text-sm">Scanning...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Manual Check-In */}
            <div 
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setManualCheckIn(true)}
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <User size={32} className="text-gold" />
              </div>
              <h3 className="text-lg font-medium mb-2">Manual Check-In</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
                Search and select a guest to manually check them in
              </p>
              <button 
                className="px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-white rounded-md transition-colors"
                onClick={() => setManualCheckIn(true)}
              >
                Find Guest
              </button>
            </div>
          </div>
        )}
      </div>
      
      {manualCheckIn && selectedEvent && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium mb-4">Find Guest</h2>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email or organization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check-in Time</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">{guest.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {guest.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {guest.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-pill ${guest.checkedIn ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'}`}>
                        {guest.checkedIn ? 'Checked In' : 'Not Checked In'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {guest.checkInTime || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {!guest.checkedIn ? (
                        <button
                          onClick={() => handleCheckIn(guest.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold hover:bg-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold"
                        >
                          <UserCheck size={16} className="mr-1" />
                          Check In
                        </button>
                      ) : (
                        <span className="inline-flex items-center text-green-600 dark:text-green-400">
                          <CheckCircle size={16} className="mr-1" />
                          Checked In
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredGuests.length === 0 && (
              <div className="py-8 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <Smartphone size={48} className="mb-3 text-gray-300 dark:text-gray-600" />
                <p>No matching guests found.</p>
                <button
                  onClick={() => {
                    // Handle on-site registration
                    toast({
                      title: "On-site Registration",
                      description: "You can register new guests directly at the event.",
                    });
                  }}
                  className="mt-3 text-gold hover:text-gold-dark"
                >
                  Register a new guest on-site
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Check-in Stats Summary */}
      {selectedEvent && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Check-in Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Guests</div>
              <div className="text-2xl font-bold">{guests.length}</div>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Checked In</div>
              <div className="text-2xl font-bold">{guests.filter(g => g.checkedIn).length}</div>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Check-in Rate</div>
              <div className="text-2xl font-bold">
                {Math.round((guests.filter(g => g.checkedIn).length / guests.length) * 100)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileCheckIn;
