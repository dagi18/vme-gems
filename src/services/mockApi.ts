
import { format, addDays, subDays } from 'date-fns';

// Types
export interface Event {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  maxGuest: number;
  registrationDeadline?: string;
  status: 'draft' | 'overview' | 'approved' | 'published' | 'completed' | 'canceled';
  eventTypeId: string;
  eventCategoryId: string;
}

export interface Guest {
  id: string;
  name: string;
  phone: string;
  email?: string;
  organization: string;
  jobTitle: string;
}

export interface GuestType {
  id: string;
  name: string;
  note: string;
}

export interface Booking {
  id: string;
  eventId: string;
  guestId: string;
  guestTypeId: string;
  expiration: string;
  checkedInTimestamp?: string;
  badgeTemplateId?: string;
}

export interface BadgeTemplate {
  id: string;
  template: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  address: string;
  tinNumber: string;
  phone: string;
  contactPersonIds: string[];
}

export interface ContactPerson {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface EventType {
  id: string;
  name: string;
}

export interface EventCategory {
  id: string;
  name: string;
}

export interface EventReporting {
  id: string;
  eventId: string;
  attendedGuestIds: string[];
  registeredGuestIds: string[];
}

export interface Approval {
  id: string;
  name: string;
  type: 'event' | 'vendor';
  description: string;
  date: string;
  location: string;
  maxGuests: number;
  createdOn: string;
  status: 'draft' | 'pending';
}

export interface StatsSummary {
  totalEvents: number;
  totalGrowth: number;
  upcomingEvents: number;
  nextEventDays: number;
  registeredGuests: number;
  guestsGrowth: number;
  badgesPrinted: number;
  badgesPercentage: number;
  weeklyAttendance?: {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
  };
}

// Mock data generator
const today = new Date();
const formatDate = (date: Date): string => format(date, 'MMM d, yyyy');

// Mock events data
const eventTypes: EventType[] = [
  { id: '1', name: 'Conference' },
  { id: '2', name: 'Workshop' },
  { id: '3', name: 'Seminar' },
  { id: '4', name: 'Product Launch' }
];

const eventCategories: EventCategory[] = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Business' },
  { id: '3', name: 'Marketing' },
  { id: '4', name: 'Insurance' }
];



const contactPersons: ContactPerson[] = [
  {
    id: 'cp1',
    firstName: 'Nathalie',
    lastName: 'Tueno',
    phone: '+237000000001',
    email: 'nathalie.tueno@aio.org'
  }
];

const events: Event[] = [
  {
    id: '1',
    vendorId: '1',
    name: '51st Conference & Annual General Assembly (AIO 2025)',
    startDate: '2025-05-26',
    endDate: '2025-05-28',
    location: 'Addis Ababa, Ethiopia',
    status: 'published',
    maxGuest: 500,
    description: 'The 51st Conference & Annual General Assembly of the African Insurance Organization (AIO) will be held in Addis Ababa, Ethiopia. The event brings together insurance professionals, organizations, and stakeholders from across Africa and beyond to discuss industry trends, challenges, and opportunities.',
    eventTypeId: '1',
    eventCategoryId: '4'
  },
  {
    id: '7',
    name: 'Annual Tech Conference',
    date: format(addDays(today, 30), 'MMM dd, yyyy') + ' - ' + format(addDays(today, 32), 'MMM dd, yyyy'),
    location: 'Convention Center',
    status: 'published',
    guests: 120,
    maxGuests: 200,
    description: 'Join us for the biggest tech conference of the year featuring keynotes, workshops, and networking opportunities.'
  },
  {
    id: '2',
    name: 'Product Launch',
    date: format(addDays(today, 13), 'MMM dd, yyyy'),
    location: 'Grand Hotel',
    status: 'approved',
    guests: 75,
    maxGuests: 100,
    description: 'Exclusive product launch event for our newest innovation.'
  },
  {
    id: '3',
    name: 'Marketing Workshop',
    date: format(addDays(today, 25), 'MMM dd, yyyy') + ' - ' + format(addDays(today, 26), 'MMM dd, yyyy'),
    location: 'Business Center',
    status: 'draft',
    guests: 30,
    maxGuests: 50,
    description: 'Learn the latest marketing strategies and techniques.'
  },
  {
    id: '4',
    name: 'Charity Gala',
    date: format(addDays(today, 65), 'MMM dd, yyyy'),
    location: 'Luxury Hotel',
    status: 'overview',
    guests: 0,
    maxGuests: 300,
    description: 'Annual fundraising gala for local charities.'
  },
  {
    id: '5',
    name: 'Team Building Retreat',
    date: format(addDays(today, 80), 'MMM dd, yyyy') + ' - ' + format(addDays(today, 82), 'MMM dd, yyyy'),
    location: 'Mountain Resort',
    status: 'draft',
    guests: 0,
    maxGuests: 40,
    description: 'Company retreat focused on team building and strategy.'
  }
];

