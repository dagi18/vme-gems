
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import RouteGuard from './components/RouteGuard';
import DashboardLayout from './components/layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventStage from './pages/EventStage';
import EventDetails from './pages/EventDetails';
import Approvals from './pages/Approvals';
import Analytics from './pages/Analytics';
import Guests from './pages/Guests';
import MobileCheckIn from './pages/MobileCheckIn';
import PrintBadges from './pages/PrintBadges';
import Vendors from './pages/Vendors';
import Settings from './pages/Settings';
import UserManagement from './pages/UserManagement';
import BadgeManagement from './pages/BadgeManagement';
import Reports from "./pages/Reports";
import OnsiteRegistration from "./pages/OnsiteRegistration";
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import { AuthProvider } from './contexts/AuthContext';
import EventRegistration from './pages/EventRegistration';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/events/:eventId/register" element={<EventRegistration />} />
            
            {/* Protected routes */}
            <Route element={
              <RouteGuard allowedRoles={['admin', 'organizer', 'usher']}>
                <Outlet />
              </RouteGuard>
            }>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="events" element={<Events />} />
                <Route path="events/stage" element={<EventStage />} />
                <Route path="events/:eventId" element={<EventDetails />} />
                <Route path="guests" element={<Guests />} />
                <Route path="mobile-check-in" element={<MobileCheckIn />} />
                <Route path="print-badges" element={<PrintBadges />} />
                <Route path="badge-management" element={<BadgeManagement />} />
                <Route path="reports" element={<Reports />} />
                <Route path="onsite-registration" element={<OnsiteRegistration />} />
              </Route>
            </Route>
            
            {/* Admin-only routes */}
            <Route element={
              <RouteGuard allowedRoles={['admin']}>
                <Outlet />
              </RouteGuard>
            }>
              <Route path="/" element={<DashboardLayout />}>
                <Route path="approvals" element={<Approvals />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="vendors" element={<Vendors />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="user-management" element={<UserManagement />} />
              </Route>
            </Route>
            
            {/* Redirect and 404 */}
            <Route path="/" element={<Navigate to="/events" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
