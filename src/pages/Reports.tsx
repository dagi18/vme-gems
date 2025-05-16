
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, Users, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Attendance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Event Attendance</CardTitle>
                <CardDescription>Monthly attendance trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={[
                      { month: 'Jan', attendance: 150 },
                      { month: 'Feb', attendance: 230 },
                      { month: 'Mar', attendance: 180 },
                      { month: 'Apr', attendance: 290 },
                      { month: 'May', attendance: 320 },
                      { month: 'Jun', attendance: 250 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="attendance" stroke="#ffcd1e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Registration Status Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Registration Status</CardTitle>
                <CardDescription>Current registration breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Registered', value: 400 },
                        { name: 'Checked In', value: 300 },
                        { name: 'No Show', value: 100 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#ffcd1e" />
                      <Cell fill="#36B37E" />
                      <Cell fill="#FF5630" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Event Categories Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Event Categories</CardTitle>
                <CardDescription>Distribution by event type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { category: 'Conference', count: 45 },
                      { category: 'Workshop', count: 30 },
                      { category: 'Seminar', count: 25 },
                      { category: 'Networking', count: 20 },
                      { category: 'Other', count: 15 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#ffcd1e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={[
                      { month: 'Jan', revenue: 5000 },
                      { month: 'Feb', revenue: 7200 },
                      { month: 'Mar', revenue: 6800 },
                      { month: 'Apr', revenue: 9100 },
                      { month: 'May', revenue: 11200 },
                      { month: 'Jun', revenue: 8900 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#36B37E" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