// Mock guests data
const guestTypes: GuestType[] = [
  { id: '1', name: 'Regular', note: 'Standard registration' },
  { id: '2', name: 'VIP', note: 'VIP access and benefits' },
  { id: '3', name: 'Speaker', note: 'Event speaker' },
  { id: '4', name: 'Student', note: 'Student discount applies' }
];

const badgeTemplates: BadgeTemplate[] = [
  { id: '1', template: 'Regular badge template' },
  { id: '2', template: 'VIP badge template' },
  { id: '3', template: 'Speaker badge template' }
];

const guests: Guest[] = [
  {
    id: 'aio-001',
    name: 'Nathalie Tueno Epse Kamga',
    organization: 'African Insurance Organization',
    jobTitle: 'Organizer',
    phone: '+237000000001',
    email: 'nathalie.kamga@aio.org'
  },
  {
    id: 'a1f3e2b0-1d2c-4c21-9aa2-001',
    name: 'Eleni Tesfaye',
    organization: 'Ethio Telecom',
    jobTitle: 'Marketing Manager',
    contact: { 
      phone: '+251911000001', 
      email: 'eleni.tesfaye@ethio-telecom.com' 
    },
    eventId: '1',
    registered: format(subDays(today, 4), 'MMM d, yyyy'),
    status: 'registered'
  },
  {
    id: 'b4e7d0f1-5f6b-4e21-9134-002',
    name: 'Mulugeta Gebre',
    organization: 'Hibret Bank',
    jobTitle: 'Operations Director',
    contact: { 
      phone: '+251911000002', 
      email: 'mulugeta.gebre@hibretbank.com' 
    },
    eventId: '1',
    registered: format(subDays(today, 5), 'MMM d, yyyy'),
    status: 'checked-in'
  },
  {
    id: 'c8a1d9a5-2b9e-462d-9940-003',
    name: 'Selam Haile',
    organization: 'Addis Events',
    jobTitle: 'Event Coordinator',
    contact: { 
      phone: '+251911000003', 
      email: 'selam.haile@addisevents.com' 
    },
    eventId: '2',
    registered: format(subDays(today, 6), 'MMM d, yyyy'),
    status: 'registered'
  },
  {
    id: 'd2f6b7c9-7c0a-49bb-b97a-004',
    name: 'Yonatan Alemu',
    organization: 'Gebeya Inc',
    jobTitle: 'Software Engineer',
    contact: { 
      phone: '+251911000004', 
      email: 'yonatan.alemu@gebeya.com' 
    },
    eventId: '2',
    registered: format(subDays(today, 7), 'MMM d, yyyy'),
    status: 'no-show'
  },
  {
    id: 'e3a5c1b3-86f1-4719-8122-005',
    name: 'Hanna Mengistu',
    organization: 'Lulit Beauty',
    jobTitle: 'Founder & CEO',
    contact: { 
      phone: '+251911000005', 
      email: 'hanna.mengistu@lulitbeauty.com' 
    },
    eventId: '3',
    registered: format(subDays(today, 8), 'MMM d, yyyy'),
    status: 'checked-in'
  },
  {
    id: 'f4c9d7f0-2a45-44d0-9a67-006',
    name: 'Dagmawi Bekele',
    organization: 'Zemen Bank',
    jobTitle: 'Finance Analyst',
    contact: { 
      phone: '+251911000006', 
      email: 'dagmawi.bekele@zemenbank.com' 
    },
    eventId: '1',
    registered: format(subDays(today, 9), 'MMM d, yyyy'),
    status: 'registered'
  },
  {
    id: 'g7e1a2b8-3e59-41f2-aee1-007',
    name: 'Rahel Yosef',
    organization: 'Skyline Real Estate',
    jobTitle: 'Client Relations Officer',
    contact: { 
      phone: '+251911000007', 
      email: 'rahel.yosef@skyline.et' 
    },
    eventId: '2',
    registered: format(subDays(today, 10), 'MMM d, yyyy'),
    status: 'registered'
  },
  {
    id: 'h6b2c4e3-8d4f-43de-9cc2-008',
    name: 'Abel Tibebu',
    organization: 'Avod IT Solutions',
    jobTitle: 'IT Consultant',
    contact: { 
      phone: '+251911000008', 
      email: 'abel.tibebu@avodit.com' 
    },
    eventId: '3',
    registered: format(subDays(today, 11), 'MMM d, yyyy'),
    status: 'checked-in'
  },
  {
    id: 'i5d3a7c6-9f1e-45ab-9e90-009',
    name: 'Feven Tsegaye',
    organization: 'Ministry of Health',
    jobTitle: 'Public Health Specialist',
    contact: { 
      phone: '+251911000009', 
      email: 'feven.tsegaye@moh.gov.et' 
    },
    eventId: '1',
    registered: format(subDays(today, 12), 'MMM d, yyyy'),
    status: 'no-show'
  },
  {
    id: 'j8c6b5f2-1e4f-4e4a-832b-010',
    name: 'Nahom Endale',
    organization: 'Snap Addis',
    jobTitle: 'Photographer',
    contact: { 
      phone: '+251911000010', 
      email: 'nahom.endale@snapaddis.com' 
    },
    eventId: '2',
    registered: format(subDays(today, 13), 'MMM d, yyyy'),
    status: 'registered'
  }
];

