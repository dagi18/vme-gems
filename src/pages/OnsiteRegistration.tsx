import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { mockApi } from '../services/mockApi';

interface OnsiteRegistrationForm {
  name: string;
  email: string;
  phone: string;
  organization: string;
  jobTitle: string;
  eventId: string;
  guestTypeId: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
}

const OnsiteRegistration = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract eventId from URL if present (for direct navigation from event details)
  const searchParams = new URLSearchParams(location.search);
  const preselectedEventId = searchParams.get('eventId');
  const [formData, setFormData] = useState<OnsiteRegistrationForm>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    jobTitle: '',
    eventId: '',
    guestTypeId: '1' // Default to regular guest type
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fetch events when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await mockApi.getEvents();
        setEvents(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load events. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await mockApi.registerGuest({
        ...formData,
      });

      toast({
        title: "Success!",
        description: "Guest has been registered successfully.",
        duration: 3000,
      });

      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        jobTitle: '',
        eventId: '',
        guestTypeId: '1'
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register guest. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-enter">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Onsite Registration</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Register new guests at the event venue
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guest Registration Form</CardTitle>
          <CardDescription>
            Fill in the guest's information to register them for the event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter guest's full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter guest's email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter guest's phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  name="organization"
                  placeholder="Enter guest's organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="Enter guest's job title"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventId">Event</Label>
                <Select
                  value={formData.eventId}
                  onValueChange={(value) => handleSelectChange('eventId', value)}
                  disabled={loadingEvents}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.name} - {new Date(event.date).toLocaleDateString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestTypeId">Guest Type</Label>
                <Select
                  value={formData.guestTypeId}
                  onValueChange={(value) => handleSelectChange('guestTypeId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select guest type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Regular</SelectItem>
                    <SelectItem value="2">VIP</SelectItem>
                    <SelectItem value="3">Speaker</SelectItem>
                    <SelectItem value="4">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    organization: '',
                    jobTitle: '',
                    eventId: '',
                    registrationType: 'regular'
                  });
                }}
              >
                Clear
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register Guest'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnsiteRegistration;
