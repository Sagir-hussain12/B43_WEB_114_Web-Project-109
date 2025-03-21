import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/userAuthStore';
import { Button } from "../Components/common/ui/button";
import { 
  Bell, 
  Home, 
  MessageSquare, 
  Settings as SettingsIcon, 
  PenTool as Tool, 
  LogOut, 
  DollarSign, 
  User,
  Menu,
  X
} from 'lucide-react';
import { MaintenanceRequestForm } from '../Components/TenantDashboard/MaintenanceRequestForm';
import { RequestList } from '../Components/TenantDashboard/RequestList';
import { RentPaymentTracker } from '../Components/TenantDashboard/RentPaymentTracker';
import { TenantChat } from '../Components/TenantDashboard/TenantChat';
import { TenantProfile } from '../Components/TenantDashboard/TenantProfile';
import Settings from "../Components/common/Settings";
import { NotificationDropdown } from "../Components/common/NotificationDropdown";
import { FloatingChatbot } from "../Components/common/AiChatBot";

export function TenantDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

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
      {/* Fixed top navigation bar for mobile */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between bg-white px-4 shadow-md">
          <button onClick={() => setSidebarOpen(true)} className="p-2">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-primary">PropertyConnect</h1>
          <NotificationDropdown />
        </div>
      )}

      {/* Mobile Sidebar - Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
          <div 
            className="fixed left-0 top-0 z-50 h-full w-64 overflow-y-auto bg-white shadow-lg" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-16 items-center justify-between border-b px-4">
              <h1 className="text-xl font-bold text-primary">PropertyConnect</h1>
              <button onClick={() => setSidebarOpen(false)} className="p-2">
                <X className="h-6 w-6" />
              </button>
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
                    onClick={() => handleTabClick(item.id)}
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
          </div>
        </div>
      )}

      {/* Desktop Sidebar - Fixed */}
      {!isMobile && (
        <aside className="fixed left-0 top-0 z-30 h-full w-64 overflow-y-auto bg-white shadow-lg">
          <div className="flex h-16 items-center justify-center border-b">
            <button onClick={() => handleTabClick('dashboard')}>
              <h1 className="text-xl font-bold text-primary">PropertyConnect</h1>
            </button>
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
                  onClick={() => handleTabClick(item.id)}
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
      )}

      {/* Main Content */}
      <main className={`${isMobile ? 'mt-16' : 'ml-64'} min-h-screen bg-gray-50 p-4 md:p-8`}>
        {/* Header - Desktop only */}
        {!isMobile && (
    <header className="mb-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {navigationItems.find((item) => item.id === activeTab)?.label}
        </h2>
        <div className="flex items-center space-x-4">
          <NotificationDropdown />

        </div>
      </div>
    </header>
  )}

  {/* Mobile Header Title */}
  {isMobile && (
    <header className="mb-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white">
        {navigationItems.find((item) => item.id === activeTab)?.label}
      </h2>
    </header>
  )}

        <FloatingChatbot />
        
        {/* Dynamic Content */}
        {renderContent()}
      </main>
    </div>
  );
}