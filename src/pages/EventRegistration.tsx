
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { QrCode } from 'lucide-react';

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  dietaryRequirements: string;
}

const EventRegistration: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    dietaryRequirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState<string>('');
  const { toast } = useToast();

  // Mock event data based on eventId
  const eventData = {
    id: eventId,
    name: eventId === '1' ? 'Annual Tech Conference 2025' : 
          eventId === '2' ? 'Marketing Summit' : 
          eventId === '3' ? 'Product Launch' : 'Event Name',
    date: 'Sunday, 25th of April 2025',
    time: '10h - 19h',
    location: '110 Avenue de la Marne, 56000 Vannes',
    logo: '/lovable-uploads/8b8ba947-ce02-4dae-b677-d70b3a0211b3.png'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate random registration ID
      const generatedId = Math.random().toString(36).substring(2, 10).toUpperCase();
      setRegistrationId(generatedId);
      
      toast({
        title: "Registration successful!",
        description: "You have successfully registered for the event.",
      });
      
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <img 
          src={eventData.logo} 
          alt={eventData.name}
          className="h-16 mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold">{eventData.name}</h1>
        <p className="text-gray-500 mt-2">
          {eventData.date} • {eventData.time} • {eventData.location}
        </p>
      </div>

      {!isSubmitted ? (
        <Card>
          <CardHeader>
            <CardTitle>Event Registration</CardTitle>
            <CardDescription>
              Please fill out the form below to register for {eventData.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company / Organization
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="jobTitle" className="text-sm font-medium">
                  Job Title
                </label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="dietaryRequirements" className="text-sm font-medium">
                  Dietary Requirements
                </label>
                <Input
                  id="dietaryRequirements"
                  name="dietaryRequirements"
                  value={formData.dietaryRequirements}
                  onChange={handleInputChange}
                  placeholder="Any special dietary requirements"
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Registering...' : 'Register Now'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Registration Confirmed!</CardTitle>
            <CardDescription>
              Thank you for registering for {eventData.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <div className="w-full max-w-md mx-auto">
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <div className="mb-6">
                  <h3 className="text-xl font-bold">
                    {formData.firstName} {formData.lastName}
                  </h3>
                  <p className="text-gray-600">{formData.jobTitle}</p>
                  <p className="text-gray-500">{formData.company}</p>
                </div>

                <div className="w-40 h-40 mx-auto mb-4 p-2 border border-gray-200 rounded">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${registrationId}`}
                    alt="Registration QR Code"
                    className="w-full h-full"
                  />
                </div>

                <div className="text-gray-700 mb-4">
                  <p className="font-semibold">{eventData.name}</p>
                  <p>{eventData.date}</p>
                  <p>{eventData.time}</p>
                  <p className="text-sm">{eventData.location}</p>
                </div>

                <div className="text-sm text-gray-500">
                  <p>Registration ID: {registrationId}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-gray-600">
                  We've sent a confirmation email to <span className="font-medium">{formData.email}</span> with your registration details.
                </p>
                <Button className="w-full">
                  <QrCode size={16} className="mr-2" />
                  Save QR Code
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventRegistration;
