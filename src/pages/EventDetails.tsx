
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Tag,
  CheckSquare,
  Printer,
  User,
  Share2,
  Upload,
  Download,
  Search,
  Filter,
  CheckCircle
} from 'lucide-react';
import { mockApi, Guest, Event } from '../services/mockApi';
import { useToast } from '../hooks/use-toast';
import GuestCsvImporter from '../components/GuestCsvImporter';
import EventBadge from '../components/EventBadge';

const EventDetails = () => {
  const { eventId } = useParams();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showImporter, setShowImporter] = useState(false);
  
  // Fetch event and guests data
  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true);
      try {
        if (!eventId) return;
        
        const eventData = await mockApi.getEvent(eventId);
        if (eventData) {
          setEvent(eventData);
          
          // Fetch guests for this event
          const guestData = await mockApi.getGuestsByEvent(eventId);
          setGuests(guestData);
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load event data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEventData();
  }, [eventId, toast]);
  
  // Handle CSV import success
  const handleImportSuccess = async (importedGuests: Omit<Guest, 'id'>[]) => {
    setIsImporting(true);
    try {
      // Add eventId to each guest if not already present
      const guestsWithEventId = importedGuests.map(guest => ({
        ...guest,
        eventId: eventId || ''
      }));
      
      // Call API to import guests
      const newGuests = await mockApi.importGuests(guestsWithEventId);
      
      // Update local state
      setGuests(prev => [...prev, ...newGuests]);
      setShowImporter(false);
      
      // Update event guest count in UI
      if (event) {
        setEvent({
          ...event,
          guests: event.guests + newGuests.length
        });
      }
    } catch (error) {
      console.error('Error importing guests:', error);
      toast({
        title: 'Import Error',
        description: 'Failed to import guests. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsImporting(false);
    }
  };
  
  // Toggle guest selection for badge printing
  const toggleSelectGuest = (id: string) => {
    if (selectedGuests.includes(id)) {
      setSelectedGuests(selectedGuests.filter(guestId => guestId !== id));
    } else {
      setSelectedGuests([...selectedGuests, id]);
    }
  };
  
  // Toggle select all guests
  const toggleSelectAll = () => {
    if (selectedGuests.length === filteredGuests.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(filteredGuests.map(guest => guest.id));
    }
  };
  
  // Handle badge printing
  const handlePrintBadges = async () => {
    if (selectedGuests.length === 0) {
      toast({
        title: 'No guests selected',
        description: 'Please select at least one guest to print badges.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsPrinting(true);
    try {
      // Call API to print badges
      await mockApi.printGuestBadges(selectedGuests);
      
      // Create a print-friendly window
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
                  .badge { width: 3.5in; height: 5in; margin: 0.25in; }
                  .badge-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5in; }
                  @page { size: portrait; margin: 0.5cm; }
                  .print-ui { display: none !important; }
                }
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                .badge { 
                  background-color: white; 
                  display: flex;
                  flex-direction: column;
                  height: 100%;
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
                ${selectedGuestDetails.map(guest => `
                  <div class="badge-container">
                    <div class="badge">
                      <div class="name-section">
                        <p class="name-text">${guest.name}</p>
                      </div>
                      
                      <div class="org-section">
                        <p class="org-text">${guest.organization}</p>
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
                  </div>
                `).join('')}
              </div>
            </body>
          </html>
        `);
        
        printWindow.document.close();
      }
      
      toast({
        title: 'Badges Ready',
        description: `${selectedGuests.length} badges prepared for printing.`,
        variant: 'default',
      });
      
      // Reset selection after printing
      setSelectedGuests([]);
    } catch (error) {
      console.error('Error printing badges:', error);
      toast({
        title: 'Print Error',
        description: 'Failed to print badges. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsPrinting(false);
    }
  };
  
  // Filter guests based on search term
  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Use event data if available, otherwise use placeholder
  const eventDetails = event ? {
    id: event.id,
    title: event.name,
    date: event.date,
    location: event.location,
    startTime: '9:00 AM', // These could be added to the Event interface
    endTime: '5:00 PM',
    attendees: event.guests,
    registered: event.guests,
    checkedIn: Math.floor(event.guests * 0.7), // Placeholder
    description: event.description || '',
    organizer: 'TechEvents Inc.', // Placeholder
    status: event.status,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80'
  } : {
    id: eventId || '1',
    title: 'Loading...',
    date: '',
    location: '',
    startTime: '',
    endTime: '',
    attendees: 0,
    registered: 0,
    checkedIn: 0,
    description: '',
    organizer: '',
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80'
  };

  return (
    <div className="animate-enter space-y-6">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{eventDetails.title}</h1>
          <div className="flex items-center mt-2 text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-3">{eventDetails.date}</span>
            <MapPin className="h-4 w-4 mr-1" />
            <span>{eventDetails.location}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            Assign Staff
          </Button>
          <Button size="sm" className="bg-gold hover:bg-gold-dark">
            <Share2 className="h-4 w-4 mr-2" />
            Share Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Attendees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventDetails.attendees}</div>
            <p className="text-xs text-gray-500">Registered: {eventDetails.registered}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Check-Ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventDetails.checkedIn}</div>
            <p className="text-xs text-gray-500">{Math.round((eventDetails.checkedIn / eventDetails.registered) * 100)}% of registered</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Event Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {eventDetails.startTime} - {eventDetails.endTime}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full max-w-xl grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="attendees">Attendees</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="checkin">Check-in</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{eventDetails.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <h3 className="font-semibold">Event Details</h3>
                  <ul className="space-y-2 mt-2">
                    <li className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-500 w-24">Organizer:</span> 
                      <span>{eventDetails.organizer}</span>
                    </li>
                    <li className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-500 w-24">Status:</span> 
                      <span className="capitalize">{eventDetails.status}</span>
                    </li>
                    <li className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-500 w-24">Event ID:</span> 
                      <span>{eventDetails.id}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold">Actions</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      <CheckSquare className="h-4 w-4 mr-2" />
                      Manage Registration
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Printer className="h-4 w-4 mr-2" />
                      Print Event Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Event Image</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src={eventDetails.image} 
                alt={eventDetails.title} 
                className="w-full h-48 object-cover rounded-md" 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attendees" className="pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Attendee Management</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowImporter(!showImporter)}
                className="flex items-center gap-2"
              >
                <Upload size={16} />
                {showImporter ? 'Hide Importer' : 'Import Guests'}
              </Button>
            </div>
          </div>

          {showImporter && (
            <Card>
              <CardHeader>
                <CardTitle>Import Guest List</CardTitle>
                <CardDescription>
                  Upload a CSV file with guest information to add them to this event
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GuestCsvImporter 
                  eventId={eventId || ''} 
                  onImportSuccess={handleImportSuccess} 
                />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Attendee List</CardTitle>
              <div className="text-sm text-muted-foreground">
                {guests.length} {guests.length === 1 ? 'guest' : 'guests'}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md"
                    type="text"
                    placeholder="Search guests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="flex items-center">
                  <Filter size={18} className="mr-2" />
                  Filter
                </Button>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : filteredGuests.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Users size={48} className="text-gray-300 dark:text-gray-600 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No guests found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {guests.length > 0 ? 'Try adjusting your search or filters' : 'Import guests using the Import button above'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-2 py-3 text-left">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300"
                              checked={selectedGuests.length === filteredGuests.length && filteredGuests.length > 0}
                              onChange={toggleSelectAll}
                            />
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Organization</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Job Title</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Registered</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredGuests.map((guest) => (
                        <tr key={guest.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-2 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300"
                                checked={selectedGuests.includes(guest.id)}
                                onChange={() => toggleSelectGuest(guest.id)}
                              />
                            </div>
                          </td>
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
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${guest.status === 'checked-in' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : guest.status === 'no-show' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'}`}>
                              {guest.status === 'checked-in' ? 'Checked In' : guest.status === 'no-show' ? 'No Show' : 'Registered'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {filteredGuests.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedGuests.length} of {filteredGuests.length} guests selected
                  </div>
                  
                  <Button
                    onClick={handlePrintBadges}
                    disabled={selectedGuests.length === 0 || isPrinting}
                    className="bg-gold hover:bg-gold-dark text-white"
                  >
                    <Printer size={18} className="mr-2" />
                    {isPrinting ? 'Preparing...' : `Print Badges (${selectedGuests.length})`}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="badges" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Badge Management</CardTitle>
              <CardDescription>
                Design and print badges for event attendees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Badge Preview</h3>
                  
                  {guests.length > 0 ? (
                    <div className="flex justify-center">
                      <EventBadge 
                        name={guests[0].name}
                        type="ATTENDEE"
                        title={guests[0].jobTitle}
                        organization={guests[0].organization}
                        date={eventDetails.date}
                        location={eventDetails.location}
                        qrValue={guests[0].id}
                      />
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400">No guests available for preview</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Badge Options</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Badge Actions</p>
                      <div className="flex flex-col gap-2">
                        <Button 
                          variant="outline" 
                          className="justify-start"
                          onClick={() => {
                            if (guests.length > 0) {
                              setSelectedGuests([guests[0].id]);
                              handlePrintBadges();
                            } else {
                              toast({
                                title: 'No guests available',
                                description: 'Add guests to this event first',
                                variant: 'destructive',
                              });
                            }
                          }}
                          disabled={guests.length === 0 || isPrinting}
                        >
                          <Printer size={16} className="mr-2" />
                          Print Sample Badge
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="justify-start"
                          onClick={() => {
                            if (guests.length > 0) {
                              setSelectedGuests(guests.map(g => g.id));
                              handlePrintBadges();
                            } else {
                              toast({
                                title: 'No guests available',
                                description: 'Add guests to this event first',
                                variant: 'destructive',
                              });
                            }
                          }}
                          disabled={guests.length === 0 || isPrinting}
                        >
                          <Printer size={16} className="mr-2" />
                          Print All Badges ({guests.length})
                        </Button>
                        
                        <Link to="/guests/import">
                          <Button variant="outline" className="w-full justify-start">
                            <Upload size={16} className="mr-2" />
                            Import Guest List
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium mb-2">Badge Statistics</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total Guests</p>
                          <p className="text-2xl font-bold">{guests.length}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Badges Printed</p>
                          <p className="text-2xl font-bold">{guests.filter(g => g.status === 'checked-in').length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="checkin" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Check-in Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Check-in processes and QR code scanning would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventDetails;
