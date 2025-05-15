
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, Clock, MapPin, Users, Tag, Store, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const EventStage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    location: '',
    maxGuests: '',
    eventType: '',
    category: '',
    vendor: '',
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate first step
      if (!formData.name || !formData.description) {
        toast({
          title: "Missing information",
          description: "Please fill in event name and description.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2) {
      // Validate second step
      if (!formData.startDate || !formData.location) {
        toast({
          title: "Missing information",
          description: "Please fill in event date and location.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit the form data
    toast({
      title: "Event Created",
      description: "Your event has been created successfully.",
    });
    
    // Navigate back to events page
    setTimeout(() => {
      navigate('/events');
    }, 1500);
  };

  // Render different steps of the form
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Annual Tech Conference"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Provide a detailed description of the event"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Registration Deadline
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="date"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Convention Center, City"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Maximum Guests
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="number"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleChange}
                  placeholder="100"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Tag className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select event type</option>
                  <option value="conference">Conference</option>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="networking">Networking</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Tag className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select category</option>
                  <option value="technology">Technology</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                  <option value="design">Design</option>
                  <option value="health">Health</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vendor
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Store className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <select
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select vendor</option>
                  <option value="1">TechEvents Inc.</option>
                  <option value="2">Conference Solutions</option>
                  <option value="3">Event Masters</option>
                  <option value="4">Global Events</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6 flex items-center">
              <Check size={24} className="text-green-600 dark:text-green-400 mr-3" />
              <div>
                <h3 className="font-medium text-green-800 dark:text-green-300">Your event is almost ready!</h3>
                <p className="text-sm text-green-700 dark:text-green-400">Review the information below and submit to create the event.</p>
              </div>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-lg font-medium">Event Details</h3>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Event Name</div>
                  <div>{formData.name || '(Not provided)'}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</div>
                  <div>{formData.description || '(Not provided)'}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</div>
                    <div>{formData.startDate || '(Not provided)'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">End Date</div>
                    <div>{formData.endDate || '(Not provided)'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Registration Deadline</div>
                    <div>{formData.registrationDeadline || '(Not provided)'}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</div>
                  <div>{formData.location || '(Not provided)'}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Maximum Guests</div>
                    <div>{formData.maxGuests || '(Not provided)'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Event Type</div>
                    <div className="capitalize">{formData.eventType || '(Not provided)'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</div>
                    <div className="capitalize">{formData.category || '(Not provided)'}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Vendor</div>
                  <div>
                    {formData.vendor === '1' && 'TechEvents Inc.'}
                    {formData.vendor === '2' && 'Conference Solutions'}
                    {formData.vendor === '3' && 'Event Masters'}
                    {formData.vendor === '4' && 'Global Events'}
                    {!formData.vendor && '(Not provided)'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Create New Event</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fill in the details to create a new event
        </p>
      </div>
      
      {/* Step indicator */}
      <div className="mb-6">
        <div className="overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div 
            className="h-2 bg-gold rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <div className={`text-xs font-medium ${currentStep >= 1 ? 'text-gold' : 'text-gray-500 dark:text-gray-400'}`}>Basic Info</div>
          <div className={`text-xs font-medium ${currentStep >= 2 ? 'text-gold' : 'text-gray-500 dark:text-gray-400'}`}>Date & Location</div>
          <div className={`text-xs font-medium ${currentStep >= 3 ? 'text-gold' : 'text-gray-500 dark:text-gray-400'}`}>Additional Info</div>
          <div className={`text-xs font-medium ${currentStep >= 4 ? 'text-gold' : 'text-gray-500 dark:text-gray-400'}`}>Review</div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <ChevronLeft size={16} className="mr-2" />
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold hover:bg-gold-dark"
                >
                  Next
                  <ChevronRight size={16} className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold hover:bg-gold-dark"
                >
                  <Check size={16} className="mr-2" />
                  Create Event
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventStage;
