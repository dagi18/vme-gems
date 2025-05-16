
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Menu, Moon, Sun } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { useSidebar } from '@/components/ui/sidebar';

const Topbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const { toggleSidebar } = useSidebar();
  
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  // Show notifications demo
  const showNotification = () => {
    toast({
      title: "New notification",
      description: "You have a new event approval request",
    });
  };

  // Generate page title from route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/events') return 'Events';
    if (path.startsWith('/events/stage')) return 'Create New Event';
    if (path.startsWith('/events/') && path.includes('/check-in')) return 'Guest Check-In';
    if (path.startsWith('/events/') && path.includes('/guests')) return 'Event Guests';
    if (path.startsWith('/events/') && path.includes('/badge-print')) return 'Print Badges';
    if (path.startsWith('/events/') && path.includes('/ratings')) return 'Event Ratings';
    if (path.startsWith('/events/') && path.includes('/assign-ushers')) return 'Assign Ushers';
    if (path.startsWith('/events/') && !path.includes('/stage')) return 'Event Details';
    
    if (path === '/guests') return 'All Guests';
    if (path === '/vendors') return 'Vendors';
    if (path === '/approvals') return 'Approvals';
    if (path === '/badge-management') return 'Badge Management';
    if (path === '/print-badges') return 'Print Badges';
    if (path === '/mobile-check-in') return 'Mobile Check-In';
    if (path === '/analytics') return 'Analytics';
    if (path === '/reports') return 'Reports';
    if (path === '/user-management') return 'User Management';
    if (path === '/settings') return 'Settings';
    
    return 'VEMS';
  };

  const getLastUpdated = () => {
    const date = new Date();
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <header className="bg-white dark:bg-gray-900 h-16 border-b border-gray-200 dark:border-gray-800 px-4 flex items-center justify-between print:hidden w-full">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu size={22} />
        </button>
        
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{getPageTitle()}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Last updated: {getLastUpdated()}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        {/* Notifications */}
        <button 
          onClick={showNotification}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative"
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
