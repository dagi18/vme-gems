
import React, { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tag, Plus, Edit, Trash2, CircuitBoard, CheckCheck, Link, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EventBadge from '@/components/EventBadge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data for badge templates
const badgeTemplates = [
  { id: 1, name: 'Standard Guest', color: '#3498db', type: 'guest', active: true },
  { id: 2, name: 'VIP Guest', color: '#9b59b6', type: 'vip', active: true },
  { id: 3, name: 'Staff Badge', color: '#e74c3c', type: 'staff', active: false },
  { id: 4, name: 'Speaker Badge', color: '#27ae60', type: 'speaker', active: true },
];

// Mock data for badge systems
const badgeSystems = [
  { id: 1, name: 'Main Hall System', printer: 'HP LaserJet Pro', status: 'Online', location: 'Main Entrance' },
  { id: 2, name: 'VIP Entrance System', printer: 'Epson WorkForce', status: 'Offline', location: 'VIP Entrance' },
  { id: 3, name: 'Staff Registration', printer: 'Brother QL-800', status: 'Low Ink', location: 'Staff Room' },
];

// Mock data for event registrations
const eventRegistrations = [
  { id: 1, eventName: 'Annual Tech Conference 2025', url: 'https://example.com/register/tech2025', active: true, formFields: ['name', 'email', 'company'] },
  { id: 2, eventName: 'Marketing Summit', url: 'https://example.com/register/marketing', active: true, formFields: ['name', 'email', 'job-title'] },
  { id: 3, eventName: 'Product Launch', url: '', active: false, formFields: ['name', 'email', 'interests'] },
];

const BadgeManagement = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [registrationUrl, setRegistrationUrl] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const { toast } = useToast();

  const handleAddRegistrationUrl = () => {
    if (!selectedEvent) {
      toast({
        title: "No event selected",
        description: "Please select an event to add a registration link.",
        variant: "destructive",
      });
      return;
    }

    if (!registrationUrl) {
      toast({
        title: "No URL provided",
        description: "Please enter a valid registration URL.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would update the backend
    toast({
      title: "Registration URL added",
      description: `Registration URL added for ${selectedEvent}`,
    });

    // Reset form
    setRegistrationUrl('');
    setSelectedEvent('');
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Badge Management</h1>
        <p className="text-muted-foreground">
          Manage your badge templates and systems for all your events
        </p>
      </div>

      <Tabs defaultValue="templates" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="templates">Badge Templates</TabsTrigger>
          <TabsTrigger value="systems">Badge Systems</TabsTrigger>
          <TabsTrigger value="registration">Event Registration</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Available Templates</h2>
            <Button>
              <Plus size={18} className="mr-2" />
              New Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {badgeTemplates.map(template => (
              <Card key={template.id} className={!template.active ? "opacity-70" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Tag size={16} style={{ color: template.color }} />
                        {template.name}
                      </CardTitle>
                      <CardDescription>Type: {template.type}</CardDescription>
                    </div>
                    {template.active ? (
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Active
                      </div>
                    ) : (
                      <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        Inactive
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="border rounded-md p-1 mb-3">
                    <AspectRatio ratio={0.6 / 1}>
                      <div className="flex justify-center items-center">
                        <EventBadge 
                          name="Guest Name"
                          type={template.type}
                          title={template.type.charAt(0).toUpperCase() + template.type.slice(1)}
                          organization="Company Name"
                          qrValue="sample"
                          date="Event Date"
                          time="Event Time"
                          location="Event Location"
                        />
                      </div>
                    </AspectRatio>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button variant="outline" size="sm">
                    <Edit size={14} className="mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 size={14} className="mr-2" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="systems" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Badge Systems</h2>
            <Button>
              <Plus size={18} className="mr-2" />
              Add System
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Badge Printing Systems</CardTitle>
              <CardDescription>Manage your connected badge printing systems</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Printer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {badgeSystems.map(system => (
                    <TableRow key={system.id}>
                      <TableCell className="font-medium">{system.name}</TableCell>
                      <TableCell>{system.printer}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${
                          system.status === 'Online' ? 'bg-green-100 text-green-800' :
                          system.status === 'Offline' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {system.status === 'Online' && <CheckCheck size={12} className="mr-1" />}
                          {system.status === 'Offline' && <CircuitBoard size={12} className="mr-1" />}
                          {system.status}
                        </div>
                      </TableCell>
                      <TableCell>{system.location}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit size={14} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Set up your badge printing system parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Resolution (DPI)</label>
                    <Input type="number" defaultValue="300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Print Mode</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>High Quality</option>
                      <option>Standard</option>
                      <option>Draft</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Badge Socket API Endpoint</label>
                  <Input type="text" defaultValue="wss://badge-api.eventpro.io/print" />
                </div>
                <Button className="mt-4">Save Configuration</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registration" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Event Registration Management</h2>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus size={18} className="mr-2" />
                  Add Registration Link
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Registration Link</DialogTitle>
                  <DialogDescription>
                    Connect a registration form to an event for quick access from the badge management system.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Event</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                    >
                      <option value="">Select an event</option>
                      <option>Annual Tech Conference 2025</option>
                      <option>Marketing Summit</option>
                      <option>Product Launch</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Registration URL</label>
                    <Input 
                      type="url" 
                      placeholder="https://example.com/registration-form" 
                      value={registrationUrl}
                      onChange={(e) => setRegistrationUrl(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddRegistrationUrl}>
                    <Link size={16} className="mr-2" />
                    Add Link
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Registration Links</CardTitle>
              <CardDescription>Manage your event registration forms</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Registration URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fields</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventRegistrations.map(reg => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-medium">{reg.eventName}</TableCell>
                      <TableCell>
                        {reg.url ? (
                          <a href={reg.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                            {reg.url.length > 30 ? reg.url.substring(0, 30) + '...' : reg.url}
                            <Link size={14} className="ml-1" />
                          </a>
                        ) : (
                          <span className="text-gray-400">No URL configured</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${
                          reg.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {reg.active ? 'Active' : 'Inactive'}
                        </div>
                      </TableCell>
                      <TableCell>{reg.formFields.length} fields</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <QrCode size={14} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit size={14} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Registration Form Builder</CardTitle>
              <CardDescription>Create and customize your registration forms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <h3 className="text-lg font-medium text-gray-600 mb-2">Form Builder Coming Soon</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Create custom registration forms with drag-and-drop fields, validation, and automatic badge generation.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BadgeManagement;
