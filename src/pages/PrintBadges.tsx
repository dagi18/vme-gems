
import React, { useState } from 'react';
import { Printer, RotateCcw, Search, QrCode } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import EventBadge from '../components/EventBadge';

interface Guest {
  id: string;
  name: string;
  company: string;
  jobTitle: string;
  event: string;
  isPrinted: boolean;
}

// Mock data for badges
const initialGuests: Guest[] = [
  {
    id: 'a1f3e2b0-1d2c-4c21-9aa2-001',
    name: 'Eleni Tesfaye',
    company: 'Ethio Telecom',
    jobTitle: 'Marketing Manager',
    event: 'Annual Tech Conference 2025',
    isPrinted: true
  },
  {
    id: 'b4e7d0f1-5f6b-4e21-9134-002',
    name: 'Mulugeta Gebre',
    company: 'Hibret Bank',
    jobTitle: 'Operations Director',
    event: 'Marketing Summit',
    isPrinted: false
  },
  {
    id: 'c8a1d9a5-2b9e-462d-9940-003',
    name: 'Selam Haile',
    company: 'Addis Events',
    jobTitle: 'Event Coordinator',
    event: 'Product Launch',
    isPrinted: false
  },
  {
    id: 'd2f6b7c9-7c0a-49bb-b97a-004',
    name: 'Yonatan Alemu',
    company: 'Gebeya Inc',
    jobTitle: 'Software Engineer',
    event: 'Annual Tech Conference 2025',
    isPrinted: false
  },
  {
    id: 'e3a5c1b3-86f1-4719-8122-005',
    name: 'Hanna Mengistu',
    company: 'Lulit Beauty',
    jobTitle: 'Founder & CEO',
    event: 'Marketing Summit',
    isPrinted: true
  },
  {
    id: 'f4c9d7f0-2a45-44d0-9a67-006',
    name: 'Dagmawi Bekele',
    company: 'Zemen Bank',
    jobTitle: 'Finance Analyst',
    event: 'Product Launch',
    isPrinted: false
  },
  {
    id: 'g7e1a2b8-3e59-41f2-aee1-007',
    name: 'Rahel Yosef',
    company: 'Skyline Real Estate',
    jobTitle: 'Client Relations Officer',
    event: 'Annual Tech Conference 2025',
    isPrinted: false
  },
  {
    id: 'h6b2c4e3-8d4f-43de-9cc2-008',
    name: 'Abel Tibebu',
    company: 'Avod IT Solutions',
    jobTitle: 'IT Consultant',
    event: 'Marketing Summit',
    isPrinted: false
  },
  {
    id: 'i5d3a7c6-9f1e-45ab-9e90-009',
    name: 'Feven Tsegaye',
    company: 'Ministry of Health',
    jobTitle: 'Public Health Specialist',
    event: 'Product Launch',
    isPrinted: true
  },
  {
    id: 'j8c6b5f2-1e4f-4e4a-832b-010',
    name: 'Nahom Endale',
    company: 'Snap Addis',
    jobTitle: 'Photographer',
    event: 'Annual Tech Conference 2025',
    isPrinted: false
  }
];

// Mock event data
const eventData = {
  name: "Annual Tech Conference 2025",
  date: "Sunday, 25th of April 2025",
  time: "10h - 19h",
  location: "110 Avenue de la Marne, 56000 Vannes"
};

