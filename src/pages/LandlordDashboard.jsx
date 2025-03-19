import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/userAuthStore';
import { Button } from '../Components/ui/button'; 
import { Bell, Home, MessageSquare, Settings, PenTool as Tool, LogOut, DollarSign, Users, Building, TrendingUp, AlertCircle } from 'lucide-react';

export function LandlordDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const navigationItems = [
    { icon: Home, label: 'Dashboard', href: '/landlord-dashboard' },
    { icon: Building, label: 'Properties', href: '#properties' },
    { icon: Users, label: 'Tenants', href: '/tenant' },
    { icon: Tool, label: 'Maintenance', href: '#maintenance' },
    { icon: MessageSquare, label: 'Messages', href: '#messages' },
    { icon: DollarSign, label: 'Finances', href: '#finances' },
    { icon: Settings, label: 'Settings', href: '#settings' },
  ];

  const properties = [
    {
      id: 1,
      name: 'Sunset Apartments',
      address: '123 Sunset Blvd, Los Angeles',
      units: 12,
      occupancyRate: '92%',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&fit=crop',
    },
    {
      id: 2,
      name: 'Ocean View Complex',
      address: '456 Beach Road, Miami',
      units: 24,
      occupancyRate: '88%',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&fit=crop',
    },
    {
      id: 3,
      name: 'Downtown Lofts',
      address: '789 Main St, Chicago',
      units: 8,
      occupancyRate: '100%',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&fit=crop',
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
              <p className="text-sm text-gray-500">Landlord</p>
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
            onClick={() => navigate('/')}
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
          <h2 className="text-2xl font-bold">Landlord Dashboard</h2>
          <div className="flex items-center space-x-4">
            <Button variant="outline">Add Property</Button>
            <Button variant="ghost" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                5
              </span>
            </Button>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Total Properties',
              value: '3',
              icon: Building,
              color: 'bg-blue-500',
            },
            {
              label: 'Total Units',
              value: '44',
              icon: Home,
              color: 'bg-green-500',
            },
            {
              label: 'Active Tenants',
              value: '38',
              icon: Users,
              color: 'bg-purple-500',
            },
            {
              label: 'Monthly Revenue',
              value: '$52,400',
              icon: TrendingUp,
              color: 'bg-orange-500',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <div className="flex items-center">
                <div className={`rounded-full ${stat.color} p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Properties Grid */}
        <section className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">Your Properties</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <div key={property.id} className="overflow-hidden rounded-lg bg-white shadow-sm">
                <img
                  src={property.image}
                  alt={property.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold">{property.name}</h4>
                  <p className="text-sm text-gray-500">{property.address}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {property.units} Units • {property.occupancyRate} Occupied
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Alerts */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Recent Alerts</h3>
          <div className="space-y-4">
            {[
              {
                title: 'Maintenance Request',
                description: 'Unit 4B - Water heater replacement needed',
                time: '1 hour ago',
                priority: 'High',
                priorityColor: 'bg-red-100 text-red-800',
              },
              {
                title: 'Rent Payment Overdue',
                description: 'Unit 7A - 5 days overdue',
                time: '2 hours ago',
                priority: 'Medium',
                priorityColor: 'bg-yellow-100 text-yellow-800',
              },
              {
                title: 'Lease Expiring',
                description: 'Unit 2C - Expires in 30 days',
                time: '1 day ago',
                priority: 'Low',
                priorityColor: 'bg-blue-100 text-blue-800',
              },
            ].map((alert, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  <AlertCircle className="h-5 w-5 text-gray-400" />
                  <div>
                    <h4 className="font-medium">{alert.title}</h4>
                    <p className="text-sm text-gray-500">{alert.description}</p>
                    <p className="text-xs text-gray-400">{alert.time}</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${alert.priorityColor}`}
                >
                  {alert.priority}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}