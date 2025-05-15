
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, Calendar, Users, Store, 
  CheckSquare, Tag, CircuitBoard, Printer, 
  Smartphone, BarChart2, FileText, Settings, 
  ChevronLeft, LogOut, UserCog 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { user, logout, switchRole } = useAuth();
  const location = useLocation();
  
  if (!user) return null;

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => (
    <Link 
      to={to} 
      className={`sidebar-item ${isActive(to) ? 'sidebar-item-active' : ''}`}
    >
      <Icon size={20} />
      <span className={`${isOpen ? 'opacity-100' : 'md:opacity-0'} transition-opacity duration-200`}>
        {label}
      </span>
    </Link>
  );
  
  // Role-based navigation items
  const adminItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/events", icon: Calendar, label: "Events" },
    { to: "/guests", icon: Users, label: "Guests" },
    { to: "/vendors", icon: Store, label: "Vendors" },
    { to: "/approvals", icon: CheckSquare, label: "Approvals" },
    { to: "/badge-templates", icon: Tag, label: "Badge Templates" },
    { to: "/badge-system", icon: CircuitBoard, label: "Badge System" },
    { to: "/print-badges", icon: Printer, label: "Print Badges" },
    { to: "/mobile-check-in", icon: Smartphone, label: "Mobile Check-in" },
    { to: "/analytics", icon: BarChart2, label: "Analytics" },
    { to: "/reports", icon: FileText, label: "Reports" },
    { to: "/users", icon: UserCog, label: "User Management" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];
  
  const organizerItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/events", icon: Calendar, label: "Events" },
    { to: "/guests", icon: Users, label: "Guests" },
    { to: "/vendors", icon: Store, label: "Vendors" },
    { to: "/badge-templates", icon: Tag, label: "Badge Templates" },
    { to: "/print-badges", icon: Printer, label: "Print Badges" },
    { to: "/mobile-check-in", icon: Smartphone, label: "Mobile Check-in" },
    { to: "/reports", icon: FileText, label: "Reports" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];
  
  const usherItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/events", icon: Calendar, label: "My Events" },
    { to: "/guests", icon: Users, label: "Guests" },
    { to: "/print-badges", icon: Printer, label: "Print Badges" },
    { to: "/mobile-check-in", icon: Smartphone, label: "Mobile Check-in" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];
  
  const navigationItems = user.role === 'admin' 
    ? adminItems 
    : user.role === 'organizer' 
      ? organizerItems 
      : usherItems;

  return (
    <div className={`h-full bg-white dark:bg-gray-900 border-r dark:border-gray-800 flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-20 md:w-64'}`}>
      {/* Logo and toggle */}
      <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-800">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="bg-gold p-1 rounded">
            <Calendar size={20} className="text-white" />
          </div>
          <span className={`font-semibold text-xl ${isOpen ? 'opacity-100' : 'md:opacity-0'} transition-opacity duration-200`}>
            EventPro
          </span>
        </Link>
        <button
          onClick={onToggle}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 md:block hidden"
        >
          <ChevronLeft size={20} className={`transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <NavItem 
            key={item.to} 
            to={item.to} 
            icon={item.icon} 
            label={item.label} 
          />
        ))}
      </div>

      {/* Footer with user info */}
      <div className="p-4 border-t dark:border-gray-800">
        {/* For development - role switcher */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1">Developer Role Switcher</label>
          <div className="flex gap-2">
            <button
              onClick={() => switchRole('admin')}
              className={`px-2 py-1 text-xs rounded ${user.role === 'admin' ? 'bg-gold text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
            >
              Admin
            </button>
            <button
              onClick={() => switchRole('organizer')}
              className={`px-2 py-1 text-xs rounded ${user.role === 'organizer' ? 'bg-gold text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
            >
              Organizer
            </button>
            <button
              onClick={() => switchRole('usher')}
              className={`px-2 py-1 text-xs rounded ${user.role === 'usher' ? 'bg-gold text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
            >
              Usher
            </button>
          </div>
        </div>
      
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium">{user.name.charAt(0)}</span>
          </div>
          <div className={`${isOpen ? 'opacity-100' : 'md:opacity-0'} transition-opacity duration-200`}>
            <div className="font-medium text-sm">{user.name}</div>
            <div className="text-xs text-gray-500 capitalize">{user.role}</div>
          </div>
          <button 
            onClick={logout}
            className="ml-auto p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
