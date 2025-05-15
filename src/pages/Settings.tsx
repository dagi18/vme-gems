
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Moon, 
  Sun, 
  Mail, 
  Smartphone, 
  Globe, 
  Shield, 
  Key, 
  Save
} from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState('en');
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input defaultValue="Alex Johnson" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="alex@example.com" disabled />
                <p className="text-xs text-muted-foreground">
                  Contact support to change your email address
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Title</label>
                <Input defaultValue="Event Manager" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization</label>
                <Input defaultValue="Acme Events" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Switch id="marketing" />
                <label htmlFor="marketing" className="text-sm">
                  Receive marketing communications
                </label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Language & Regional</CardTitle>
              <CardDescription>Customize regional preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="am">Amharic</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Timezone</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="utc-8">Pacific Time (UTC-08:00)</option>
                  <option value="utc-5">Eastern Time (UTC-05:00)</option>
                  <option value="utc+0">Greenwich Mean Time (UTC+00:00)</option>
                  <option value="utc+3">East Africa Time (UTC+03:00)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Format</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="mdy">MM/DD/YYYY</option>
                  <option value="dmy">DD/MM/YYYY</option>
                  <option value="ymd">YYYY/MM/DD</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center mr-auto">
                <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Language changes will be applied after page refresh
                </span>
              </div>
              <Button className="ml-auto">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Event Updates</label>
                    <p className="text-xs text-muted-foreground">
                      Receive updates about events you're managing
                    </p>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Guest Check-ins</label>
                    <p className="text-xs text-muted-foreground">
                      Be notified when guests check in to your events
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">System Alerts</label>
                    <p className="text-xs text-muted-foreground">
                      Important system alerts and notifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <h3 className="text-lg font-medium pt-4">SMS Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable SMS</label>
                    <p className="text-xs text-muted-foreground">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch 
                    checked={smsNotifications} 
                    onCheckedChange={setSmsNotifications} 
                  />
                </div>
                {smsNotifications && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Event Alerts</label>
                        <p className="text-xs text-muted-foreground">
                          Get SMS alerts about urgent event matters
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center mr-auto gap-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  You can update your notification preferences anytime
                </span>
              </div>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Dark Mode</label>
                    <p className="text-xs text-muted-foreground">
                      Use dark theme for the application
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Sun className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Switch 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode} 
                    />
                    <Moon className="h-4 w-4 ml-2 text-muted-foreground" />
                  </div>
                </div>
                <Separator />
                <h3 className="text-lg font-medium">Display Density</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                    <div className="h-16 border-b mb-2"></div>
                    <div className="grid grid-cols-5 gap-1 mb-1">
                      <div className="bg-muted h-2 col-span-4"></div>
                      <div className="bg-muted h-2 col-span-1"></div>
                    </div>
                    <div className="grid grid-cols-5 gap-1">
                      <div className="bg-muted h-2 col-span-2"></div>
                      <div className="bg-muted h-2 col-span-3"></div>
                    </div>
                    <p className="text-center text-xs mt-2">Compact</p>
                  </div>
                  <div className="border rounded-md p-4 cursor-pointer hover:border-primary border-primary">
                    <div className="h-16 border-b mb-3"></div>
                    <div className="grid grid-cols-5 gap-2 mb-2">
                      <div className="bg-muted h-2 col-span-4"></div>
                      <div className="bg-muted h-2 col-span-1"></div>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="bg-muted h-2 col-span-2"></div>
                      <div className="bg-muted h-2 col-span-3"></div>
                    </div>
                    <p className="text-center text-xs mt-3">Default</p>
                  </div>
                  <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                    <div className="h-16 border-b mb-4"></div>
                    <div className="grid grid-cols-5 gap-3 mb-3">
                      <div className="bg-muted h-2 col-span-4"></div>
                      <div className="bg-muted h-2 col-span-1"></div>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      <div className="bg-muted h-2 col-span-2"></div>
                      <div className="bg-muted h-2 col-span-3"></div>
                    </div>
                    <p className="text-center text-xs mt-4">Comfortable</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Appearance</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Password</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input type="password" />
                </div>
                <Button className="mt-2">
                  <Key className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by enabling two-factor authentication
                </p>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable 2FA</label>
                    <p className="text-xs text-muted-foreground">
                      Secure your account with two-factor authentication
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Login Sessions</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your active login sessions
                </p>
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-xs text-muted-foreground">
                        Chrome on Windows • Boston, USA
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Started: May 14, 2025 10:30 AM
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                      <span className="text-xs font-medium">Active</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="mt-2 w-full">
                  Log Out All Other Devices
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex items-center">
              <div className="flex items-center mr-auto gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Last password change: 3 months ago
                </span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