// Mock vendors data
// Mock vendors data
const vendors: Vendor[] = [
  {
    id: '1',
    name: 'African Insurance Organization',
    email: 'contact@aio.org',
    address: 'Cameroon, Yaoundé',
    tinNumber: 'TIN123456',
    phone: '+237000000000',
    contactPersonIds: ['cp1', 'cp2']
  },
  {
    id: '2',
    name: 'TechEvents Inc.',
    contact: { 
      phone: '+1 (555) 123-4567', 
      email: 'contact@techevents.com' 
    },
    tinNumber: '12-3456789',
    contactPersons: 2,
    created: format(subDays(today, 34), 'MMM d, yyyy')
  },
  {
    id: '2',
    name: 'Conference Solutions',
    contact: { 
      phone: '+1 (555) 234-5678', 
      email: 'info@conferencesolutions.com' 
    },
    tinNumber: '23-4567890',
    contactPersons: 1,
    created: format(subDays(today, 29), 'MMM d, yyyy')
  },
  {
    id: '3',
    name: 'Event Masters',
    contact: { 
      phone: '+1 (555) 345-6789', 
      email: 'hello@eventmasters.com' 
    },
    tinNumber: '34-5678901',
    contactPersons: 3,
    created: format(subDays(today, 25), 'MMM d, yyyy')
  },
  {
    id: '4',
    name: 'Global Events',
    contact: { 
      phone: '+1 (555) 456-7890', 
      email: 'support@globalevents.com' 
    },
    tinNumber: '45-6789012',
    contactPersons: 2,
    created: format(subDays(today, 20), 'MMM d, yyyy')
  }
];

// Mock approvals data
const approvals: Approval[] = [
  {
    id: '1',
    name: 'Annual Tech Conference',
    type: 'event',
    description: 'Join us for the biggest tech conference of the year featuring keynotes, workshops, and networking opportunities.',
    date: format(addDays(today, 30), 'MMM dd, yyyy') + ' - ' + format(addDays(today, 32), 'MMM dd, yyyy'),
    location: 'Convention Center, 123 Main St, City',
    maxGuests: 200,
    createdOn: format(subDays(today, 7), 'MMM d, yyyy'),
    status: 'draft'
  },
  {
    id: '2',
    name: 'Product Launch',
    type: 'event',
    description: 'Exclusive product launch event for our newest innovation.',
    date: format(addDays(today, 13), 'MMM dd, yyyy'),
    location: 'Grand Hotel, Downtown',
    maxGuests: 100,
    createdOn: format(subDays(today, 14), 'MMM d, yyyy'),
    status: 'pending'
  }
];

// Stats for dashboard
const stats: StatsSummary = {
  totalEvents: 12,
  totalGrowth: 2,
  upcomingEvents: 4,
  nextEventDays: 3,
  registeredGuests: 342,
  guestsGrowth: 28,
  badgesPrinted: 289,
  badgesPercentage: 83.1,
  weeklyAttendance: {
    monday: 45,
    tuesday: 62,
    wednesday: 78,
    thursday: 56,
    friday: 89
  }
};

