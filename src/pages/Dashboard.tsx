import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Printer, Store, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockApi, StatsSummary, Event } from '../services/mockApi';
import { useAuth } from '../contexts/AuthContext';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<StatsSummary | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { user } = useAuth();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [statsData, eventsData] = await Promise.all([
          mockApi.getStats(),
          mockApi.getEvents(),
        ]);
        setStats(statsData);
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Render different content based on user role
  const renderCalendar = () => {
    return (
      <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800">
        <div className="bg-[#ffcd1e] p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
              className="text-2xl text-white hover:opacity-75"
            >
              «
            </button>
            <h2 className="text-xl font-semibold text-white">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button
              onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
              className="text-2xl text-white hover:opacity-75"
            >
              »
            </button>
          </div>
          <div className="mt-4 grid grid-cols-7 text-center">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-sm font-medium text-white">
                {day}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-7 bg-white dark:bg-gray-800">
          {monthDays.map(day => {
            const dayEvents = events.filter(event => 
              isSameDay(new Date(event.date), day)
            );
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
            const isToday = isSameDay(day, new Date());
            
            return (
              <div
                key={day.toString()}
                className={`
                  relative p-2 min-h-[80px] border-b border-r border-gray-100 dark:border-gray-700
                  ${!isCurrentMonth ? 'text-gray-400 dark:text-gray-500' : ''}
                `}
              >
                <div className={`
                  text-sm font-medium mb-1 flex items-center justify-center
                  ${isToday ? 'w-7 h-7 rounded-full bg-[#40E0D0] text-white' : ''}
                `}>
                  {format(day, 'd')}
                </div>
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={() => navigate(`/events/${event.id}`)}
                    className="text-xs p-1 bg-[#ffcd1e]/10 text-[#ffcd1e] dark:text-[#ffcd1e] rounded truncate cursor-pointer hover:bg-[#ffcd1e]/20"
                    title={event.name}
                  >
                    {event.name}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAnalytics = () => {
    if (!stats) return null;

    const attendanceData = [
      { name: 'Mon', value: stats.weeklyAttendance?.monday || 0 },
      { name: 'Tue', value: stats.weeklyAttendance?.tuesday || 0 },
      { name: 'Wed', value: stats.weeklyAttendance?.wednesday || 0 },
      { name: 'Thu', value: stats.weeklyAttendance?.thursday || 0 },
      { name: 'Fri', value: stats.weeklyAttendance?.friday || 0 },
    ];

    return (
      <div className="dashboard-card p-4">
        <h2 className="text-xl font-semibold mb-4">Weekly Attendance</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#FFCD1E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderDashboardContent = () => {
    if (user?.role === 'usher') {
      return (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Your Assigned Events</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {events.slice(0, 2).map((event) => (
              <div key={event.id} className="dashboard-card">
                <h3 className="font-medium text-lg">{event.name}</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">{event.date}</div>
                <div className="flex items-center text-sm mb-2 justify-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className={`status-pill status-${event.status}`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </div>
                  <Link
                    to="/"
                    className="text-gold hover:text-gold-dark text-sm font-medium"
                  >
                    Check in guests →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Admin and Organizer see similar dashboard but with different permissions
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Link to="/events" className="stat-card">
            <div className="stat-card-icon">
              <Calendar size={20} className="text-blue-600 dark:text-blue-500" />
            </div>
            <div className="stat-card-content">
              <div className="stat-card-title">Total Events</div>
              <div className="stat-card-value">{stats?.totalEvents || 0}</div>
              <div className="stat-card-growth">
                +{stats?.totalGrowth || 0} from last month
              </div>
            </div>
          </Link>
          
          <Link to="/events" className="stat-card">
            <div className="stat-card-icon">
              <Clock size={20} className="text-purple-600 dark:text-purple-500" />
            </div>
            <div className="stat-card-content">
              <div className="stat-card-title">Upcoming Events</div>
              <div className="stat-card-value">{stats?.upcomingEvents || 0}</div>
              <div className="stat-card-subtitle">
                Next event in {stats?.nextEventDays || 0} days
              </div>
            </div>
          </Link>
          
          <Link to="/guests" className="stat-card">
            <div className="stat-card-icon">
              <Users size={20} className="text-green-600 dark:text-green-500" />
            </div>
            <div className="stat-card-content">
              <div className="stat-card-title">Registered Guests</div>
              <div className="stat-card-value">{stats?.registeredGuests || 0}</div>
              <div className="stat-card-growth">
                +{stats?.guestsGrowth || 0} this week
              </div>
            </div>
          </Link>
          
          {user?.role === 'admin' ? (
            <Link to="/vendors" className="stat-card">
              <div className="stat-card-icon">
                <Store size={20} className="text-purple-600 dark:text-purple-500" />
              </div>
              <div className="stat-card-content">
                <div className="stat-card-title">Total Vendors</div>
                <div className="stat-card-value">4</div>
                <div className="stat-card-subtitle">
                  +1 new this month
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/print-badges" className="stat-card">
              <div className="stat-card-icon">
                <Printer size={20} className="text-red-600 dark:text-red-500" />
              </div>
              <div className="stat-card-content">
                <div className="stat-card-title">Badges Printed</div>
                <div className="stat-card-value">{stats?.badgesPrinted || 0}</div>
                <div className="stat-card-subtitle">
                  {stats?.badgesPercentage || 0}% of registered guests
                </div>
              </div>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="dashboard-card">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold">Upcoming Events</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your next events scheduled in the coming weeks</p>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{event.name}</h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{event.date} • {event.location}</div>
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-1" />
                      <span className="text-sm font-medium">{event.guests}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 text-center border-t border-gray-200 dark:border-gray-700">
              <Link to="/" className="text-gold hover:text-gold-dark text-sm font-medium">
                View all events →
              </Link>
            </div>
          </div>
          
          <div className="dashboard-card">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold">Recent Registrations</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Latest guest registrations across all events</p>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="p-5">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Jane Smith</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Acme Inc</div>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">5/10/2025</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Tech Solutions</div>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">5/9/2025</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Alice Johnson</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Marketing Pro</div>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">5/8/2025</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Bob Williams</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Design Studio</div>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">5/7/2025</div>
                </div>
              </div>
            </div>
            <div className="p-4 text-center border-t border-gray-200 dark:border-gray-700">
              <Link to="/" className="text-gold hover:text-gold-dark text-sm font-medium">
                View all guests →
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {renderAnalytics()}
          {renderCalendar()}
        </div>
      </>
    );
  };

  return (
    <div className="text-center">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back, {user?.name}!
        </p>
      </header>
      
      {renderDashboardContent()}
    </div>
  );
};

export default Dashboard;
