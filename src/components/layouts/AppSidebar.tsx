
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, Calendar, Users, Store, 
  CheckSquare, Tag, CircuitBoard, Printer, 
  Smartphone, BarChart2, FileText, Settings, 
  LogOut, UserCog
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';

const AppSidebar: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  
  if (!user) return null;

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Role-based navigation items
  const adminItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/events", icon: Calendar, label: "Events" },
    { to: "/guests", icon: Users, label: "Guests" },
    { to: "/vendors", icon: Store, label: "Vendors" },
    { to: "/approvals", icon: CheckSquare, label: "Approvals" },
    { to: "/badge-management", icon: Tag, label: "Badge Management" },
    { to: "/print-badges", icon: Printer, label: "Print Badges" },
    { to: "/mobile-check-in", icon: Smartphone, label: "Mobile Check-in" },
    { to: "/analytics", icon: BarChart2, label: "Analytics" },
    { to: "/reports", icon: FileText, label: "Reports" },
    { to: "/user-management", icon: UserCog, label: "User Management" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];
  
  const organizerItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/events", icon: Calendar, label: "Events" },
    { to: "/guests", icon: Users, label: "Guests" },
    { to: "/vendors", icon: Store, label: "Vendors" },
    { to: "/badge-management", icon: Tag, label: "Badge Management" },
    { to: "/print-badges", icon: Printer, label: "Print Badges" },
    { to: "/mobile-check-in", icon: Smartphone, label: "Mobile Check-in" },
    { to: "/reports", icon: FileText, label: "Reports" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];
  
  const usherItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
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
    <Sidebar>
      <SidebarRail />
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="bg-gold p-1 rounded">
            <Calendar size={20} className="text-white" />
          </div>
          <span className="font-semibold text-xl">EventPro</span>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.to)}
                    tooltip={item.label}
                  >
                    <Link to={item.to} className="flex items-center">
                      <item.icon size={20} className="flex-shrink-0" />
                      <span className={`ml-2 ${state === 'collapsed' ? 'sr-only' : ''}`}>
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* Developer Role Switcher */}
        <SidebarGroup>
          <SidebarGroupLabel>Developer Role Switcher</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-col gap-2 px-2">
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
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />
        
        {/* User Profile */}
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">{user.name.charAt(0)}</span>
            </div>
            <div className={state === 'collapsed' ? 'sr-only' : ''}>
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
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