// Analytics data
export const analyticsData = {
  attendance: {
    jan: 120,
    feb: 235,
    mar: 180,
    apr: 305,
    may: 285,
  },
  guestTypes: {
    new: 65,
    returning: 35,
  },
};

// API service
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service
const bookings: Booking[] = [
  {
    id: 'b1',
    eventId: '1',
    guestId: 'aio-001',
    guestTypeId: '3',
    expiration: '2025-05-28',
    badgeTemplateId: '3'
  }
];

const eventReports: EventReporting[] = [
  {
    id: 'er1',
    eventId: '1',
    attendedGuestIds: ['aio-001'],
    registeredGuestIds: ['aio-001']
  }
];

export const mockApi = {
  // Events
  getEvents: async (): Promise<Event[]> => {
    await delay(500);
    return [...events];
  },

  getEvent: async (id: string): Promise<Event | null> => {
    await delay(300);
    return events.find(event => event.id === id) || null;
  },

  // Guests and Bookings
  getGuestsByEvent: async (eventId: string): Promise<Guest[]> => {
    await delay(300);
    const eventBookings = bookings.filter(booking => booking.eventId === eventId);
    return guests.filter(guest => eventBookings.some(booking => booking.guestId === guest.id));
  },

  registerGuest: async (guestData: Partial<Guest & { eventId: string; guestTypeId: string }>): Promise<{ guest: Guest; booking: Booking }> => {
    await delay(300);
    const newGuest: Guest = {
      id: Math.random().toString(36).substring(2, 9),
      name: guestData.name || '',
      organization: guestData.organization || '',
      jobTitle: guestData.jobTitle || '',
      phone: guestData.phone || '',
      email: guestData.email
    };

    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      eventId: guestData.eventId || '',
      guestId: newGuest.id,
      guestTypeId: guestData.guestTypeId || '1',
      expiration: events.find(e => e.id === guestData.eventId)?.endDate || '',
      badgeTemplateId: '1'
    };

    guests.push(newGuest);
    bookings.push(newBooking);
    return { guest: newGuest, booking: newBooking };
  },
  
  // Guests
  getGuests: async (): Promise<Guest[]> => {
    await delay(500);
    return [...guests];
  },
  
  getGuestsByEvent: async (eventId: string): Promise<Guest[]> => {
    await delay(300);
    return guests.filter(guest => guest.eventId === eventId);
  },
  
  addGuest: async (guest: Omit<Guest, 'id'>): Promise<Guest> => {
    await delay(300);
    const newGuest = {
      ...guest,
      id: `guest-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    guests.push(newGuest);
    return newGuest;
  },
  
  importGuests: async (newGuests: Omit<Guest, 'id'>[]): Promise<Guest[]> => {
    await delay(500);
    const importedGuests: Guest[] = [];
    
    for (const guestData of newGuests) {
      const newGuest = {
        ...guestData,
        id: `guest-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      };
      guests.push(newGuest);
      importedGuests.push(newGuest);
      
      // Update event guest count
      const eventIndex = events.findIndex(event => event.id === guestData.eventId);
      if (eventIndex !== -1) {
        events[eventIndex].guests += 1;
      }
    }
    
    return importedGuests;
  },
  
  updateGuestStatus: async (guestId: string, status: Guest['status']): Promise<Guest | undefined> => {
    await delay(300);
    const guestIndex = guests.findIndex(guest => guest.id === guestId);
    if (guestIndex === -1) return undefined;
    
    guests[guestIndex] = { ...guests[guestIndex], status };
    return guests[guestIndex];
  },
  
  // Vendors
  getVendors: async (): Promise<Vendor[]> => {
    await delay(500);
    return [...vendors];
  },
  
  // Approvals
  getApprovals: async (): Promise<Approval[]> => {
    await delay(500);
    return [...approvals];
  },
  
  // Dashboard stats
  getStats: async (): Promise<StatsSummary> => {
    await delay(300);
    return { ...stats };
  },
  
  // Analytics
  getAnalytics: async () => {
    await delay(500);
    return { ...analyticsData };
  },
  
  // Badge printing
  printGuestBadges: async (guestIds: string[]): Promise<{ success: boolean, count: number }> => {
    await delay(700);
    // In a real application, this would trigger the actual printing process
    // Here we just simulate it and update the stats
    stats.badgesPrinted += guestIds.length;
    stats.badgesPercentage = Math.min(100, (stats.badgesPrinted / stats.registeredGuests) * 100);
    
    return { success: true, count: guestIds.length };
  }
};
