
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { RefreshCw } from 'lucide-react';
import { mockApi, analyticsData } from '../services/mockApi';

const Analytics: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        const data = await mockApi.getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalytics();
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAnalytics(analyticsData);
      setIsLoading(false);
    }, 800);
  };

  // Format attendance data for chart
  const attendanceData = analytics ? [
    { name: 'Jan', attendance: analytics.attendance.jan },
    { name: 'Feb', attendance: analytics.attendance.feb },
    { name: 'Mar', attendance: analytics.attendance.mar },
    { name: 'Apr', attendance: analytics.attendance.apr },
    { name: 'May', attendance: analytics.attendance.may },
  ] : [];

  // Format guest types data for chart
  const guestTypeData = analytics ? [
    { name: 'New Guests', value: analytics.guestTypes.new },
    { name: 'Returning Guests', value: analytics.guestTypes.returning },
  ] : [];

  const COLORS = ['#FFCD1E', '#333333'];

  const StatCard = ({ title, value, growth, icon }: { title: string; value: string | number; growth?: string; icon: React.ReactNode }) => (
    <div className="dashboard-card">
      <div className="dashboard-card-title">{title}</div>
      <div className="dashboard-card-value">{value}</div>
      {growth && <div className="dashboard-card-growth">{growth}</div>}
      <div className="dashboard-card-icon">{icon}</div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400">
            View real-time analytics and insights for your events
          </p>
        </div>
        
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <div className="flex items-center">
            <select className="pl-3 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <select className="pl-3 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
              <option>All Events</option>
              <option>Annual Tech Conference</option>
              <option>Product Launch</option>
              <option>Marketing Workshop</option>
            </select>
          </div>
          
          <button 
            onClick={refreshData}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <RefreshCw size={18} className={`${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Events" 
          value="12" 
          growth="+2 from last month" 
          icon={<div className="w-5 h-5 bg-blue-500 rounded"></div>} 
        />
        
        <StatCard 
          title="Total Guests" 
          value="2350" 
          growth="+15.3% from last month" 
          icon={<div className="w-5 h-5 bg-green-500 rounded"></div>} 
        />
        
        <StatCard 
          title="Check-in Rate" 
          value="78.2%" 
          growth="+5.1% from last event" 
          icon={<div className="w-5 h-5 bg-purple-500 rounded"></div>} 
        />
        
        <StatCard 
          title="Active Users" 
          value="24" 
          growth="+2 from yesterday" 
          icon={<div className="w-5 h-5 bg-yellow-500 rounded"></div>} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-1">Event Attendance</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Monthly attendance across all events</p>
          
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#FFCD1E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-1">New vs. Returning Guests</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Breakdown of new and returning guests</p>
          
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={guestTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {guestTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
