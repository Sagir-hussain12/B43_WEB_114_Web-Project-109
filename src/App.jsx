import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage'
import { LandlordDashboard } from './pages/LandlordDashboard';
import {TenantDashboard} from './pages/TenantDashboard';
import { useAuthStore } from './store/userAuthStore';



const App = () => {
  const { setUser } = useAuthStore();

  // Simulate user login - In a real app, this would come from authentication
  useEffect(() => {
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'tenant',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces'
    });
  }, [setUser]);
  return (
    <div>
        <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        
        <Route path="*" element={<Navigate to="/" replace />} /> */
      </Routes>
    </Router>
    </div>
  )
}

export default App