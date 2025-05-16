
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Plus, Search, Filter, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mockEvents = [
    {
      id: "1",
      title: "51st Conference & Annual General Assembly (AIO 2025)",
      date: "2025-05-26",
      location: "Addis Ababa, Ethiopia",
      attendees: 0,
      status: "published",
      organizer: "African Insurance Organization (AIO)",
      partner: "APEX",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: "2",
      title: "Product Launch", 
      date: "2023-11-05",
      location: "Tech Hub, New York",
      attendees: 500,
      status: "draft",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: "3",
      title: "Developer Workshop", 
      date: "2023-09-20",
      location: "Online",
      attendees: 350,
      status: "published",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: "4",
      title: "Industry Networking", 
      date: "2023-12-01",
      location: "Chicago Business Center",
      attendees: 200,
      status: "draft",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80"
    },
  ];

  const filteredEvents = mockEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-enter">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Events</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your organization's events
          </p>
        </div>
        
        <Link to="/events/stage">
          <Button className="mt-4 md:mt-0 bg-gold hover:bg-gold-dark">
            <Plus size={18} className="mr-1" />
            Create New Event
          </Button>
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md"
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter size={18} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Link key={event.id} to={`/events/${event.id}`} className="block">
            <Card className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer border hover:border-gold">
              <CardHeader className="p-0">
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <div className={`status-pill ${event.status === 'published' ? 'status-published' : 'status-draft'}`}>
                    {event.status}
                  </div>
                </div>
                <CardDescription className="flex items-center mt-2">
                  <CalendarDays size={16} className="mr-1" />
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </CardDescription>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {event.location}
                </p>
                <div className="mt-3 text-sm font-medium">
                  {event.attendees} attendees
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="outline" size="sm" className="text-gold hover:text-gold-dark">
                  <Eye size={16} className="mr-1" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Events;
