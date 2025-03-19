import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/userAuthStore';
import { Button } from './ui/button';
import { Bell, Home, MessageSquare, Settings, PenTool as Tool, LogOut, DollarSign, Users, Phone, Mail, MapPin, Calendar } from 'lucide-react';

export function TenantPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const navigationItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: Users, label: 'Tenants', href: '/tenant' },
    { icon: Tool, label: 'Maintenance', href: '#maintenance' },
    { icon: MessageSquare, label: 'Messages', href: '#messages' },
    { icon: DollarSign, label: 'Payments', href: '#payments' },
    { icon: Settings, label: 'Settings', href: '#settings' },
  ];

  const tenants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Apt 4B',
      moveInDate: '2023-06-15',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces',
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, Unit 2A',
      moveInDate: '2023-09-01',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '+1 (555) 456-7890',
      address: '789 Pine St, Apt 7C',
      moveInDate: '2024-01-15',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-center border-b">
          <h1 className="text-xl font-bold text-primary">PropertyConnect</h1>
        </div>
        
        <div className="p-4">
          <div className="mb-6 flex items-center space-x-3">
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('/')) {
                    e.preventDefault();
                    navigate(item.href);
                  }
                }}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Tenant Management</h2>
          <div className="flex items-center space-x-4">
            <Button variant="outline">Add New Tenant</Button>
            <Button variant="ghost" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
            </Button>
          </div>
        </header>

        {/* Tenant List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center space-x-4">
                <img
                  src={tenant.avatar}
                  alt={tenant.name}
                  className="h-16 w-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{tenant.name}</h3>
                  <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    {tenant.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="mr-2 h-4 w-4" />
                  {tenant.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="mr-2 h-4 w-4" />
                  {tenant.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  {tenant.address}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  Move-in: {new Date(tenant.moveInDate).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Payments
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}