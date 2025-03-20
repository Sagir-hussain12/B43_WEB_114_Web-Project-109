import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/userAuthStore';
import { Button } from '../Components/ui/button';
import { Bell, Home, MessageSquare, Settings as SettingsIcon, PenTool as Tool, LogOut, DollarSign, User } from 'lucide-react';
import { MaintenanceRequestForm } from '../Components/MaintenanceRequestForm';
import { RequestList } from '../Components/RequestList';
import { RentPaymentTracker } from '../Components/RentPaymentTracker';
import { TenantChat } from '../Components/TenantChat';
import { TenantProfile } from '../Components/TenantProfile';
import Settings from '../Components/LandlordDashbord/Settings';
import { FloatingChatbot } from '../Components/AiChatBot';
import { NotificationDropdown } from '../Components/NotificationDropdown';

export function TenantDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigationItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: Tool, label: 'Maintenance', id: 'maintenance' },
    { icon: DollarSign, label: 'Payments', id: 'payments' },
    { icon: MessageSquare, label: 'Messages', id: 'messages' },
    { icon: User, label: 'Profile', id: 'profile' },
    { icon: SettingsIcon, label: 'Settings', id: 'settings' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'maintenance':
        return <MaintenanceRequestForm />;
      case 'requests':
        return <RequestList />;
      case 'payments':
        return <RentPaymentTracker />;
      case 'messages':
        return <TenantChat />;
      case 'profile':
        return <TenantProfile />;
        case 'settings':
          return <Settings />;
      default:
        return <RequestList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-center border-b">
          <button onClick={() => setActiveTab('')}><h1 className="text-xl font-bold text-primary">PropertyConnect</h1></button>
          
        </div>
        
        <div className="p-4">
          <div className="mb-6 flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces"
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-medium">Sarah Johnson</p>
              <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 ${
                  activeTab === item.id ? 'bg-gray-100' : ''
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
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
          <h2 className="text-2xl font-bold">
            {navigationItems.find((item) => item.id === activeTab)?.label}
          </h2>
      <NotificationDropdown/>
        </header>
       <FloatingChatbot/>
        {/* Dynamic Content */}
        {renderContent()}
      </main>
    </div>
  );
}