const PrintBadges: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    guest.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectGuest = (id: string) => {
    if (selectedGuests.includes(id)) {
      setSelectedGuests(selectedGuests.filter(guestId => guestId !== id));
    } else {
      setSelectedGuests([...selectedGuests, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedGuests.length === filteredGuests.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(filteredGuests.map(guest => guest.id));
    }
  };

  const handlePrint = () => {
    if (selectedGuests.length === 0) {
      toast({
        title: "No badges selected",
        description: "Please select at least one guest to print a badge.",
        variant: "destructive",
      });
      return;
    }

    // Update printed status
    const updatedGuests = guests.map(guest => {
      if (selectedGuests.includes(guest.id)) {
        return { ...guest, isPrinted: true };
      }
      return guest;
    });
    
    setGuests(updatedGuests);
    
    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const selectedGuestDetails = guests.filter(guest => selectedGuests.includes(guest.id));
      
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Badges</title>
            <style>
              @media print {
                body { margin: 0; padding: 0; }
                .badge-container { page-break-inside: avoid; break-inside: avoid; }
                .badge-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5in; }
                @page { size: portrait; margin: 0.5cm; }
                .print-ui { display: none !important; }
              }
              body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
              .badge-container { 
                width: 3.5in; 
                height: 5in; 
                margin: 0.25in auto; 
                background-color: white; 
                display: flex;
                flex-direction: column;
              }
              .name-section {
                padding: 24px 12px 8px;
                text-align: center;
              }
              .name-text {
                font-size: 28px;
                font-weight: bold;
                margin: 0;
              }
              .org-section {
                padding: 8px 12px;
                text-align: center;
              }
              .org-text {
                font-size: 18px;
                color: #444;
                margin: 0;
              }
              .title-section {
                padding: 8px 12px 16px;
                text-align: center;
              }
              .title-text {
                font-size: 20px;
                font-weight: bold;
                text-transform: uppercase;
                margin: 0;
              }
              .qr-section {
                padding: 16px;
                display: flex;
                justify-content: center;
                flex-grow: 1;
              }
              .badge-type {
                background-color: #1a56db;
                color: white;
                padding: 16px 0;
                text-align: center;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-size: 20px;
                margin-top: auto;
              }
              .print-ui { 
                position: fixed; 
                top: 0; 
                left: 0; 
                right: 0; 
                background: #f0f0f0; 
                padding: 10px; 
                text-align: center; 
                z-index: 1000; 
                box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
              }
              .print-button { 
                background-color: #1a56db; 
                color: white; 
                border: none; 
                padding: 10px 20px; 
                font-size: 16px; 
                border-radius: 4px; 
                cursor: pointer; 
              }
              .badge-grid { 
                display: flex; 
                flex-wrap: wrap; 
                justify-content: center; 
                gap: 20px; 
                padding: 20px; 
              }
            </style>
            <script>
              // Auto-print when loaded
              window.onload = function() {
                // Short delay to ensure content is rendered
                setTimeout(function() {
                  window.print();
                }, 500);
              };
            </script>
          </head>
          <body>
            <div class="print-ui">
              <button onclick="window.print()" class="print-button">Print Badges</button>
            </div>
            
            <div class="badge-grid">
      `);
      
      selectedGuestDetails.forEach(guest => {
        printWindow.document.write(`
          <div class="badge-container">
            <div class="name-section">
              <p class="name-text">${guest.name}</p>
            </div>
            
            <div class="org-section">
              <p class="org-text">${guest.company}</p>
            </div>
            
            <div class="title-section">
              <p class="title-text">${guest.jobTitle}</p>
            </div>
            
            <div class="qr-section">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(guest.id)}"
                alt="QR Code"
                width="180"
                height="180"
              />
            </div>
            
            <div class="badge-type">
              VISITOR
            </div>
          </div>
        `);
      });
      
      printWindow.document.write(`
            </div>
          </body>
        </html>
      `);
      
      printWindow.document.close();
    }
    
    toast({
      title: "Badges sent to printer",
      description: `${selectedGuests.length} badge(s) have been sent to the printer.`,
    });
    
    // Clear selection after printing
    setSelectedGuests([]);
  };

  const resetFilters = () => {
    setSearchTerm('');
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Print Badges</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Select an event and search for guests to print badges
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium mb-4">Filter Guests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                <option value="">Select an event</option>
                <option>Annual Tech Conference 2025</option>
                <option>Marketing Summit</option>
                <option>Product Launch</option>
              </select>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredGuests.length} guests
            </div>
            
            <button
              onClick={resetFilters}
              className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <RotateCcw size={14} className="mr-1" />
              Reset Filters
            </button>
          </div>
        </div>
        
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedGuests.length === filteredGuests.length && filteredGuests.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold dark:bg-gray-700"
                      />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Job Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Event</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedGuests.includes(guest.id)}
                        onChange={() => toggleSelectGuest(guest.id)}
                        className="h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold dark:bg-gray-700"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">{guest.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {guest.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {guest.jobTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {guest.event}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-pill ${guest.isPrinted ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'}`}>
                        {guest.isPrinted ? 'Printed' : 'Not Printed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => {
                          setSelectedGuests([guest.id]);
                          handlePrint();
                        }}
                        className="text-gold hover:text-gold-dark font-medium"
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {selectedGuests.length} guests selected
            </div>
            
            <button
              onClick={handlePrint}
              disabled={selectedGuests.length === 0}
              className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white ${
                selectedGuests.length > 0 ? 'bg-gold hover:bg-gold-dark' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <Printer size={18} className="mr-2" />
              Print Selected ({selectedGuests.length})
            </button>
          </div>
        </div>
      </div>
      
      {/* Badge Preview Section */}
      {selectedGuests.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Badge Preview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedGuests.slice(0, 1).map(id => {
              const guest = guests.find(g => g.id === id);
              if (!guest) return null;
              
              return (
                <div key={guest.id} className="flex justify-center">
                  <EventBadge 
                    name={guest.name}
                    type={guest.jobTitle}
                    title={guest.jobTitle}
                    organization={guest.company}
                    date={eventData.date}
                    time={eventData.time}
                    location={eventData.location}
                    qrValue={guest.id}
                  />
                </div>
              );
            })}
            
            {selectedGuests.length > 1 && (
              <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex items-center justify-center p-6">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <span className="block font-medium text-lg mb-1">+{selectedGuests.length - 1} more badge(s)</span>
                  <span className="block text-sm">Click print to generate all selected badges</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintBadges;
