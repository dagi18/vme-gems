
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, Users, BarChart2 } from 'lucide-react';

const Reports = () => {
  return (
    <div className="animate-enter">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Generate and download reports for events and attendees
          </p>
        </div>
        
        <Button className="mt-4 md:mt-0" variant="outline">
          <Download size={16} className="mr-2" />
          Export All
        </Button>
      </div>
      
      <Tabs defaultValue="events" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="events">
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger value="attendees">
            <Users className="h-4 w-4 mr-2" />
            Attendees
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart2 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Reports</CardTitle>
              <CardDescription>
                Access and download reports for all events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Annual Tech Conference {2023 + index}</h3>
                    <p className="text-sm text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attendees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendee Reports</CardTitle>
              <CardDescription>
                Access and download reports for all attendees
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Attendee Analytics Q{index + 1} 2023</h3>
                    <p className="text-sm text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Reports</CardTitle>
              <CardDescription>
                Access and download analytics reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Performance Analytics {['Q1', 'Q2', 'Q3', 'Q4'][index]} 2023</h3>
                    <p className="text-sm text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
