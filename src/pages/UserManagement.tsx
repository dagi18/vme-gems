
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  UserPlus, 
  Filter, 
  Download,
  UserCog,
  Mail,
  Shield,
  Check,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

// Mock user data
const users = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'admin', status: 'active', lastActive: '2023-05-14T10:30:00Z' },
  { id: 2, name: 'Sarah Williams', email: 'sarah@example.com', role: 'organizer', status: 'active', lastActive: '2023-05-14T09:15:00Z' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'usher', status: 'inactive', lastActive: '2023-05-10T14:20:00Z' },
  { id: 4, name: 'Emma Davis', email: 'emma@example.com', role: 'organizer', status: 'pending', lastActive: null },
  { id: 5, name: 'James Wilson', email: 'james@example.com', role: 'usher', status: 'active', lastActive: '2023-05-13T16:45:00Z' },
  { id: 6, name: 'Olivia Martin', email: 'olivia@example.com', role: 'usher', status: 'active', lastActive: '2023-05-14T08:10:00Z' },
  { id: 7, name: 'Daniel Taylor', email: 'daniel@example.com', role: 'organizer', status: 'pending', lastActive: null },
];

// Mock pending approval requests
const pendingRequests = [
  { id: 101, name: 'Linda Anderson', email: 'linda@example.com', role: 'organizer', requestDate: '2023-05-13T10:30:00Z' },
  { id: 102, name: 'Robert Clark', email: 'robert@example.com', role: 'usher', requestDate: '2023-05-14T09:15:00Z' },
  { id: 103, name: 'Patricia Lewis', email: 'patricia@example.com', role: 'organizer', requestDate: '2023-05-12T14:20:00Z' },
];

const UserManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string | null>(null);
  
  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto text-muted" />
          <h2 className="mt-4 text-lg font-semibold">Access Restricted</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You don't have permission to access user management.
          </p>
        </div>
      </div>
    );
  }
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">
          Manage user accounts, roles, and permissions
        </p>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="pending">
            Pending Approval
            {pendingRequests.length > 0 && (
              <Badge variant="destructive" className="ml-2">{pendingRequests.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>Manage all user accounts across the platform</CardDescription>
                </div>
                <Button className="sm:self-end">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search users..." 
                    className="pl-8" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterRole(null)}>
                      All Roles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterRole('admin')}>
                      Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterRole('organizer')}>
                      Organizer
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterRole('usher')}>
                      Usher
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={
                          user.role === 'admin' ? 'default' : 
                          user.role === 'organizer' ? 'secondary' : 
                          'outline'
                        } className="capitalize">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          user.status === 'active' ? 'default' : 
                          user.status === 'inactive' ? 'secondary' : 
                          'destructive'
                        } className="capitalize">
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.lastActive)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <UserCog className="h-4 w-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Shield className="h-4 w-4 mr-2" />
                              Change Role
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approval Requests</CardTitle>
              <CardDescription>
                New users awaiting account approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Check className="h-12 w-12 mx-auto text-primary opacity-50" />
                  <p className="mt-2 text-sm text-muted-foreground">No pending approval requests</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Requested Role</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingRequests.map(request => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell className="capitalize">{request.role}</TableCell>
                        <TableCell>{formatDate(request.requestDate)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm">
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
